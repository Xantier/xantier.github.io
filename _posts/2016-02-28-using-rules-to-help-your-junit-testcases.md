---
layout: post
title: Using Rules to Help Your JUnit Testcases
teaser:
tags:
  - Java
  - JUnit
  - TDD
permalink:
header: no
---

Everyone in the Java world is aware of writing tests and the importance of them. Most developers are also aware of JUnit library, which is usually without fail baked in to your maven project (naturally I'm assuming here that TestNG people don't exist, sorry about that). We have some brilliant helper libraries like Mockito, Hamcrest and PowerMock to help us in our journey to test nirvana.

Today I want to write about one thing that I've found to be overlooked in various codebases. [That is JUnit's baked in Rules functionality.](https://github.com/junit-team/junit/wiki/Rules)

Rules are configurable JUnit annotations. They can be used to create shareable "rules" (sigh) that are run before each individual test method or test class. There are two different annotations to define rules: `@Rule` and `@ClassRule`. As the name suggests `@ClassRule` is run for each test class, closely resembling the `@BeforeClass` annotation. `@Rule` depends on the implementation but it is easy to make a mental leap thinking that it behaves closely similarly to `@Before` in JUnit.

Let's take a look at few use cases:

1. Setting up temporary resources before each test method
  * Why not do this with `@Before`? Reusability
2. Simple logging additions for complicated test cases
  * Adding step to do logging before and after methods is a big help
3. Dynamically changing annotation values in test methods
  * For example for integration tests that are run back-to-back and use external resources
4. Initializing database mock / file resources / starting up a stub server before test cases
  * Helps a lot because you can create these to be reusable setup tasks that can be shared across tests, without the need to fall into inheritance trap
5. Enhancing your test cases without the need to create a new test runner that delegates your other custom runners
  * JUnit is unable to handle multiple runners, `@Rule`s can be big big help in those few cases when you need functionality not offered by your runner

Alright, how do we use and create these guys then?

There is a bunch of defaults within the JUnit library that you can use. Often times though it's more fun to create your own.

I will create these inline, naturally if you are reusing your `@Rule`s you will want to start gathering them into a library.


First.

```java
@Rule
public TestRule myRule = new TestRule() {
    @Override
    public Statement apply(Statement statement, Description description) {
        setupResourceFor(description.getMethodName());
        return statement;
    }
};

private void setupResourceFor(String methodName){
  Config configReadFromJson = readJson(JSON_LOCATION).get(methodName)
  createTemporaryFolderAndCopyFileToCorrectLocation(configReadFromJson);
}
```

Second.

```java
@Rule
public TestWatcher myTestWatcher = new TestWatcher() {
    @Override
    protected void succeeded(Description description) {
        System.out.println("Successfully ran " + description.getMethodName());
    }

    @Override
    protected void failed(Throwable e, Description description) {
        System.out.println("Unlucky :( " + description.getMethodName() + " Failed.");
    }

    @Override
    protected void skipped(AssumptionViolatedException e, Description description) {
        System.out.println("Nope, not touching " + description.getMethodName());
    }

    @Override
    protected void starting(Description description) {
        System.out.println("Start your engines, I will run " + description.getMethodName());
    }

    @Override
    protected void finished(Description description) {
        System.out.println("Cool beans, all done with " + description.getMethodName());
    }
};
```

Third. This is kind of a funny example that I hacked together in order to be able to try to get our QA department more involved in creating test cases. Instead of making them write Java code, let's trick them into setting up test data in to an Excel sheet and configure test case to be run using that excel sheet.
```java
/**
 * Reading the config value from current iteration of our test case list
 * Modifying test case parameters to point to the correct setup and expected DB files.
 */
@Rule
public MethodRule dbPropRule = new MethodRule() {

    @Override
    public Statement apply(Statement base, FrameworkMethod method, Object target) {
        final SetupContainer setupContainer = setups.get(CURRENT_SETUP);
        final DatabaseSetup databaseSetup = method.getAnnotation(DatabaseSetup.class);
        final List<String> setups = setupContainer.getSetup();
        changeAnnotationValue(databaseSetup, "value", setups.toArray(new String[setups.size()]));
        final ExpectedDatabase expectedDatabase = method.getAnnotation(ExpectedDatabase.class);
        changeAnnotationValue(expectedDatabase, "value", setupContainer.getExpected());
        url = setupContainer.getUrl();
        return base;
    }
};

```

Fourth.
```java
@Rule
public TestRule myRule = new TestRule() {
    @Override
    public Statement apply(Statement statement, Description description) {
        loadDatabaseAndInsertValues(description.getMethodName());
        return statement;
    }
};

private void loadDatabaseAndInsertValues(String methodName){
  Config configReadFromJson = readJson(JSON_LOCATION).get(methodName)
  createDbSchema(configReadFromJson.getSchema());
  insertValues(configReadFromJson.getInsertStatements());
}
```

Fifth. This is closely related to example number three. Here we are reading a JSON file from the resources folder and creating a repeating statement that runs the test case as many time as we have setups. This combined with changing configs at runtime helps externalizing your setups in e2e cases for example.

```java
/**
 * Reading test data JSON file to a list of configurations.
 * Creating new statement to run the test case as many times as there are configs.
 */
@ClassRule
public static TestRule repeatRule = new TestRule() {
    @Override
    public Statement apply(Statement statement, Description description) {
        try {
            String json = CharStreams.toString(new InputStreamReader(
                  ParameterizedEnd2EndTestBench.class.getResourceAsStream(TEST_CASES_JSON),
                  Charsets.UTF_8));
            objectMapper.configure(JsonParser.Feature.ALLOW_COMMENTS, true);
            setups = objectMapper.readValue(StringEscapeUtils.unescapeJson(json), objectMapper.getTypeFactory().constructCollectionType(List.class, SetupContainer.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new Statement() {

        @Override
        public void evaluate() throws Throwable {
            for (int i = 0; i < setups.size(); i++) {
                statement.evaluate();
            }
        }
    }
};
```

That's everything for now. Do you know any other good use cases for JUnit `@Rule`s?
