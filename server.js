/**
* Express config
*/

var express = require('express'),
	app = express(),
	fs = require('fs');

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger(':remote-addr - :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));	
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

/**
* Configure self
*/
var config = function() {
	var json, config = {};

	try {
		json = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
	}
	catch(e) {
		console.log("Error while reading config.json: " + e);
	}

	if(typeof(json.twitter !== undefined)) {
		config.twitter = { 
			consumer_key		: json.twitter.consumer_key,
			consumer_secret		: json.twitter.consumer_secret,
			access_token_key	: json.twitter.access_token_key,
			access_token_secret	: json.twitter.access_token_secret,
			track				: json.twitter.track
		}
	};

	if(typeof(json.schedule !== undefined)) {
		config.schedule = {
			host	: json.schedule.host,
			port	: json.schedule.port,
			path	: json.schedule.path,
			time_slots: json.schedule.time_slots
		}
	}

	return config;
}();


/**
* Routing
*
* /schedule
* /wall
* /admin
* /push
* /update
* /send-update
* /
*/

/**
* Twitter functions
*
* set up connection
* push to client
* handle disconnects from twitter
*/

var twitter = require('ntwitter');

var t = new twitter({
	consumer_key: config.twitter.consumer_key,
	consumer_secret: config.twitter.consumer_secret,
	access_token_key: config.twitter.access_token_key,
	access_token_secret: config.twitter.access_token_secret
});

t.stream('statuses/filter', {track: config.twitter.track}, function(stream) {

	console.log('* Stream start');

	stream.on('data', function(data){
		console.log(data);
	});

	stream.on('end', function(data) {
		console.log('* Stream end');
	});

	stream.on('error', function(data) {
		console.log('error' + data);
	});
});

/**
* Schedule functions
*
* update schedule json
* push updated schedule to client
* update currently running session
*/

/**
* Updates functions
*
* handle post of an update
*/

/**
* Websockets
*
* set up updates+twitter socket, populate initial updates
* set up schedule socket, populate initial schedule
*/