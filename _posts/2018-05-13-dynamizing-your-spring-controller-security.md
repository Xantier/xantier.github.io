---
layout: post
title: Over-engineering Spring controllers - Creating generic endpoint
teaser:
tags:
  - Java
  - Spring
  - Abstraction
permalink:
header: no
---

Sometimes we have the need to create a proper shape for our endpoints. Since the last year or so I have been working more on the frontend side of a JVM/Spring application I've grown frustrated with different patterns of endpoints we are exposing. In the ideal world we would have a shape that is consistent and a URL pattern that is simple to follow and easily guessable. 

During my time writing endpoints with Spring Framework there has been a pattern forming that I've seen many many times. The flow of the data usually comes in to a `@Controller` and flows from there to a `@Service`. If we are thinking about generic endpoints and data that is in a familiar shape most of the time we can start figuring out abstractions to this pattern. 

Something like a generic service interface is usually a good starting point on this where we define needed methods and then implement them for each different entity type. This is fairly straight forward in most use cases if we consider only CRUD application development. That is a good start and gives our code base a good pipeline from controller to the data layer and back. 

We can also extend a similar pattern to the controller level. If we think about RESTful controllers then the shape of our controller endpoints is more or less set in stone as well. We will usually have an upper level GET which returns a collection of elements, an upper level POST where we can create a new element and the specific GET, PUT and DELETE (maybe also PATCH) endpoints where we can handle individual elements.

The shape of the REST API would look something like this:

* GET  /endpoint:     () -> item[]
* POST /endpoint: (item) -> item
  -  GET    /endpoint/{id}:        () -> item
  -  PUT    /endpoint/{id}:    (item) -> item
  -  DELETE /endpoint/{id}:        () -> Boolean
  -  PATCH  /endpoint/{id}: (partial) -> item


In Spring we could define this shape by using an abstract base controller class that defines our individual endpoints. In the diagram mentioned above that would mean 6 different controller methods in the base controller class. 
Lets try to flesh that out:

```java

/*
 * Define security annotations in subclass:
 * - Class level for shared security roles for all endpoints at overridden method checkAuthorization
 * - Override methods for more fine grained security on individual method level endpoints
 *
 * @param <T> An object for GET, POST, PUT endpoints
 * @param <U> An object for PATCH endpoint
 */
abstract public class BaseRestController<T extends DTO, U> {

    private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    protected static final String BASE_URL = "/api";

    protected abstract RestService<T, U> restService();

    @Autowired
    private ErrorParser errorParser;

    /**
     * @return boolean do determine authorization success/failure
     */
    public abstract Boolean checkAuthorization();

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("this.checkAuthorization()")
    public ResponseEntity<List<T>> getRequests() {
        return ResponseEntity.ok(restService().getAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    @PreAuthorize("this.checkAuthorization()")
    public ResponseEntity<DTO> create(@RequestBody @Valid T request, BindingResult errors) {
        validate(request, errors);
        if (errors.hasErrors()) {
            return new ResponseEntity<DTO>(errorParser.processValidationErrors(errors), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return ResponseEntity.ok(restService().create(request));
    }

    @RequestMapping(value = "/{requestId}", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("this.checkAuthorization()")
    public ResponseEntity<DTO> get(@PathVariable Integer requestId) {
        return forExistingRequest(requestId, id ->
                ResponseEntity.ok(restService().getById(id)));
    }

    @RequestMapping(value = "/{requestId}", method = RequestMethod.PUT)
    @ResponseBody
    @PreAuthorize("this.checkAuthorization()")
    public ResponseEntity<DTO> modify(@PathVariable Integer requestId, @RequestBody @Valid final T request, final BindingResult errors) {
        return forExistingRequest(requestId, id -> {
            validate(request, errors);
            if (errors.hasErrors()) {
                return new ResponseEntity<DTO>(errorParser.processValidationErrors(errors), HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return ResponseEntity.ok(restService().update(id, request));
        });
    }

    @RequestMapping(value = "/{requestId}", method = RequestMethod.PATCH)
    @ResponseBody
    @PreAuthorize("this.checkAuthorization()")
    public ResponseEntity<DTO> patch(@PathVariable Integer requestId, @RequestBody @Valid final U partial, final BindingResult errors) {
        return forExistingRequest(requestId, id -> {
            validatePartial(partial, errors);
            if (errors.hasErrors()) {
                return new ResponseEntity<DTO>(errorParser.processValidationErrors(errors), HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return ResponseEntity.ok(restService().patch(id, partial));
        });
    }
    
	@RequestMapping(value = "/{requestId}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("this.checkAuthorization()")
    public ResponseEntity<DTO> delete(@PathVariable Integer requestId) {
        return forExistingRequest(requestId, id ->
                ResponseEntity.ok(restService().delete(id)));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ResponseBody
    public ResponseEntity<ValidationErrorDTO> processValidationError(MethodArgumentNotValidException ex) {
        LOGGER.error(ex.getMessage(), ex);
        return new ResponseEntity<>(errorParser.processValidationErrors(ex.getBindingResult()), HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public void handleException(AccessDeniedException ex, HttpServletRequest req) {
        String user = SecurityContextHolder.getContext().getAuthentication().getName();
        LOGGER.error("Access denied for user: " + user + " for URL : " + req.getRequestURL());
    }

    /**
     * Validation method for incoming request objects.
     * Ideally Validator implements Spring Validation {@link org.springframework.validation.Validator}
     * <p>
     * Note that as per Spring validation structure incoming errors object is expected to be modified with errored fields & messages
     *
     * @param request A subclass of {@link com.hallila.BaseRequest}
     * @param errors  BindingResult from Spring Controller
     */
    protected void validate(T request, BindingResult errors) {
        // Not implemented in base class
    }
	/**
     * @param partial A subclass of {@link com.hallila.BaseRequest}
     * @param errors  BindingResult from Spring Controller
	 */
    protected void validatePartial(U partial, BindingResult errors) {
        // Not implemented in base class
    }

    private ResponseEntity<DTO> forExistingRequest(Integer requestId, Function<Integer, ResponseEntity<DTO>> f) {
        if (restService().getById(requestId) != null) {
            return f.apply(requestId);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}

```

In here we have a basic abstract class that will act as our base controller class. It takes in two type parameters that are the actual entity object that we are handling and a partial entity object that we can use in case of PATCH requests. These can naturally be unified if we want to make a diff between persisted object and a patched one for example in the data access layer. 

Note that for this example we will keep things straightforward and not introduce a DTO to handle our view models. In general a DTO object would be a much better suited just to keep the database model and our view model separated. That way the database structure also wouldn't leak to the view layer. 

In our base controller class we define two abstract methods that need to be implemented in our children. These are few simple getters where the first one returns our needed service and the second one handles authorization. We also define a protected static property that will be prefixed as out base URL for all endpoints extending this class. 

Then we have our actual endpoint methods. As we can see the structure follows our diagram defined above. We have GET and POST with no extra context path and then 4 endpoints with an /{id} defined in them. These endpoints that expect an id are wrapped into a checker method that validates existence of our desired object. The actual actions inside are fairly straightforward since they mostly pass on the execution to our service layer. We do have a validate method call before that though but that method can or cannot be overridden by the childclass if needs be. Note that Spring @InitBinder which could usually be used for validation doesn't really help us in these cases. Also incoming entities themselves are annotated with JSR303's @Valid annotation. This way (in case we have a validator dependency in our classpath) we can just annotate our dumb object with these validation annotations.

Note that in here we are using validation objects from [Petri Kainulainen's Spring Validation blog post](https://www.petrikainulainen.net/programming/spring-framework/spring-from-the-trenches-adding-validation-to-a-rest-api/) where he defines a base object that can be extended and which handles the correct shape for request validations. The `ErrorParses` simply takes the populated `errors` object and their corresponding error messages, runs them through messages layer to get localized messages and returns a `ValidationErrorDTO` object which is returned from the endpoint. 

Note that both BaseRequest and ValidationErrorDTO in this case need to implement a marker interface `DTO` which we are using as our return type from these generic methods.

The `RestService` is a simple interface which contains only the methods needed for the generic controller. An implementation of that could look something like this:

```
public interface RestService<T, U> {
    T getById(Integer requestId);

    T create(T request);

    List<T> getAll();

    T patch(Integer id, U partial);

    T update(Integer id, T request);

	DeletionResponseDTO delete(Integer id);
}
```

How do we use this generic controller then? Our subclass needs to implement 2 abstract methods and and add the correct signatures. Other than that we don't necessarily need to implement anything else. The necessary ones are overriding authorization check for all endpoints. note that if we want to modify individual HTTP methods with different authorization, we can override that individual method, add needed Spring Security annotations and call super from it. 

```java
@Controller
@RequestMapping(value = BASE_URL + "/dummy")
public class DummyController extends BaseRequestController<DummyFullRequest, DummyPartialRequest> {

	@Autowired
	private RestService<DummyFullRequest, DummyPartialRequest> implementedRestService;

	@Override
	public Boolean checkAuthorization(){
		return Util.hasAnyRole('SOME_ROLE');
	}

	@Override
	protected RequestService<DummyFullRequest, DummyPartialRequest> restService() {
		return implementedRestService;
	}
}
```

Here is the minimal implementation of our generic controller. With this we will have an endpoint `/api/dummy` available for us exposing GET, POST, PUT, PATCH and DELETE methods. With this we can be sure that the structure of our endpoints is correct and it returns consistent response types. This way our frontend is able to handle those responses in a consistent manner. We also would have the ability to simply override authorization of endpoints and add additional validation checks to each one very easily when those edge cases eventually start creeping in.


Of course, we'll receive most of this from Spring Data by default already...