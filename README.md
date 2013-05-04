## BCB Twitter Streaming

Show tweets, updates, schedule as well as the currently running sessions for an event.

Used during [Barcamp Bangalore](http://barcampbangalore.org) 12 & 13. Designed for projecting on screens 1600x900px. Looks fine on normal screens and is usable on mobile devices.

Companion project to [BCB Platform](https://github.com/amanmanglik/BCB-Platform), uses the schedule JSON generated from this project.

### Required

* node.js
* express (3.x)
* socket.io (0.9.x)
* ntwitter (0.5.0)
* moment (2.0.0)
* handlebars (1.0.0-rc3, included)
* jmpress.js (0.4.3, included)
* jquery (1.9.1, included) 

### TODO

In no particular order

* Refactor and modularise code
* Generate schedule page and css based on number of slots and rooms
* Improve usability on mobile devices
* Improve security
* Improve error logging and handling
* Remove BCB13 specific branding and make it suitable for all events
* Follow Twitter guidelines completely for tweet display
