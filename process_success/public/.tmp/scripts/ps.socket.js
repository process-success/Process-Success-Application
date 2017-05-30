/* ------------------------------------------- 
-------------  SOCKET.IO CODE ----------------
--------------------------------------------- */
ps.get_host = function () {
	var host = window.location.origin;
	if (window.dev_server) {
		var parts = host.split(":");
		var port = frappe.boot.socketio_port || '8000';
		if (parts.length > 2) {
			host = parts[1];
		}
		host = host + ":" + port;
	}
	return host;
};
ps.hostReachable = function () {
	// Handle IE and more capable browsers
	var xhr = new (window.ActiveXObject || XMLHttpRequest)("Microsoft.XMLHTTP");
	var status;
	xhr.open("HEAD", "//" + ps.get_host() + "/test.html", false);
	try {
		xhr.send();
		return xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304);
	} catch (error) {
		return false;
	}
};

ps.online = ps.hostReachable();
ps.socket = {
	open_tasks: {},
	open_docs: [],
	init: function () {
		if (ps.socket.socket) {
			return;
		}

		//Enable secure option when using HTTPS
		if (window.location.protocol == "https:") {
			ps.socket.socket = io.connect(ps.socket.get_host(), { secure: true });
		} else if (window.location.protocol == "http:") {
			ps.socket.socket = io.connect(ps.socket.get_host());
		}
		if (!ps.socket.socket) {
			console.log("Unable to connect to " + ps.socket.get_host());
			return;
		}

		ps.socket.socket.on('msgprint', function (message) {
			frappe.msgprint(message);
		});
		ps.socket.socket.on('reconnect', function (message) {
			frappe.msgprint("reconnected");
			ps.online = true;
		});
		ps.socket.socket.on('connect', function (message) {
			ps.online = true;
		});
		ps.socket.socket.on('disconnect', function (message) {
			frappe.msgprint("disconnect");
			ps.online = false;
		});
		//ps.socket.socket.emit('msgprint','load');
	},
	get_host: function () {
		var host = window.location.origin;
		if (window.dev_server) {
			var parts = host.split(":");
			var port = frappe.boot.socketio_port || '9000';
			if (parts.length > 2) {
				host = parts[0] + ":" + parts[1];
			}
			host = host + ":" + port;
		}
		return host;
	},
	subscribe: function (task_id, opts) {},
	process_response: function (data, method) {
		return;
	}
};

frappe.ready(function () {
	ps.socket.init();
});
//# sourceMappingURL=ps.socket.js.map
