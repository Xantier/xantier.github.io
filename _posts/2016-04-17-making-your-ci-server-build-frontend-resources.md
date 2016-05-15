# Making Jenkins build your frontend resources

In Java world Maven or Cradle is often king and that makes often difficult to include other things into your build process painlessly. If we think about a modern frontend development where Node.JS based build tool is used separately from backend processes it is sometimes hard to think of a good way to make the connection between these two separate things. When it comes to CI servers, Jenkins is as good a choice as anything else and having its background heavily living in the Java world it plays well with Java build tools. Now that Node.js is already mainstream the support for that infrastructure is as well very mature to be included in Jenkins. Today we won't be touching web development worlds Travis, Codeship, CircleCI or Go CD, we'll go with self hosted and trusty old Hudson/Jenkins.

An "old style" Jenkins job is one where we would usually have a build step running our maven commands, running tests through it, maybe creating and releasing artifact out of it. This would mostly be handled via maven or cradle. Because the ecosystem on that side is very good and more often than not has plugins for each situation it might be intriguing to try to push your frontend builds through that channel as well. If you decide to go that road, [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) is a brilliant option to bake them in. Today I will display another approach where we use purer way to access our frontend build process.

Let's go through two different ways how we could achieve this:
1. Old style Jenkins job with a help of few plugins
2. Jenkins pipeline with groovy script

### Adding frontend build process to your Jenkins 1.x

To get started we need to naturally have Node.js installed on CI server. This is done very easily by installing [NodeJS Plugin](https://wiki.jenkins-ci.org/display/JENKINS/NodeJS+Plugin) to your Jenkins. After that is done and you have configured an instance that can be used by the server there is another plugin that will make your life easier. That is called [Conditional Build Step Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Conditional+BuildStep+Plugin). With this guy you can easily incorporate some decision logic to your build process. We will use that logic to see if our frontend resources have changed and based on that check will trigger building, testing and releasing our frontend artifacts.

On your job configuration, before running your maven commands, add a conditional step. For type you should select Script Condition and that let's you have free reign over what condition to input. For our purposes we wanted to restrict our frontend resources building only to cases where there actually was some changes to them. We would check if the build was meant to be released and checked all the changes between last release tag on latest commit. If there were any changes, we would launch the frontend build. All this would go through Node.JS so for us that meant using NPM scripts to actually do the magic. Behind those NPM scripts where various webpack configurations and Mocha/Babel/Istanbul settings. For those settings you should check previous post on how to set them up on your project: [Introducing A Build Process For Your Frontend Resources]({% post_url 2016-03-28-introducing-a-build-process-for-your-frontend-resources %}).

Long story short, here is the conditional sh we used to determine if we should launch our CI build for frontend stuff:
```
if ${IS_M2RELEASEBUILD} && git diff --name-only $(git rev-list -n 1 $( git describe --abbrev=0 --tags ))..HEAD projectname-web/src/main/webapp/app/ | grep /src/; then
    exit 0
elif git diff --name-only ${GIT_PREVIOUS_SUCCESSFUL_COMMIT}..HEAD projectname-web/src/main/webapp/app/ | grep /src/; then
    exit 0
else
    exit 1
fi
```

Some sh and git fu right there. What we simply do in the first if clause that if the build is parameterized as a maven release build we will check git diff in our static folder between the latest tagged commit and HEAD. If any of those changes have happened in the src folder, we will exit with code 0. The second if checks cases where we are not running a release build. In these cases we will only check the difference between previous successfully built commit and HEAD.

With this we can determine whether to actually run our frontend steps. Again we fall back to trusty sh script and use that to execute our Node.JS steps. In our case those steps look more or less like this:

```
cd projectname-web/src/main/webapp/app
npm install
npm run test-cov
npm run build
```

Simple as that; installing dependencies, running tests and (in case of release builds) bundling, minifying, busting cache and copying compiled frontend resources to correct places.

### Adding frontend build process to your Jenkins 2.x (or 1.x with pipeline plugin)

New version of Jenkins finally brought up a good integration to pipelining your build process. This has been there for a long time when using the [Jenkins pipeline plugin](https://wiki.jenkins-ci.org/display/JENKINS/Pipeline+Plugin) (was before called workflow plugin). This guy is brilliant because it lets you create your job configuration in to a dotfile in the project. In Jenkins environment this file is called Jenkinsfile (without the dot :/ ). Jenkinsfile contains your build process steps written in Groovy and that is read by the pipeline automatically when your Jenkins job is configured properly. With the help of pipeline and Jenkinsfile the life becomes so much easier, especially in cases where you are doing things the right way and building from branch regurarly.

Alright, that's fine and dandy, but how does a Jenkins file look like? Here is our file that checks our source from git, runs unit and integration tests, build frontend resources and creates (and optionally releases) a docker container for the project.

```
#!groovy

node {
    def mvnHome = tool 'mvn'
    def nodeHome = tool name: 'node4LTS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

    stage 'Checkout'
    git url: 'git@bgithub.com/Xantier/repo.git'

    stage 'Unit Tests'
    sh "${mvnHome}/bin/mvn surefire:test -Dmaven.test.failure.ignore verify"
    step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/TEST-*.xml'])


    stage 'Integration Tests'
    sh "${mvnHome}/bin/mvn failsafe:integration-test"
    step([$class: 'JUnitResultArchiver', testResults: '**/target/failsafe-reports/TEST-*.xml'])

    stage 'Build'

    def RELEASEBUILD = RELEASE == true;
    // If git has changes on frontend resources, run frontend build
    sh '''
    if ${RELEASEBUILD} && git diff --name-only $(git rev-list -n 1 $( git describe --abbrev=0 --tags ))..HEAD projectname-web/src/main/webapp/app/ | grep /src`/; then
        echo true > result
    elif git diff --name-only ${GIT_PREVIOUS_SUCCESSFUL_COMMIT}..HEAD projectname-web/src/main/webapp/app/ | grep /src/; then
        echo true > result
    else
        echo false > result
    fi
    '''

    def buildFrontend = readFile('result').trim()
    if (buildFrontend == true) {
        sh '''
        cd projectname-web/src/main/webapp/app
        npm install
        npm run test-cov
        npm run build
        '''
        step([$class: 'JUnitResultArchiver', testResults: 'projectname-web/src/main/webapp/app/test/test-results.*.xml'])
    }

    // Run the maven build
    sh "${mvnHome}/bin/mvn clean install -DskipTests"


    stage 'Containerization'
    sh "${mvnHome}/bin/mvn -f projectname-docker/pom.xml docker:build -Dversion=${VERSION} "


    if (RELEASE == true) {
        sh "${mvnHome}/bin/mvn -f projectname-docker/pom.xml docker:push"
    }
}
```

Pretty self explanatory. We have a bunch of stages to make things look nice on [Pipeline Stage View](https://wiki.jenkins-ci.org/display/JENKINS/Pipeline+Stage+View+Plugin). As you can see almost every call is to "sh", once again. Old habits die hard. Anywhoo, let's take a closer look. The stages on this Jenkinsfile are:
1. Retrieving source code from Git repo. Note how we didn't define a branch here, this will retrieve changes from all branches and build them if a Jenkinsfile is present. This way we can easily build a [Multibranch Pipeline](https://jenkins.io/blog/2015/12/03/pipeline-as-code-with-multibranch-workflows-in-jenkins/)

2. Next we run our unit tests. We define that if those fail, we don't want to break the build, we will just make it unstable. We also archive our test results by capturing them from the generated results xml file.

3. Thirdly we run all integration tests. Because of the nature of the tests we want to break the build on this case. Again we capture test results.

4. Next comes the actual build process. That magic "RELEASE" variable is coming in as a parameter to the build process. That can be passed in as a request param on the GET request for example so this is easily incorporated to our Hubot and chatops flow. Again we check git for changes and build frontend if there has been changes to our frontend files. After that we build the backend.

5. Finally we reach a dockerization. Again we use sh to call Maven which uses [docker-maven-plugin](https://github.com/fabric8io/docker-maven-plugin) to actually create the image and in case of release build, push it to our Docker registry.


That's more or less all that is to it. Another stages you might want to think of adding here would be to deploy your application to an environment where functional/UI/performance tests could be run and deploying the container to be manually QA'd. Maybe there could even be a step that waits for QA input to mark the branch as tested that would launch a downstream build merging it to master and creating a production release. :o

One of these days...
