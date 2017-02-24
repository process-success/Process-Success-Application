import frappe

def testFunction(workorder):
	workorder = frappe.get_doc("work_order" , workorder)

@frappe.whitelist()
def get_work_orders(start, end):
	"""frappe.db.sql("query")"""
	if not frappe.has_premission("work_order","read"):
		raise frappe.PermissionError
	return frappe.db.sql("""select
		datetime(date, from-time) as start,
		datetime(date, to_time) as end,
		name,
		title,
		status
		from `tabwork_order`
		where `date` between %(start)s and %(end)s """,{
			"start": start,
			"end": end
		})
