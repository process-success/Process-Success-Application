// login.js
// don't remove this line (used in test)

window.disable_signup = {{ disable_signup and "true" or "false" }};

window.login = {};


(function(){

temp={};
temp.cmd = "login";
temp.usr;
temp.pwd;

login.bind_events = function() {
	$(window).on("hashchange", function() {
		login.route();
	});

	$(".form-login").on("submit", function(event) {
		event.preventDefault();
		var args = {};
		args.cmd = "login";
		args.usr = ($("#login_email").val() || "").trim();
		args.pwd = $("#login_password").val();
		args.device = "desktop";
		if(!args.usr || !args.pwd) {
			frappe.msgprint(__("Both login and password required"));
			return false;
		}
		login.call(args);
		return false;
	});
	//-----EMPLOYEE -------------
	$(".employee_signup").on("submit", function(event) {
		console.log("employee signup");
		event.preventDefault();
		var args = {};
		args.cmd = "process_success.ps_core.api.sign_up";
		args.email = ($("#signup_email_employee").val() || "").trim();
		args.redirect_to = get_url_arg("redirect-to") || '';
		args.first_name=($("#signup_firstname_employee").val() || "").trim();
		args.last_name=($("#signup_lastname_employee").val() || "").trim();
		args.password=($("#signup_password_employee").val() || "").trim();
		temp.usr=args.email;
		temp.pwd=args.password;
		args.user_type="employee";
		if(!args.email || !valid_email(args.email) || !args.first_name || !args.last_name) {
			frappe.msgprint(__("Valid email and name required"));
			return false;
		}
		login.call(args);
		return false;
	});
	//-----CUSTOMER -------------
	$(".customer_signup").on("submit", function(event) {
		console.log("Customer signup");
		event.preventDefault();
		var args = {};
		args.cmd = "process_success.ps_core.api.sign_up";
		args.email = ($("#signup_email_customer").val() || "").trim();
		args.redirect_to = get_url_arg("redirect-to") || '';
		args.first_name=($("#signup_firstname_customer").val() || "").trim();
		args.last_name=($("#signup_lastname_customer").val() || "").trim();
		args.password=($("#signup_password_customer").val() || "").trim();
;		args.user_type="customer";
		temp.usr=args.email;
		temp.pwd=args.password;
		if(!args.email || !valid_email(args.email) || !args.first_name || !args.last_name) {
			frappe.msgprint(__("Valid email and name required"));
			return false;
		}
		login.call(args);
		return false;
	});

	$(".form-forgot").on("submit", function(event) {
		event.preventDefault();
		var args = {};
		args.cmd = "frappe.core.doctype.user.user.reset_password";
		args.user = ($("#forgot_email").val() || "").trim();
		if(!args.user) {
			frappe.msgprint(__("Valid Login id required."));
			return false;
		}
		login.call(args);
		return false;
	});

	$(".btn-ldpa-login").on("click", function(){
		var args = {};
		args.cmd = "{{ ldap_settings.method }}";
		args.usr = ($("#login_email").val() || "").trim();
		args.pwd = $("#login_password").val();
		args.device = "desktop";
		if(!args.usr || !args.pwd) {
			frappe.msgprint(__("Both login and password required"));
			return false;
		}
		login.call(args);
		return false;
	});

}

login.login= function(){

}

login.route = function() {
	var route = window.location.hash.slice(1);
	if(!route) route = "login";
	login[route]();
}

login.login = function() {
	$(".login-content").toggle(false);
	$(".ps_login_form").toggle(true);
}

login.forgot = function() {
	$(".login-content").toggle(false);
	$(".ps_forgot_password_form").toggle(true);
}

login.signup = function() {
	$(".login-content").toggle(false);
	$(".ps_select_user_form").toggle(true);
}
login.employee = function() {
	$(".login-content").toggle(false);
	$(".ps_employee_form").toggle(true);
}
login.customer = function() {
	$(".login-content").toggle(false);
	$(".ps_customer_form").toggle(true);
}


// Login
login.call = function(args) {
	return frappe.call({
		type: "POST",
		args: args,
		freeze: true,
		statusCode: login.login_handlers
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
			if(data.message=="Logged In") {
				window.location.href = get_url_arg("redirect-to") || data.home_page;
				console.log("first");
			} else if(data.message=="No App") {
				if(localStorage) {
					var last_visited =
						localStorage.getItem("last_visited")
						|| get_url_arg("redirect-to");
					localStorage.removeItem("last_visited");
				}

				if(data.redirect_to) {
					window.location.href = data.redirect_to;
					console.log("data. "+data.redirect_to);
				}

				if(last_visited && last_visited != "/login") {
					window.location.href = last_visited;
					console.log("LAST VISITED "+last_visited);
				} else {
					window.location.href = data.home_page;
					console.log("homepage "+data.home_page);
				}
			} else if(["#customer","#employee", "#forgot"].indexOf(window.location.hash)!==-1) {
				if(data.message=="signedup"){
					console.log("SIGNUP SUCCESS");
					login.call(temp);
				}else{
					console.log("SOME ERROR");
					frappe.msgprint(data.message);
				}
			}
		},
		401: get_error_handler(__("Invalid Login")),
		403: get_error_handler(__("You are an unapproved user.")),
		417: get_error_handler(__("Oops! Something went wrong"))
	};

	return login_handlers;
})();
})();

frappe.ready(function() {
	login.bind_events();

	if (!window.location.hash) {
		window.location.hash = "#login";
	} else {
		$(window).trigger("hashchange");
	}

	$(".login-content").removeClass("hide");
	$(document).trigger('login_rendered');
});
