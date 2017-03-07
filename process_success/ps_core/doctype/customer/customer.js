// Copyright (c) 2016, Process Success and contributors
// For license information, please see license.txt

frappe.ui.form.on('Customer', {
	onload: function(frm,cdt,cdn) {
		var customer = frappe.model.get_doc(cdt,cdn);
		//frappe.ready(function() {
			console.log("test"+"#form/User/" + customer.user)
			$(".base_user_link").attr("href", "#form/User/" + customer.user);
		//});
	}
});
