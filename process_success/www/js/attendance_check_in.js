
window.disable_signup = {{ disable_signup and "true" or "false" }};

window.login = {};

login.bind_events = function() {
	//alert("page loaded");
	$(".form-test").on("submit", function(event) {
			event.preventDefault();
			//alert("before call");
			/*if(!args.usr || !args.pwd) {
				frappe.msgprint(__("Both login and password required"));
				return false;
			}*/
			frappe.call({
					type: "POST",
					args:{
						"employee_":$("#employee").val(),						
						"date_":$("#att_date").val(),
						"status":$("#status").val(),
						"start_":$("#start_").val(),
						"end_":"",
						"cmd":"process_success.time_tracking.doctype.employee_work_time_entry.employee_work_time_entry.save_attendance",
					
					},					
					freeze: true,
					statusCode: login.login_handlers	
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
			if(data.message=="employee_work_time_entry_saved") {
				frappe.msgprint("Attendance created");
			} else if(data.message=="No App") {
				//alert("weird");
				frappe.msgprint(data.message);
			}
		},
		401: get_error_handler(__("Invalid Login")),
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