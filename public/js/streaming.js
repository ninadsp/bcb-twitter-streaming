$(document).ready(function() {
	/**
	 * Init and util
	 */
	var Debug = {

		log: function (msg) {
			console.log(new Date().toJSON() +": "+ msg);
		},

	};

	function init() {
		//Debug.log("Connecting...");

		$("#tweets_wrapper").jmpress({ 
				viewport: {
					height: 650,
					width: 760,
					maxScale: 1
				},
				fullscreen: false,
				hash: {use: false}
				});

		
	}

	var tweet_template_source = $("#tweet_template").html(),
		session_template_source = $("#session_template").html();

	var tweet_template = Handlebars.templates['wall-tweet'];
	var session_template = Handlebars.templates['wall-session'];

	var interval = window.setInterval(function(){ 
				var tweets_count = $(".tweet").length;

				if(tweets_count > 40) {
					var end = tweets_count - 40;
					$(".tweet").not(".active").slice(0,end).each(function() {
						$(this).jmpress('deinit');
						$(this).remove();
						});
				}
				$("#tweets_wrapper").jmpress('next');
			}, 10000);

	Date.prototype.format = function (fmt) {
		var date = this;

		return fmt.replace(/\{([^}:]+)(?::(\d+))?\}/g, function (s, comp, pad) {
	        var fn = date["get" + comp];

	        if (fn) {
	            var v = (fn.call(date) + (/Month$/.test(comp) ? 1 : 0)).toString();
	
	            return pad && (pad = pad - v.length) ? new Array(pad + 1).join("0") + v : v;
	        } else {
	            return s;
	        }
		});
	};

	/*
	* Main
	*/

	//var socket = new io.connect(window.location.href + 'updates');
	var socket = new io.connect('/updates');
	
	//console.log(socket);
	var tweets = $("#tweets"),
		defaultDebug = $("#stats"),
		speed = $("#speed"),
		maxSpeed = $("#maxSpeed"),
		maxPerSecondInterval = null,
		tweetsAmount = 0,
		maxTweetsAmount = 0;
		
	init();

	/* 
	* Socket stuff	
	*/
	    
	socket.on('connect', function() {
		//Debug.log("Connected.");
	});
			
	socket.on('disconnect', function() {
		//Debug.log("Disconnected.");
	});
		
	socket.on('tot', function(data) {	
	//	Debug.log("Current players number: "+ data.tot);
	});

	socket.on('filters', function(data) {	
	//	Debug.log("Parameter: "+ data.param +", value: "+ data.value);
	});

	function convertURLs(str){
		var regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/g;
		return str.replace(regex, "<a href='$1' title='Open this link in a new tab' target='_blank'>$1</a>")
	}

	function strdecode( data ) {
		return JSON.parse( decodeURIComponent( escape ( data ) ) );
	}
	
	/**
	 * Sessions
	 */
	
	socket.on('current_session', function(d) {
		if(d.ata.type == "special") {
			$("#current_session_wrapper").html('<div class="large_text">'+d.ata.string+'</div>');
		}
		else if(d.ata.type == "session" ){
			var html_to_insert = '<div class="current_session_time"><div class="current_session_location">Now:</div> <div>'+d.ata.slot.time+'</div></div>';
			$(d.ata.slot.sessions).each(function(idx, session) {
				var title = session.title;
				if(title.length > 56) {
					title = title.slice(0,53) + "&hellip;";
				}
				var session_context = {location: session.location, title: title};
				html_to_insert += session_template(session_context);
			});
			$("#current_session_wrapper").html(html_to_insert);
		}
		else if(d.ata.type == "fixed" ) {
			$("#current_session_wrapper").html('<div class="large_text">'+d.ata.slot.time+' : '+d.ata.slot.name+'</div>');
		}
	});

	/**
	 * Tweets
	 */

	socket.on('tweet', function(tweet) {	
		// console.dir(tweet);
		tweet = strdecode(tweet);

		var tweet_context = {
			x: Math.floor(Math.random() * 10000),
			y: Math.floor(Math.random() * 10000),
			z: Math.floor(Math.random() * 10000),
			scale: Math.random(),
			id_str: tweet.id_str,
			profile_image: tweet.user.profile_image_url,
			user_name: tweet.user.name,
			user_screen_name: tweet.user.screen_name,
			tweet_text: convertURLs(tweet.text),
			tweet_time: moment(tweet.created_at).format("D MMM YYYY, h:mm a")
		};

		if( (tweet.entities.media !== undefined )&& ( tweet.entities.media.length > 0 ) )  {
			tweet_context.media = true;
			tweet_context.media_url = tweet.entities.media[0].media_url + ':small';
		}

        var random_colour = Math.floor(Math.random() * 10 / 4);

        switch(random_colour) {
            case 0:
                tweet_context.random_colour = "redbg";
                break;
            case 1:
                tweet_context.random_colour = "bluebg";
                break;
            case 2:
                tweet_context.random_colour = "greenbg";
                break;
        }
		
		var tweet_html_to_insert = tweet_template(tweet_context);

		$("#tweets_container").append(tweet_html_to_insert);
		$("#tweets_wrapper").jmpress('init', $("#tweet_"+tweet.id_str));
	});

	/**
	 * Updates
	 */
	socket.on('init_updates', function(d) {
			$("#updates_wrapper li").remove();
			$(d.ata.updates).each(function(idx, update_string) {
				$("#updates_wrapper ul").prepend('<li>'+update_string+'</li>');
			});
		});

	socket.on('new_update', function(d) {
		$("#updates_wrapper ul").prepend('<li>'+d.ata+'</li>').slideDown('1200');
	});

});
