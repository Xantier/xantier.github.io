Sometimes you ahve the need to create a proper shape for your endpoints.
During my time wrinting endpoints with spring framework there has been a pattern forming that I've seen many many times. The flow of the data usually comes in to a @Controller and flows from there to a @Service. If we are thinking about generic endpoints and data that is in a familiar shape most of the time we can start figuring out abstractions to this pattern. 

Something like a generic service interface is usually a good starting point on this where we define needed methods and then implement them for each different entity type. This is fairly straight forward in most use cases if we consider only CRUD application development. That is a good start and gives our code base a good pipeline from controller to the data layer and back. 

We can also extend a similar pattern to the controller level. If we think about RESTful controllers then the shape of our controller endpoints is more or less set in stone as well. We will usually have an upper level GET which returns a collection of elements, an upper level POST where you can create a new element and the specific GET, PUT and DELETE (maybe also PATCH) endpoints where you can handle individual elements.

The shape of the REST API would look something like this:

GET  /endpoint:     () -> item[]
POST /endpoint: (item) -> item
 -  GET    /endpoint/{id}:        () -> item
 -  PUT    /endpoint/{id}:    (item) -> item
 -  DELETE /endpoint/{id}:        () -> Boolean
 -  PATCH  /endpoint/{id}: (partial) -> item


In Spring you could define this shape by using an abstract base controller class that defines your individual endpoints. In the diagram mentioned above that would mean 6 different controller methods in the base controller class. 
Lets try to flesh that out:

```java
/** 
 * Define security annotations in subclass:
 * - Class level for shared security roles for all endpoints at overridden method checkAuthorization
 * - Override methods for more fine grained security on individual method level endpoints
 *
 * @param <T> An object for GET, POST, PUT endpoints
 * @param <U> An object for PATCH endpoint
 */
abstract public class BaseRestController<T, U> {

	protected static final String BASE_URL = "/api";

	protected abstract RestService<T, U> restService();

	/**
	 * @return boolean do determine authorization success/failure
	 */
	public abstract Boolean checkAuthorization();

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	@PreAuthorize("this.checkAuthorization()")
	public ResponseEntity<List<T>> getRequests() {
		return ok(().getAll());
	}


	@ExceptionHandletMapping(method = RequestMethod.POST)
	@ResponseBody
	@PreAuthorize("this.checkAuthorization()")
	public ResponseEntity<T> createRequest(@RequestBody @Valid T request, BindingResult errors) {
		validatePost(request, errors);
		if (errors.hasErrors()) {
			errorParser.processValidationErrors(errors);
		}
		return ok(requestService().create(request));
	}

	@RequestMapping(value = "/{requestId}", method = RequestMethod.GET)
	@ResponseBody
	@PreAuthorize("this.checkAuthorization()")
	public ResponseEntity<T> getRequest(@PathVariable Integer requestId) {
		return forExistingRequest(requestId, new Function<Integer, ResponseEntity<T>>() {
			@Override
			public ResponseEntity<T> apply(Integer requestId) {
				return ok(requestService().getById(requestId));
			}
		});
	}

	@RequestMapping(value = "/{requestId}", method = RequestMethod.PUT)
	@ResponseBody
	@PreAuthorize("this.checkAuthorization()")
	public ResponseEntity modifyRequest(@PathVariable Integer requestId, @RequestBody @Valid final T request, final BindingResult errors) {
		return forExistingRequest(requestId, new Function<Integer, ResponseEntity<T>>() {
			@Override
			public ResponseEntity<T> apply(Integer requestId) {
				validatePut(request, errors);
				if (errors.hasErrors()) {
					errorParser.processValidationErrors(errors);
				}
				return ok(requestService().update(requestId, request));
			}
		});
	}

	@RequestMapping(value = "/{requestId}", method = RequestMethod.PATCH)
	@ResponseBody
	@PreAuthorize("this.checkAuthorization()")
	public ResponseEntity<T> approveOrRejectRequest(@PathVariable Integer requestId, @RequestBody @Valid final U approvalDTO, final BindingResult errors) {
		return forExistingRequest(requestId, new Function<Integer, ResponseEntity<T>>() {
			@Override
			public ResponseEntity<T> apply(Integer requestId) {
				validate(approvalDTO, errors);
				if (errors.hasErrors()) {
					errorParser.processValidationErrors(errors);
				}
				return ok(requestService().updateStatus(requestId, approvalDTO));
			}
		});
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	@ResponseBody
	public ValidationErrorDTO processValidationError(MethodArgumentNotValidException ex) {
		logger.warn(ex.getMessage(), ex);
		return errorParser.processValidationErrors(ex.getBindingResult());
	}

	@ExceptionHandler(AccessDeniedException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public void handleException(AccessDeniedException ex, HttpServletRequest req) {
		String user = Util.getSchoolThingUser().getUsername();
		logger.error("Access denied for user: " + user + " for URL : " + req.getRequestURL());
	}

	/**
	 * Validation method for incoming request objects.
	 * Ideally Validator implements Spring Validation {@link org.springframework.validation.Validator}
	 * <p>
	 * Note that as per Spring validation structure incoming errors object is expected to be modified with errored fields & messages
	 *
	 * @param request A subclass of {@link com.vsware.daoService.request.BaseRequest}
	 * @param errors  BindingResult from Spring Controller
	 */
	protected void validate(T request, BindingResult errors) {
		// Not implemented in base class
	}

	/**
	 * Validation method for incoming approval objects.
	 * Ideally Validator implements Spring Validation {@link org.springframework.validation.Validator}
	 * <p>
	 * Note that as per Spring validation structure incoming errors object is expected to be modified with errored fields & messages
	 *
	 * @param approvalDTO A subclass of {@link com.vsware.daoService.request.ApprovalDTO}
	 * @param errors      BindingResult from Spring Controller
	 */
	protected void validate(U approvalDTO, BindingResult errors) {
		// Not implemented in base class
	}

	private ResponseEntity<T> forExistingRequest(Integer requestId, Function<Integer, ResponseEntity<T>> f) {
		if (restService().getById(requestId) != null) {
			return f.apply(requestId);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
```

In here we have a basic abstract class that will act as our base controller class. It takes in two type parameters that are the actual entity object that we are handling and a partial entity object that we can use in case of PATCH requests.These can naturally be unified if you want to make a diff between persisted object and a patched one for example in the data access layer. 

Note that for this example we will keep things straightforward and not introduce a DTO to handle our view models. In general a DTO object would be a much better suited just to keep the database model and our view model separated. That way the database structure also wouldn't leak to the view layer. 

In our base controller class we define two abstract methods that need to be implemented in our children. These are few simple getters where the first one returns our needed service and the second one handles authorization. We also define a protected static property that will be prefixed as out base URL for all endpoints extending this class. 

Then we have our actual endpoint methods. As you can see the structure follows our diagram defined above. We have GET and POST with no extra context path and then 4 endpoints with an /{id} defined in them. These endpoints that expect an id are wrapped into a checker method that validates existence of our desired object. The actual actions inside are fairly straightforward since they mostly pass on the execution to our service layer. We do have a validate method call before that though but that method can or cannot be overridden by the childclass if needs be. Note that Spring @InitBinder which could usually be used for validation doesn't really help us in these cases. Also incoming entities themselves are annotated with JSR303's @Valid annotation. This way (in case we have a validator dependency in our classpath) we can just annotate our dumb object with these validation annotations.



Subclass



```java

@Controller
@RequestMapping(value = BASE_URL + "/absences")
public class AbsenceRequestController extends BaseRequestController<AbsenceRequest, AbsenceRequestApprovalDTO> {

	@Autowired
	private RestService<AbsenceRequest, AbsenceRequestApprovalDTO> absenceRequestService;

	@Override
	@PreAuthorize("hasAnyRole(T(ie.schoolthing.mis.security.Role).ROLE_SCHOOL_OWNER_ADMIN)")
	public ResponseEntity<AbsenceRequest> approveOrRejectRequest(@PathVariable Integer requestId, @RequestBody final AbsenceRequestApprovalDTO approvalDTO, BindingResult errors) {
		approvalDTO.setApproverId(Util.getCurrentUserInfoId());
		return super.approveOrRejectRequest(requestId, approvalDTO, errors);
	}

	@Override
	public Boolean checkAuthorization(){
		return Util.hasAnyRole(Role.TEACHER, Role.PRINCIPAL, Role.SECRETARY, Role.SCHOOL_OWNER, Role.ROLE_SCHOOL_OWNER_ADMIN);
	}

	@Override
	protected RequestService<AbsenceRequest, AbsenceRequestApprovalDTO> restService() {
		return absenceRequestService;
	}

}

```



GO with this;

package com.vsware.services.request;

import com.google.common.base.Function;
import com.vsware.daoService.request.ApprovalDTO;
import com.vsware.daoService.request.BaseRequest;
import com.vsware.daoService.request.RequestService;
import com.vsware.utils.VSAbstractController;
import ie.schoolthing.mis.irl.controller.ErrorParser;
import ie.schoolthing.mis.irl.controller.Util;
import ie.schoolthing.mis.irl.controller.exception.errors.ValidationErrorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 * Define security annotations in subclass:
 * - Class level for shared security roles for all endpoints at overridden method checkAuthorization
 * - Override methods for more fine grained security on individual method level endpoints
 *
 * Note that this class should extend an interface with SAM checkAuthorization and cascading default methods for endpoint authentication.
 * Current workaround is to just override individual methods, each endpoint should have its own authmethod call
 * ...When we are on Java 8
 *
 * Same words for validation. Add validation methods for each incoming endpoint that come from an interface with default empty implementations.
 *
 * @param <T> A subclass of {@link com.vsware.daoService.request.BaseRequest}
 * @param <U> A subclass of {@link com.vsware.daoService.request.ApprovalDTO}
 */
abstract public class BaseRequestController<T extends BaseRequest, U extends ApprovalDTO> extends VSAbstractController implements RestControllerAuthorization {

	@Autowired
	private ErrorParser errorParser;

	protected static final String BASE_URL = "/control/request";

	protected abstract RequestService<T, U> requestService();

	/**
	 * @return boolean do determine authorization success/failure
	 */
	public abstract Boolean checkAuthorization();

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	@PreAuthorize("this.checkAuthorization()")
	public ResponseEntity<List<T>> getRequests() {
		return ok(requestService().getAll());
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	@PreAuthorize("this.checkAuthorization()")
	public ResponseEntity<?> createRequest(@RequestBody @Valid T request, BindingResult errors) {
		request.setUserInfoId(Util.getCurrentUserInfoId());
		validatePost(request, errors);
		if (errors.hasErrors()) {
			return invalid(errorParser.processValidationErrors(errors));
		}
		return ok(requestService().create(request));
	}

	@RequestMapping(value = "/{requestId}", method = RequestMethod.GET)
	@ResponseBody
	@PreAuthorize("this.checkAuthorization()")
	public ResponseEntity<?> getRequest(@PathVariable Integer requestId) {
		return forExistingRequest(requestId, new Function<Integer, ResponseEntity<?>>() {
			@Override
			public ResponseEntity<?> apply(Integer requestId) {
				return ok(requestService().getById(requestId));
			}
		});
	}

	@RequestMapping(value = "/{requestId}", method = RequestMethod.PUT)
	@ResponseBody
	@PreAuthorize("this.checkAuthorization()")
	public ResponseEntity<?> modifyRequest(@PathVariable Integer requestId, @RequestBody @Valid final T request, final BindingResult errors) {
		request.setUserInfoId(Util.getCurrentUserInfoId());
		return forExistingRequest(requestId, new Function<Integer, ResponseEntity<?>>() {
			@Override
			public ResponseEntity<?> apply(Integer requestId) {
				validatePut(request, errors);
				if (errors.hasErrors()) {
					return invalid(errorParser.processValidationErrors(errors));
				}
				return ok(requestService().update(requestId, request));
			}
		});
	}

	@RequestMapping(value = "/{requestId}", method = RequestMethod.PATCH)
	@ResponseBody
	@PreAuthorize("this.checkAuthorization()")
	public ResponseEntity<?> approveOrRejectRequest(@PathVariable Integer requestId, @RequestBody @Valid final U approvalDTO, final BindingResult errors) {
		return forExistingRequest(requestId, new Function<Integer, ResponseEntity<?>>() {
			@Override
			public ResponseEntity<?> apply(Integer requestId) {
				validate(approvalDTO, errors);
				if (errors.hasErrors()) {
					return invalid(errorParser.processValidationErrors(errors));
				}
				return ok(requestService().updateStatus(requestId, approvalDTO));
			}
		});
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
	@ResponseBody
	public ValidationErrorDTO processValidationError(MethodArgumentNotValidException ex) {
		logger.warn(ex.getMessage(), ex);
		return errorParser.processValidationErrors(ex.getBindingResult());
	}

	@ExceptionHandler(AccessDeniedException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public void handleException(AccessDeniedException __, HttpServletRequest req) {
		String user = Util.getSchoolThingUser().getUsername();
		logger.error("Access denied for user: " + user + " for URL : " + req.getRequestURL());
	}

	/**
	 * Validation method for incoming request objects.
	 * Ideally Validator implements Spring Validation {@link org.springframework.validation.Validator}
	 * <p>
	 * Note that as per Spring validation structure incoming errors object is expected to be modified with errored fields & messages
	 *
	 * @param request A subclass of {@link com.vsware.daoService.request.BaseRequest}
	 * @param errors  BindingResult from Spring Controller
	 */
	protected void validatePost(T request, BindingResult errors) {
		// Not implemented in base class
	}

	/**
	 * Validation method for incoming request objects.
	 * Ideally Validator implements Spring Validation {@link org.springframework.validation.Validator}
	 * <p>
	 * Note that as per Spring validation structure incoming errors object is expected to be modified with errored fields & messages
	 *
	 * @param request A subclass of {@link com.vsware.daoService.request.BaseRequest}
	 * @param errors  BindingResult from Spring Controller
	 */
	protected void validatePut(T request, BindingResult errors) {
		// Not implemented in base class
	}

	/**
	 * Validation method for incoming approval objects.
	 * Ideally Validator implements Spring Validation {@link org.springframework.validation.Validator}
	 * <p>
	 * Note that as per Spring validation structure incoming errors object is expected to be modified with errored fields & messages
	 *
	 * @param approvalDTO A subclass of {@link com.vsware.daoService.request.ApprovalDTO}
	 * @param errors      BindingResult from Spring Controller
	 */
	protected void validate(U approvalDTO, BindingResult errors) {
		// Not implemented in base class
	}

	private ResponseEntity<?> forExistingRequest(Integer requestId, Function<Integer, ResponseEntity<?>> f) {
		if (requestService().getById(requestId) != null) {
			return f.apply(requestId);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}



