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

	//var socket = new io.connect(window.location.href);
	var socket = new io.connect('/schedule');
	socket.on('connect', function(){
	});

	socket.on('from', function(data) {
	});

	socket.on('schupdate', function(data) {
	});

	socket.on('message', function(data) {
		generateSchedule(data);
	});

	socket.on('disconnect', function(){
	});

	if(window.location.href.search('large$') != -1) {
		$("#container").removeClass('small').addClass('large');
	}



	function generateSchedule(data){
		if(data.status == "have stuff") {
			var tracks = data.tracks;

			var slots = data.slots;

            var num_tracks = tracks.length;

			$("#schedule_table").remove();
			$("#message").empty().hide();
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
					if("Techlash" == slot.name) {
						slot_context.techlash = true;
					}
					else {
						slot_context.techlash = false;
					}
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
                    current_session_counter = 0;
					$(slot.sessions).each(function(idx, session) {

                        while(current_session_counter < session.track) {
                            slot_context.sessions.push({ title: "", id: 0 });
                            current_session_counter += 1;
                        }

						var title = session.title;
						if(title.length > 50)
							title = title.slice(0, 47) + '&hellip;'
						slot_context.sessions.push({title: title, id: session.id});
                        current_session_counter += 1;
					});
                    while(current_session_counter < num_tracks) {
                        slot_context.sessions.push({ title: "", id: 0 });
                        current_session_counter += 1;
                    }
					var slot_tr = normal_slot_template(slot_context);
				}
				table_html.find('tbody').append(slot_tr);

				$("#container").append(table_html);
			});
		}

		if( (data.status !== undefined) && (data.status != 'have stuff') ) {
			$("#message").html(data.status).show();
		}
		
		
	};
});
