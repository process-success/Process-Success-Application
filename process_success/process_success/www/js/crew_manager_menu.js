
window.disable_signup = {{ disable_signup and "true" or "false" }};

window.login = {};

login.bind_events = function() {
	//alert("page loaded");
	$( "#work_orders" ).click(function() {
  			var path = "/WorkOrderLinks.html";
			window.location.href = path;
		});
	$( "#crew_attendance" ).click(function() {
  			var path = "/TimeTrackingLinks.html";
			window.location.href = path;
		});
	$( "#tool_shed" ).click(function() {
  			var path = "/Tool_shed_Links.html";
			window.location.href = path;
		});
	$( "#client_database" ).click(function() {
		var path = "/client_database.html";
		window.location.href = path;
	});
	$( "#client_portal" ).click(function() {
		var path = "/Client_Portal_Links.html";
		window.location.href = path;
	});
	$( "#vineyard_operations" ).click(function() {
		var path = "/vineyard_List.html";
		window.location.href = path;
	});
	$( "#mapping" ).click(function() {
		var path = "/mapping_links.html";
		window.location.href = path;
	});
	
}

frappe.ready(function() {
	login.bind_events();
});