
//PS core file first to load
//tools and what not

(function(){

	frappe.provide("ps");
	frappe.provide("ps.frappe");
	
	var get_all_employees="process_success.ps_core.api.get_all_employees";

	ps.init_ui=function(){
		var inputs=$('.timepicker').timepicker({
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
		inputs.trigger("change");
	};
	//----------------------------------------
	//   simplify Calls
	//   ps.set_handlers
	//   ps.call
	//----------------------------------------

	ps.set_handlers = function(success,fail) {
		var get_error_handler = function(default_message,success,fail) {
			return function(xhr, data) {
				if(xhr.responseJSON) {
					data = xhr.responseJSON;
				}

				var message = default_message;
				
				if (data._server_messages) {
					message = ($.map(JSON.parse(data._server_messages || '[]'), function(v) {
						// temp fix for messages sent as dict
						console.log(v);
						try {
							return JSON.parse(v).message;
						} catch (e) {
							return v;
						}
					}) || []).join('<br>') || default_message;
				}

				//frappe.msgprint(message);
				console.log(message);
			};
		};

		var call_handelers = {
			200: function(data) {
				success(data);
			},
			401: get_error_handler(__("error")),
			417: get_error_handler(__("error"))
		};
		return call_handelers;
	};

	ps.call = function(args,success) {
		return frappe.call({
			type: "POST",
			args: args,
			freeze: true,
			statusCode: ps.set_handlers(success)
		});
	};


	// Turns things like s@gmail.com into escaped version to be used with j query selectors
	ps.escapeAttr=function ( str ) {
	    return str.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );

	};
	
	// probably outdated depreciated.   might move away form the original plugin
	//in favor of the standard type="time" feilds html5

	ps.preptime=function(time){
		var finaltime="";
		var timearray=time.split(":");
		var am=timearray[1].split("A");
		if(am.length==1){
			var pm=timearray[1].split("P");
			finaltime=(parseInt(timearray[0]) + 12).toString() +":"+ pm[0] + ":00";
		}else{
			finaltime=timearray[0]+":"+am[0]+":00";
		}
		return finaltime;
	};

	ps.frappe.isready=0;

})();

//Init bit

frappe.ready(function() {
	ps.init_ui();
	ps.frappe.isready=1;
});

