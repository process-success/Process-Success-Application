(function(){
	frappe.provide("ps");
	var get_all_employees="process_success.ps_core.api.get_all_employees";
	ps.init_ui=function(){
		$('.timepicker').timepicker({
		    timeFormat: 'h:mmp',
		    // interval: 60,
		    // minTime: '10',
		    // maxTime: '6:00pm',
		    defaultTime: 'pm',
		    // startTime: '10:00',
		    dynamic: false,
		    dropdown: false,
		    scrollbar: false
		});
	}
	ps.set_handlers = function(success) {
		var get_error_handler = function(default_message,success) {
			return function(xhr, data) {
				if(xhr.responseJSON) {
					data = xhr.responseJSON;
				}

				var message = default_message;
				if (data._server_messages) {
					message = ($.map(JSON.parse(data._server_messages || '[]'), function() {
						// temp fix for messages sent as dict
						try {
							return JSON.parse(v).message;
						} catch (e) {
							return v;
						}
					}) || []).join('<br>') || default_message;
				}

				frappe.msgprint(message);
			};
		}

		var call_handelers = {
			200: function(data) {
				success(data);
			},
			401: get_error_handler(__("error")),
			417: get_error_handler(__("error"))
		};
		return call_handelers;
	}

	ps.call = function(args,success) {
		return frappe.call({
			type: "POST",
			args: args,
			freeze: true,
			statusCode: ps.set_handlers(success)
		});
	}

	frappe.ready(function() {
		ps.init_ui();

	});
	ps.escapeAttr=function ( str ) {
	    return str.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );
	}




})();