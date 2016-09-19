While creating a Jenkins pipeline at times there is a need to do some extra checks before continuing with the execution. In our case a check we needed to implement was to retrieve pull request information from Bitbucket before merging/creating a release for QA. Luckily since we have nearly the full Groovy language at our disposal, making a request to Bitbucket's REST API is easy enough solution for this.

package ie.brandtone;

import groovy.json.JsonSlurper

@NonCPS
def checkApprovals(String repository, String branch) {
    String baseUrl = "https://bitbucket.org/api"
    String version = "2.0"
    String organization = "brandtone"
    String pullrequestListUrl = [baseUrl, version, "repositories", organization, repository, "pullrequests"].join("/")
    def json = makeRequest(pullrequestListUrl)

    def devApprovals = 0;
    for (it in json.values) {
        if (it.source.branch.name == branch) {
            println it.source.branch.name;
            String pullReqUrl = [baseUrl, version, "repositories", organization, repository, "pullrequests", it.id].join("/")
            def pullreq = makeRequest(pullReqUrl)
            println "Pull Request by ${pullreq.author.display_name}, Branch ${pullreq.source.branch.name}"
            for (participant in pullreq.participants) {
                println "Approved by ${participant.user.display_name}: ${participant.approved}"
                if (participant.approved && users.developers.containsKey(participant.user.display_name)) {
                    devApprovals++
                }
            }
        } else {
            println "SKIPPING BRANCH it.source.branch.name"
        }
    }
    return devApprovals;
}

@NonCPS
def getOwner(String repository, String branch) {
    String baseUrl = "https://bitbucket.org/api"
    String version = "2.0"
    String organization = "brandtone"
    String pullrequestListUrl = [baseUrl, version, "repositories", organization, repository, "pullrequests"].join("/")
    def json = makeRequest(pullrequestListUrl)
    for (it in json.values) {
        if (it.source.branch.name == branch ) {
            return users.getDevelopers().get(it.author.display_name);
        }
    }
}

@NonCPS
private static Object makeRequest(String reqUrl) {
    URL url = reqUrl.toURL()
    URLConnection connection = url.openConnection()
    String username = "btjenkins"
    String password = "B5j3Nk8Ns"
    String userpass = "${username}:${password}"
    connection.setRequestProperty("Authorization", "Basic " + userpass.getBytes().encodeBase64())
    InputStream inputStream = connection.getInputStream()
    def text = inputStream.text
    def json = new groovy.json.JsonSlurper().parseText(text)
    inputStream.close()
    return json
}


