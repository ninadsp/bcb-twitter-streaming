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

					var slot_tr = $('<tr class="fixed_slot"></tr>');
					if(slot.time == undefined) {
						slot_tr.append('<td class="col_0">'+slot.startTime+'-'+slot.endTime+'</td>');
					}
					else {
						slot_tr.append('<td class="col_0">'+slot.time+'</td>');
					}
					if(slot.id == 7) {
						slot_tr.append('<td class="col" colspan="6"><img id="teklash_logo" src="/images/teklash.png" /></td>');
					}
					else {
						slot_tr.append('<td class="col" colspan="6">'+slot.name+'</td>');
					}
				}
				else if (slot.type == "session") {

					var slot_tr = $('<tr class="session_slot"></tr>');
					if(slot.time == undefined) {
						slot_tr.append('<td class="col_0">'+slot.startTime+'-'+slot.endTime+'</td>');
					}
					else {
						slot_tr.append('<td class="col_0">'+slot.time+'</td>');
					}
					$(slot.sessions).each(function(idx, session) {
						var title = session.title;
						if(title.length > 56)
							title = title.slice(0, 53) + '&hellip;'
						slot_tr.append('<td class="col">'+title+'</td>');
					});
				}
				table_html.append(slot_tr);
			});
		}
		else {
			var table_html = '<div class="large_message">'+data.status+'</div>';
		}
		
		$("#container").html(table_html);
	};
});
