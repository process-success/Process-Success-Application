frappe.pages['prosadatatestpage'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Prosadata Test Page',
		single_column: true
	});
}