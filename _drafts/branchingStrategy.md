


For branching strategy we use a variation between Github Flow and Git Flow leaning heavily towards Github side. More information on https://guides.github.com/pdfs/githubflow-online.pdf
The purpose of this branching strategy is to keep the master branch as clean as possible so that is always in a deployable state. In this branching strategy a feature is developed in its own branch all the way till the end and merged back to master only when it is ready to be released to production. The work done on the branch includes development, manual exploratory testing, possible modifications on the code, automated QA testing and code review. 
 
In it's simplest form this strategy can be seen in the diagram below:

All individual features are developed and tested on a branch and after they are in a releasable state, they can be merged back to master. This also means that when branching for a feature you need use common sense when defining tasks and defining what feature/featuresets to work on. 
 
Due to the limitation of only one QA database at times we need to make some amendemnts to this flow. In case DB changes are breaking the build for other features an ad-hoc QA branch can be used as an integration point for releasing to QA environment. This doesn't interfere with "one feature at a time" mindset and keeps the master branch again in clean and releasable state. See this strategy below:

 
Create Feature Branch
Create the branch on your local machine and switch in this branch :
$ git checkout -b [name_of_your_new_branch] 
Push the branch on GitHub :
$ git push origin [name_of_your_new_branch]
Branch Naming
Branch name should start with a keyword defining if it is a feature or a hotfix. Continuous delivery process determines the build version number based on this keyword. Keyword 'feature' creates a minor release, 'hotfix' creates a patch release.
The rest of the branch name should be the JIRA ticket that you are working on plus an '_' (underscore) and a quick description if needed. See the example below:
feature_BTB-531_TargetMessaging
Note: Due to issues executing http requests to our branches it is discouraged to use # (hash,pound,sharp) or forwardslash sign in your branch name.
Code Reviews = Pull Requests
Code reviewing process is done via Bitbucket. When a feature is finished and all work is committed and pushed to the feature branch a pull request should be created in Bitbucket. A watcher should be added that has familiarity with both the feature and the code base. Once the feature is approved and tested it can merged back to the master branch.
