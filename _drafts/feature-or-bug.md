# When does a bug become a feature

After last weeks debacle around Firebase and their changed billing we heard from their founder how the original implementation of their billing code was a bug. This and discussions around our city's Slack channel lead me to thinking when is a bug actually a bug and when does it cross the threshold to become a feature.

Let's take a look at few notable feabuges.

Firebase.


We often talk about code comments and how they get outdated. Someone in the Slack channel mentioned how in his point of view, in case the comment is copied over from Jira or from a spec, the comment should overrule the actual implementation of the code.

This might make sense in code review scenarios when the code itself is still fresh. This doesn't hold water so well when the code is shipped and and is exposed to the customer already.

sometimes the comment is cut and pasted from the original, incorrect spec or is like this: http://imgur.com/BcVPbbU

