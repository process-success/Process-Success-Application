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

frappe.ui.form.on('vineyard_container', {
	vineyards_remove(frm) {
		console.log(frm)
	},
	vineyards_add(doc, cdt, cdn) {
		console.log(doc);
		console.log(cdt);
		console.log(cdn);
	}
})
