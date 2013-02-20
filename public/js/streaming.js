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
			}, 5000);

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

	var socket = new io.connect(window.location.href + 'updates');
	
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
			var html_to_insert = '<div class="current_session_time"><b>Now:</b><br /> '+d.ata.slot.time+'</div>';
			$(d.ata.slot.sessions).each(function(idx, session) {
				html_to_insert += '<div class="current_session">';
				html_to_insert += '<div class="current_session_location">'+session.location+'</div>';
				var title = session.title;
				if(title.length > 56) {
					title = title.slice(0,53) + "&hellip;";
				}
				html_to_insert += '<div class="current_session_title">'+session.title+'</div>';
				html_to_insert += '</div>';
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

		var date = new Date(tweet.created_at);

		var newStep = $('<div class="step tweet">');
		newStep.attr('id', "tweet_"+tweet.id_str);

		var x = Math.floor(Math.random() * 10000), 
		y = Math.floor(Math.random() * 10000),
		z = Math.floor(Math.random() * 10000),
		rot = Math.floor(Math.random() * 360),
		scale = Math.random();
		newStep.attr('data-x', x).attr('data-y', y).attr('data-z', z).attr('data-rotate', rot); //.attr('data-scale', scale);

		var html_to_insert = '';
		html_to_insert = '<div class="tweet_avatar_container"><img class="tweet_avatar" src="'+tweet.user.profile_image_url+'" /></div>';
		html_to_insert += '<div class="tweet_content_container"><div class="tweet_user"><span class="tweet_user_name">'+tweet.user.name+'</span>';
		html_to_insert += '<span class="tweet_user_handle">'+tweet.user.screen_name+'</span></div>';
		html_to_insert += '<div class="tweet_content">'+convertURLs(tweet.text)+'</div>';
		html_to_insert += '<div class="tweet_time">' + date.format("{FullYear}/{Month:2}/{Date:2} {Hours:2}:{Minutes:2}:{Seconds:2}") +'</div>';
		html_to_insert += '</div>';

		newStep.html(html_to_insert);
		$("#tweets_container").append(newStep);
		$("#tweets_wrapper").jmpress('init', newStep);
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
