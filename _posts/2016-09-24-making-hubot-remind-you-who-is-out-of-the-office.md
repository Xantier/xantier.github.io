---
layout: post
title: Making Hubot remind you who is off every morning
teaser:
tags: javascript node.js hubot
permalink:
header: no
---

At times you need to take a look at something lighter minded that you can tinker around with. I am a big proponent of async communication and chatrooms. Have always been and as far as I am foreseeing, will be. That is probably because of positive memories from mid-late nineties and childhood years spent on IRC. That is probably also the reason that when I want to unwind and do something not too serious, I turn into scripting some Javascript and hooking that up on the Hubot instace I set up at $DAYJOB as my first sideproject.

As for some reason has been the tradition in the companies I have been working in, we are using Whosoff.com to track who is on vacation or working from home or otherwise out of the office at any given time. It is a good service and does it's job very well. So I decided to automate that and make our Hubot instance remind us every morning who is in the office and who is out.

Before we jump into the code there is a setting that needs to be turned on on Whosoff. They have a feed that can be exposed by the calendar administrator. When you have clicked that on you should be able to get the calendar ID from the list of `available feeds` on Whosoff Tools page. Now when that is done, we can take a look at how Hubot consumes that data.

First let's take a look at the actual Hubot script.

```javascript
var cron = require('hubot-cronjob');
var whosoff = require('../lib/whosoff');

var allPresentArray =
  [
    "According to whosoff we should have a full roster today.",
    "No one is absent today.",
    "Today we have all hands on deck.",
    "Whosoff tells me that everybody should be present today.",
    "I think everyone is here today.",
    "Full team in the office today.",
    "We are all here today.",
    "No absentees on this fine day.",
    "I'm here, you are here, we are all here."
  ];

var roomId = 123456789;

module.exports = function (robot) {
  var pattern = '0 00 09 * * 1-5';
  var timezone = 'Europe/Dublin';
  return new cron(pattern, timezone, getAbsentees(robot));
};

function getAbsentees(robot) {
  return function () {
    return whosoff(robot, 'today', function () {
      var msg = 'Good morning team\n';
      msg += allPresentArray[Math.floor(Math.random() * allPresentArray.length)];
      robot.messageRoom(roomId + '@conf.hipchat.com', msg);
    }, function (message) {
      var msg = 'Good morning team\n';
      msg += "We seem to have absentees today:\n" + message;
      robot.messageRoom(roomId + '@conf.hipchat.com', msg);
    });
  }
}
```

We are using `hubot-cronjob` to act as our timer and use that to call our library function every day at 9am. Our lib takes in the robot (this time we are using http client from Hubot instead of `superagent` or something more advanced), our daily query (we have few options to pick from as you'll see in a minute) and two callbacks, one for cases where everyone is present (in this case we shout a simple good morning message to the chat) and one for cases where we have absentees. That is pretty straightforward, the more interesting part is call whosoff's API and parsing the response. Our solution for that is the following:

```javascript
// ../lib/whosoff.js

var cal_id = 123456789;
var cal = require("ical");
var moment = require('moment');
require('moment-range');

module.exports = function whosoff(msg, query, emptyResp, fullResp) {
  var end_date, start_date;
  var calendar_id = process.env.HUBOT_WHOSOFF_CALENDAR_ID || cal_id;
  var url = "http://feeds.staff.whosoff.com/?u=";
  var calendar_url = url + calendar_id;
  var today = new Date();
  switch (query) {
    case "next week":
      start_date = new Date(today.getTime() + (86400 * 1000 * (8 - today.getDay())));
      end_date = new Date(start_date.getTime() + (86400 * 1000 * 5));
      break;
    case "tomorrow":
      start_date = new Date(today.getTime() + (86400 * 1000));
      end_date = start_date;
      break;
    default:
      query = "today";
      start_date = today;
      end_date = today;
  }
  var range = moment.range(start_date, end_date);
  return msg.http(calendar_url).get()(function (err, res, body) {
    var calendar, counter, lines;
    if (res && body) {
      calendar = cal.parseICS(body);
      lines = [];
      for (var k in calendar) {
        if (calendar.hasOwnProperty(k)) {
          var event = calendar[k];
          if (range.overlaps(moment.range(event.start, event.end)) && event.categories[0] !== 'FREE DAY') {
            var data = [event.summary, event.categories].join(" - ");
            var from = new Date(event.start);
            var to = new Date(event.end);
            if (from.toDateString() === to.toDateString()) {
              lines.push("    " + data + " from " + (from.toLocaleTimeString()) + " to "
                + (to.toLocaleTimeString()) + " on " + (from.toDateString()));
            } else {
              lines.push(
                "    " + data + " from " + (from.toDateString()) + " to " + (to.toDateString()));
            }
          }
        }
      }
      if (lines.length > 0) {
        fullResp(lines.join('\n'));
      } else {
        emptyResp(query);
      }
    }
  })
};
```

In here we pull in two dependencies, `ical` and `moment`. We also expose `moment-range` globally so that is usable for us when checking the dates. First few variable assignments to get everything ready and then a switch case statement to parse our dates based on the command that has been shouted to Hubot. We have three options, defaulting to today. After we have chosen our range we can make a request to Whosoff and ask for the exposed calendar. We are using `ical` to parse the calendar to an object which is easier to handle. The format is standard [ICalendar](https://en.wikipedia.org/wiki/ICalendar#Technical_specifications) format and the `ical` libray follows that same structure. After we have gotten the data we loop through individual events and see if they overlap with our specified date range. If they do, we create a simple piece of string that we push into our array. In case the start and end date are the same, it means a partial day and we need to take times into account, otherwise we just push the dates to our collection.

In the end we simply call the callback we need with the result. This library is exposed to our cron job and as well to a standard Hubot command that you can call if needs be.
