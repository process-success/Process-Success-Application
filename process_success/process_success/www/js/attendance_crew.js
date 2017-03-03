
window.disable_signup = {{ disable_signup and "true" or "false" }};

window.login = {};

login.bind_events = function() {
	//alert("page loaded");
	$("#btnCheckIn").on("click", function(event) {
			event.preventDefault();
			//alert("before call");
			met = "process_success.ps_core.doctype.employee_link.employee_link.save_crew_check_in";
			
			frappe.call({
					method: met,
					args:{
						"crew_name_":$("#crew_name").val(),						
						"date_":$("#date_").val(),
						"start_":$("#start_").val()					
					},					
					freeze: true,
					statusCode: login.login_handlers
				});
			//alert("after call");
			return false;
		});
	$("#btnCheckOut").on("click", function(event) {
			event.preventDefault();
			//alert("before call");
			met = "process_success.ps_core.doctype.employee_link.employee_link.save_crew_check_out";
			
			frappe.call({
					method: met,
					args:{
						"crew_name_":$("#crew_name").val(),						
						"date_":$("#date_").val(),
						"end_":$("#end_").val()					
					},					
					freeze: true,
					statusCode: login.check_out_handler
				});
			//alert("after call");
			return false;
		});
}

login.login_handlers = (function() {
	var get_error_handler = function(default_message) {
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

	var login_handlers = {
		200: function(data) {
			if(data.message=="check_in_saved") {
				frappe.msgprint("Check in created");
			} else if(data.message=="No App") {
				//alert("weird");
				frappe.msgprint(data.message);
			}
		},
		401: get_error_handler(__("Invalid Login")),
		403: get_error_handler(__("no priviledges")),
		404: get_error_handler(__("not found")),
		417: get_error_handler(__("Oops! Something went wrong"))
	};

	return login_handlers;
})();

frappe.ready(function() {
	login.bind_events();

	if (!window.location.hash) {
		window.location.hash = "#login";
	} else {
		$(window).trigger("hashchange");
	}

	$(".form-signup, .form-forgot").removeClass("hide");
	$(document).trigger('login_rendered');
});

login.check_out_handler = (function() {
	var get_error_handler = function(default_message) {
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

	var login_handlers = {
		200: function(data) {
			if(data.message=="check_out_saved") {
				frappe.msgprint("Check out created");
			} else if(data.message=="No App") {
				//alert("weird");
				frappe.msgprint(data.message);
			}
		},
		401: get_error_handler(__("Invalid Login")),
		403: get_error_handler(__("no priviledges")),
		404: get_error_handler(__("not found")),
		417: get_error_handler(__("Oops! Something went wrong"))
	};

	return login_handlers;
})();