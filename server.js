/**
* Express config
*/

var express = require('express'),
	app = module.exports = express(),
	http = require('http'),
	server = http.createServer(app),
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
		console.log("** Error while reading config.json: " + e);
	}

	if(typeof(json.twitter) !== undefined) {
		config.twitter = { 
			consumer_key		: json.twitter.consumer_key,
			consumer_secret		: json.twitter.consumer_secret,
			access_token_key	: json.twitter.access_token_key,
			access_token_secret	: json.twitter.access_token_secret,
			track				: json.twitter.track
		}
	};

	if(typeof(json.schedule) !== undefined) {
		config.schedule = {
			host	: json.schedule.host,
			port	: json.schedule.port,
			path	: json.schedule.path,
			time_slots: json.schedule.time_slots
		}
	}

	if(typeof(json.admin) !== undefined) {
		config.admin = {
			user : json.admin.user,
			pass : json.admin.pass
		}
	}

	return config;
}();

/**
* Utils
*/
var adminAuth = express.basicAuth( function(user, password) {
	return ( user == config.admin.user && password == config.admin.pass) ? true : false;
});

function strencode( data ) {
  return unescape( encodeURIComponent( JSON.stringify( data ) ) );
}

/**
* Routing
*
* /schedule
* /wall
* /admin
* /push
* GET /update
* POST /update
* /
*/

app.get('/schedule', function(req, res) {
	res.sendfile(__dirname + '/public/schedule.html');
});

app.get('/wall', function(req, res) {
	res.sendfile(__dirname + '/public/wall.html');
});

app.get('/admin', adminAuth, function(req, res) {
	res.sendfile(__dirname + '/public/admin.html');
});

app.get('/push', adminAuth, function(req, res) {
	updateJSON(req, res);
});

app.get('/update', adminAuth, function(req, res) {
	res.sendfile(__dirname + '/public/update.html');
});

app.post('/update', adminAuth, function(req, res) {
	handleUpdatePost(req,res);
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/wall.html');
})

server.listen(8080);
console.log(' | Server listening');

/**
* Twitter functions
*
* set up connection
* push to client
* handle disconnects from twitter
*/

var twitter = require('ntwitter'), 
	twitter_stream = '',
	tweet_buffer = new Array(),
	tweet_buffer_length = 30;

var t = new twitter({
	consumer_key: config.twitter.consumer_key,
	consumer_secret: config.twitter.consumer_secret,
	access_token_key: config.twitter.access_token_key,
	access_token_secret: config.twitter.access_token_secret
});

function connectStream(){

	t.stream('statuses/filter', {track: config.twitter.track}, function(stream) {

		twitter_stream = stream;

		console.log(' | Stream start');

		stream.on('data', function(data){
			json = strencode(data);

			if(json.length > 0) {
				try {
					updates.emit('tweet', json);
					tweet_buffer.push(data);
				}
				catch(e) {
					console.log("** Error sending Tweet: " + e);
					console.log("** Tweet: " + json);
				}
			}
		});

		stream.on('end', function(data) {
			twitter_stream = '';
			pruneTweetBuffer();
			console.log(' | Stream end');
		});

		stream.on('error', function(error) {
			twitter_stream = '';
			console.log('** Error in Twitter Stream: ' + error);
			connectStream();
		});
	});
																																																																																																
}

function pruneTweetBuffer() {
	if(tweet_buffer.length > tweet_buffer_length) {
		console.log(' | Pruning Tweet Buffer: START - ' + tweet_buffer.length);
		tweet_buffer.splice(0, (tweet_buffer.length - tweet_buffer_length));
		console.log(' | Pruning Tweet Buffer: END - ' + tweet_buffer.length);
	}
}

/**
* Schedule functions
*
* update schedule json
* push updated schedule to client
* update currently running session
*/

var schJSON = {},
	updJSON = {};

function readJSON() {
	try{
		console.log(' | Reading JSON');
		fs.readFile(__dirname + '/web.json', 'utf8', function(error, data) {
			schJSON = JSON.parse(data);
		});
		fs.readFile(__dirname + '/updates.json', 'utf8', function(err, data) {
			updJSON = JSON.parse(data);
		})
	}
	catch(e) {
		console.log('** Error reading JSON: ' + e);
	}
}

readJSON();

function pushSchedule() {
	schedules.json.send(schJSON);
	console.log(' | Schedule pushed to clients');
}

function updateJSON(req, res) {
	// get JSON from barcampbangalore.org

	var schRequest = http.request({
		host: config.schedule.host,
		port: config.schedule.port,
		path: config.schedule.path,
		method: 'GET'
	}, function(resp){
			if(resp.statusCode == 200 ) {
				var outfile = fs.createWriteStream(__dirname+'/web.json');
				var buff = '';

				resp.setEncoding('utf8');
				resp.on('data', function(chunk) {
					outfile.write(chunk);
					buff += chunk;
				});

				outfile.on('close', function() {
					console.log(' | Schedule retreived successfully');
					try {
						schJSON = JSON.parse(buff);
						pushSchedule();
					}
					catch(e) {
						console.log("Error: " + e);
					};
				});

				resp.on('end', function() { 
					outfile.end();
					res.write('JSON updated!<br />');
					res.end();
				});
			}
			else {
				console.log('** Error in retrieving schedule JSON ' + resp.statusCode);
			};
	});

	console.log(' | Retrieving schedule from '+config.schedule.host);
	schRequest.end();

}


/**
* Updates functions
*
* handle post of an update
*/

function handleUpdatePost(request, response) {
	if(request.body.update_cancel == undefined && request.body.update_submit == "true") {
		// handle post
		var update_string = request.body.update_text;

		updates.json.emit("new_update", { ata : update_string });
		response.write("Update pushed<br />");

		try {
			var updateJSON = JSON.parse(fs.readFileSync(__dirname +'/updates.json', 'utf8'));
			updateJSON.updates.push(update_string);
			fs.writeFileSync(__dirname+'/updates.json', JSON.stringify(updateJSON), 'utf8');
			updJSON.updates.push(update_string);
		}
		catch(e) {
			console.log("Error storing update: " + e);
		}
		response.write("Update stored<br />");
		response.end();
	}
	else if(request.body.update_submit == undefined && request.body.update_cancel == "true") {
		response.redirect('/update');
	}
	else {
		response.write("Incorrect request<br />");
		response.end();
	}
}

var moment = require('moment');

function setCurrentSession() {
	var now = moment();

	var current_slot_index = 0;
	while(now.isAfter(config.schedule.time_slots[current_slot_index], 'minute')) {
		current_slot_index += 1;
		if(current_slot_index >= 12) {
			break;
		}
	}

	var output = {};

	// we haven't yet started the day
	if(current_slot_index <= 0) {
		output.type = 'special';
		output.string = "Barcamp Bangalore 13 begins at 08:00 AM on 2nd March 2013, hope to see you there!";
	}
	else if (current_slot_index >= 12) { // the day has ended
		output.type = 'special';
		output.string = "Barcamp Bangalore 13 is over. Thanks for coming by.";
	}
	else { // we are in some session
        if(typeof(schJSON.slots) === "undefined") {
            // Argh! We don't yet have a schedule! Fill up all the slots and generate it
            output.type = 'special';
            output.string = 'Barcamp Bangalore 13 is go! Where is the schedule yo?';
        }
        else {
            output.type = schJSON.slots[current_slot_index-1].type;
            output.tracks = schJSON.tracks;
            output.slot = schJSON.slots[current_slot_index-1];
        }
	}

	updates.emit( "current_session", { ata: output } );
}

/**
* Websockets
*
* set up updates+twitter socket, populate initial updates
* set up schedule socket, populate initial schedule
*/
var	io = require('socket.io').listen(server),
 	totWallUsers = 0,
 	totScheduleUsers = 0;
	
io.configure(function() { 
	io.enable('browser client minification');
	io.enable('browser client etag');
	io.enable('browser client gzip');
	io.set('log level', 1); 
	io.set('transports', [ 
			'websocket',
		//	'flashsocket',
			'htmlfile',
			'xhr-polling',
			'jsonp-polling'
	]);
}); 

var updates = io.of('/updates').on('connection', function(client) {
	totWallUsers++;
	console.log(' | User '+ client.id +' connected, total wall users: ' + totWallUsers)

	if ((totWallUsers > 0) && (twitter_stream == '')) {
		connectStream();
	}

	client.json.emit('init_updates', { ata : updJSON } );

	setCurrentSession();

	if(tweet_buffer.length > 0) {
		tweet_buffer.forEach(function(element){
			client.json.emit('tweet', strencode(element));
		})
	}

   	client.on('disconnect', function() {
		totWallUsers--;
		console.log(' | User '+ client.id +' disconnected, total wall users: '+ totWallUsers);

		if (totWallUsers == 0) {
			console.log(' | 0 Users, disconnecting Twitter stream');
			twitter_stream.destroy();
			twitter_stream = '';
		}

	});
});

var currentSessionInterval = setInterval(setCurrentSession, 300000);
var pruneTweetBufferInterval = setInterval(pruneTweetBuffer, 60000);
var pushScheduleInterval = setInterval(pushSchedule, 300000);

var schedules = io.of('/schedule').on('connection', function(client) {
	// push the current json to the new socket
	totScheduleUsers++;
	console.log(' | User ' + client.id + 'connected, total schedule users: ' + totScheduleUsers);

	client.json.send(schJSON);

	client.on('disconnect', function() {
		totScheduleUsers--;
		console.log(' | User '+ client.id + ' disconnected, total schedule users: ' + totScheduleUsers);
	});
});
