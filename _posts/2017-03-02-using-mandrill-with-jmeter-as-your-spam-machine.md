---
layout: post
title: Using Mandrill with JMeter as you spam machine
teaser:
tags:
  - JMeter
  - Json
permalink:
header: yes
---

Recently we had the need to send a bunch of Emails to our clients. By a bunch I mean into tens of thousands. For this task we had an account with [Mailchimp](https://mailchimp.com/) and chose [Mandrill](https://mandrillapp.com/) to be the correct tool for this job. 

Due to the ad-hoc and potential once-off nature of this task the hackier the solution the better. Naturally. The outgoing email that we had was an HTML file with quite a few images. For this to work we needed to upload images to host them somewhere and then reference them in the final HTML email. Luckily Mailchimp has the possibility to import a template and they will automatically host images for you. Mandrill integrates well with Mailchimp and you can actually [push the saved Mailchimp template to be used with Mandrill](https://mandrill.zendesk.com/hc/en-us/articles/205583097-How-do-I-add-a-MailChimp-template-to-my-Mandrill-account-).

Mandrill has quite a nice API documentation how to make use of templates etc. and send out emails using their JSON API. Our use case was to use a predefined template and swap in some variables within the message, these variables coming from a flat file. Since we are already using JMeter for our performance tests and our ops people are familiar with it, we decided to do this ad-hoc operation with it as well. Building a node.js (or any other) solution for this is fairly trivial in the if we decide that an email spamming route is a good way for us to go forward. 

How did we set this up then?

Here is a bunch of images that we used to spam a ton of people with emails. 

JMeter scenario setup:

![Simplified JMeter scenario]({{ site.url }}/assets/img/jmeter/jmeter.png)

We wanted to use a CSV file as our datasource for the dynamic content in our message. We also wanted to send a message to all users that were present in the CSV file so we needed a looping mechanism to handle that. Here is a screenshot of the CSV Data Set config:

![JMeter CSV Data Set Config]({{ site.url }}/assets/img/jmeter/csv-config.png)

The file itself is extremely simple, containing only 2 comma separated fields, for example:

```
jussi@hallila.com,Jussi Hallila
example@example.com,Ex Ample
```

And here is the while loop with a simple "exists/doesn't exist" check:

![JMeter While loop config]({{ site.url }}/assets/img/jmeter/while-loop.png)

The check is not necessarily even needed because our CSV data set config will take care of stopping our thread if it hits EOF. 

Few things to note regarding variable naming. We can mix and match `Mandrill` and `JMeter` variables in our JSON. Mandrill expects variables to indicated with a pattern `*|VARIABLE_NAME|*`, JMeter uses pattern `${VARIABLE_NAME}`. JMeter variables will be replaced directly from the CSV file, using the naming convetion defined in our CSV data set config. Mandrill will take variable from the actual JSON file that is POSTed to it. More info on this can be found from [Mandrill docs](https://mandrillapp.com/api/docs/messages.html). The interesting lines are the following :

```json
    "merge_vars": [
      {
        "rcpt": "${recipientAddress}",
        "vars": [
          {
            "name": "FNAME",
            "content": "${recipientName}"
          }
        ]
      }
    ]
```

Naturally this is an ad-hoc hack and probably shouldn't be promoted to actual production use. It is too labourious to getch data from DB to a CSV and modify JMeter scenario to use correct variables. With a little bit more effort a quick application can be created to do that job for. 
