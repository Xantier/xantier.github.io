- Install locally.
- Develop locally.
- Ship to integration machine. 
- Test on integration machine.
- Integrate with other teams.
 - Build a network of computers within the workspace
  - One dev runs one service and keeps it up to date, other use and connect to that
- Deploy to remote machines to production


In the early days of web development everything was easy. We could modify HTML files on a remote box (or even locally if they were hosted on your workstation) and they would be live immediately. We could FTP PHP files over to a server and they would just work. Nowadays things are getting more complex. 

After hacking pieces together and shipping them willy-nilly the industry moved towards Continuous Integration. This was needed because software grew bigger, team sizes became bigger and there was a need to try to manage all the code as a single coherent package. With continuous integration we were always able to find the canonical source of truth, the final, integrated and (possibly) working version of our source code. 
- Bad points
  - Time sink
  - Disrupting workflow because of waiting
  - Not real time
  - Complexity of setting up
- Good points
  - Security on quality
  - Able to see that separate pieces work together

Nowadays we are taking a step back from monolithic approach and moving complexity to the boundaries of our source code. The preferred choice of architecture is leaning more towards microservices, small isolated pieces of functionality that is easy to change and easy to deploy. This brings with it other bits of problems like integration of services, trying to get the whole system running for a single developer without large effort etc. 

- Bad Points
  - Service needs to be 'released' before it can be developed against
  - Cross-team boundaries are drawn more strictly, hindering cross company learning 
  - Possibly multiple styles of code within the company
  - Getting started could be labourious (creating repo, initializing code etc.)
- Good things
  - Isolation and doing one thing only and doing it well

