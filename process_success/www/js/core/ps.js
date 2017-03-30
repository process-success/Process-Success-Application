(function(){

	frappe.provide("ps");
	
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

	ps.escapeAttr=function ( str ) {
	    return str.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );

	};

	ps.preptime=function(time){
		var finaltime="";
		var timearray=time.split(":");
		var am=timearray[1].split("A");
		if(am.length==1){
			var pm=timearray[1].split("P");
			finaltime=(parseInt(timearray[0]) + 12).toString() +":"+ pm[0] + ":00";
		}else{
			finaltime=timearray[0]+":"+am[0]+":00"
		}
		return finaltime;
	};



	/* ------------------------------------------- 
	-------------  SOCKET.IO CODE ----------------
	--------------------------------------------- */
	ps.get_host= function() {
		var host = window.location.origin;
		if(window.dev_server) {
			var parts = host.split(":");
			var port = frappe.boot.socketio_port || '8000';
			if(parts.length > 2) {
				host =  parts[1];
			}
			host = host + ":" + port;
		}
		return host;
	};
	ps.hostReachable= function() {
		// Handle IE and more capable browsers
		var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
		var status;
		xhr.open( "HEAD", "//" + ps.get_host()+"/test.html", false );
		try {
		xhr.send();
		return ( xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304) );
		} catch (error) {
		return false;
		}
	};

	ps.online=ps.hostReachable();
	ps.socket = {
		open_tasks: {},
		open_docs: [],
		init: function() {
			if (ps.socket.socket) {
				return;
			}

			//Enable secure option when using HTTPS
			if (window.location.protocol == "https:") {
	   			ps.socket.socket = io.connect(ps.socket.get_host(), {secure: true});
			}
			else if (window.location.protocol == "http:") {
				ps.socket.socket = io.connect(ps.socket.get_host());
			}
			if (!ps.socket.socket) {
				console.log("Unable to connect to " + ps.socket.get_host());
				return;
			}

			ps.socket.socket.on('msgprint', function(message) {
				frappe.msgprint(message);
			});
			ps.socket.socket.on('reconnect', function(message) {
				frappe.msgprint("reconnected");
				ps.online=true;

			});
			ps.socket.socket.on('connect', function(message) {
				ps.online=true;
			});
			ps.socket.socket.on('disconnect', function(message) {
				frappe.msgprint("disconnect");
				ps.online=false;
			});
			//ps.socket.socket.emit('msgprint','load');
		},
		get_host: function() {
			var host = window.location.origin;
			if(window.dev_server) {
				var parts = host.split(":");
				var port = frappe.boot.socketio_port || '9000';
				if(parts.length > 2) {
					host = parts[0] + ":" + parts[1];
				}
				host = host + ":" + port;
			}
			return host;
		},
		subscribe: function(task_id, opts) {

		},
		process_response: function(data, method) {
			return;
		}
	};

})();



frappe.ready(function() {
	ps.init_ui();
	ps.socket.init();
});

