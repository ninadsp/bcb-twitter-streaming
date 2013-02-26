$(document).ready(function() {
	var Debug = {

		log: function (msg) {
			console.log(new Date().toJSON() +": "+ msg);
		},

		toggle: function(speed) {
			speed = speed || 'fast';
			defaultDebug.slideToggle(speed);
		}
	};

	var fixed_slot_template = Handlebars.templates['schedule-fixed-slot'];
	var normal_slot_template = Handlebars.templates['schedule-normal-slot'];

	var socket = new io.connect(window.location.href);
	socket.on('connect', function(){
//		Debug.log('Connected');
	});

	socket.on('from', function(data) {
//		Debug.log(data);
	});

	socket.on('schupdate', function(data) {
//		Debug.log('schupdate');
	});

	socket.on('message', function(data) {
		generateSchedule(data);
	});

	socket.on('disconnect', function(){
//		Debug.log("Disconnected");
	});

	if(window.location.href.search('large$') != -1) {
		$("#container").removeClass('small').addClass('large');
	}



	function generateSchedule(data){
		if(data.status == "have stuff") {
			var tracks = data.tracks;

			var slots = data.slots;

			$("#schedule_table").remove();
			var table_html = $("<table id='schedule_table' cellpadding='0' cellspacing='0'></table>");
			table_html.prepend('<tr class="head"></tr>');
			var tr_head = $(table_html).find('tr.head');
			tr_head.prepend('<td class="col_0">&nbsp;</td>');
			$(tracks).each(function (idx, track) {
				tr_head.append('<td class="col">'+track+'</td>');
			});

			$(slots).each(function(idx, slot) {
				if(slot.type == "fixed") {

					var slot_context = {};
					if(slot.time == undefined) {
						slot_context.time_string = slot.startTime + '-' + slot.endTime;
					}
					else {
						slot_context.time_string = slot.time;
					}

					slot_context.name = slot.name;
					if(slot.id == 7) {
						slot_context.techlash = true;
					}
					else {
						slot_context.techlash = false;
					}
					console.log('appending row for '+slot_context.name);
					var slot_tr = fixed_slot_template(slot_context);
				}
				else if (slot.type == "session") {

					var slot_context = {};
					slot_context.sessions = new Array();
					if(slot.time == undefined) {
						slot_context.time_string = slot.startTime + '-' + slot.endTime;
					}
					else {
						slot_context.time_string = slot.time;
					}
					$(slot.sessions).each(function(idx, session) {
						var title = session.title;
						if(title.length > 56)
							title = title.slice(0, 53) + '&hellip;'
						slot_context.sessions.push({title: title, id: session.id});
					});
					var slot_tr = normal_slot_template(slot_context);
				}
				table_html.find('tbody').append(slot_tr);
			});
		}
		else {
			var table_html = '<div class="large_message">'+data.status+'</div>';
		}
		
		$("#container").html(table_html);
	};
});
