frappe.views.calendar["work_order"] = {
	field_map: {
		"start": "starts_on",
		"end": "ends_on",
		"id": "name",
		"title": "title",
		"status": "event_type",
	},
	options:{
		header:{
			left: "prev,next today",
			center: "title",
			right: "month"
		}
	},
	get_events_method: "meeting.api.get_work_orders"
}