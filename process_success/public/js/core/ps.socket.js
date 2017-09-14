/* -------------------------------------------
-------------  SOCKET.IO CODE ----------------
--------------------------------------------- */
ps.get_host= function() {
	var host = window.location.origin;
	var parts = host.split(":");
	var port = frappe.boot.socketio_port || '8000';
	if(parts.length >= 2) {
		host =  parts[1];
	}
	if(window.dev_server) {
		host = host + ":" + port;
	}
	return host;
};

// ps.checkOnline= function(callback) {
// 	$.ajax({
// 		url: '/test.html',
// 		success: function(result){
// 			console.log("ONLINE CHECK");
// 			ps.online=true;
// 			callback();
// 		},
// 		error: function(result){
// 			ps.online=false;
// 		}
// 	});
// };
// ps.checkOnline(function(){});
// var x=performance.now();
// for (var i =0; i<=99; i++){
// 	ps.checkOnline(function(){});
// }
// ps.checkOnline(function(){console.log((x-performance.now())/101);});

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

// var x=performance.now();
// for (var i =0; i<=100; i++){
// 	console.log(ps.hostReachable());
// }
// console.log((x-performance.now())/101);




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
			//frappe.msgprint("reconnected");
			ps.onlineAlert();
			ps.online=true;
			$(document).trigger("connected");
		});
		ps.socket.socket.on('connect', function(message) {
			ps.onlineAlert();
			ps.online=true;
			$(document).trigger("connected");
		});
		ps.socket.socket.on('disconnect', function(message) {
			//frappe.msgprint("disconnect");
			ps.offlineAlert();
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
ps.socket.init();
frappe.ready(function() {

});
