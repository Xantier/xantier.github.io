Every morning cron job:

```javascript
// Description:
//   Displays daily good morning message on chat room
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//
// Author:
//   Jussi Hallila

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

module.exports = function (robot) {
  var pattern = '0 00 09 * * 1-5';
  var timezone = 'Europe/Dublin';
  return new cron(pattern, timezone, getAbsentees(robot));
};

function getAbsentees(robot) {
  return function () {
    return whosoff(robot, 'Today', function () {
      var msg = 'Good morning team\n';
      msg += allPresentArray[Math.floor(Math.random() * allPresentArray.length)];
      robot.messageRoom('308968_notificationlistener@conf.hipchat.com', msg);
      robot.messageRoom('308968_qa__dev@conf.hipchat.com', msg);
    }, function (message) {
      var msg = 'Good morning team\n';
      msg += "We seem to have absentees today:\n" + message;
      robot.messageRoom('308968_notificationlistener@conf.hipchat.com', msg);
      robot.messageRoom('308968_qa__dev@conf.hipchat.com', msg);
    });
  }
}
```

Whosoff library function:

```javascript
var qa_cal_id = 1113201516399999;
var cal = require("ical");
var moment = require('moment');
require('moment-range');

module.exports = function whosoff(msg, query, emptyResp, fullResp) {
  var end_date, start_date;
  var calendar_id = process.env.HUBOT_WHOSOFF_CALENDAR_ID || 10302015122127966;
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
      counter = 0;
      for (var k in calendar) {
        if (calendar.hasOwnProperty(k)) {
          var event = calendar[k];
          if (range.overlaps(moment.range(event.start, event.end)) && event.categories[0] !== 'FREE DAY') {
            counter += 1;
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
      var qa_url = url + qa_cal_id;
      return msg.http(qa_url).get()(function (err, res, body) {
        if (res && body) {
          calendar = cal.parseICS(body);
          for (var k in calendar) {
            if (calendar.hasOwnProperty(k)) {
              var event = calendar[k];
              if (range.overlaps(moment.range(event.start, event.end)) && event.categories[0] !== 'FREE DAY') {
                counter += 1;
                var data = [event.summary, event.categories].join(" - ");
                var from = new Date(event.start);
                var to = new Date(event.end);
                if (from.toDateString() === to.toDateString()) {
                  lines.push("    " + data + " from " + (from.toLocaleTimeString()) + " to "
                    + (to.toLocaleTimeString()) + " on " + (from.toDateString()));
                } else {
                  lines.push(
                    "    " + data + " from " + (from.toDateString()) + " to "
                    + (to.toDateString()));
                }
              }
            }
          }
          if (counter > 0) {
            fullResp(lines.join('\n'));
          } else {
            emptyResp(query);
          }
        } else {

        }
      });
    } else {

    }
  })
};
```



