frappe.views.calendar["work_order"] = {
	field_map: {
		"start": "start",
		"end": "end",
		"id": "name",
		"allDay": "all_day",
		"title": "title",
		"status": "status",
	},
	options:{

	},
	get_events_method: "process_success.api.get_work_orders"
}