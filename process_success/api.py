import frappe
from frappe import msgprint

def testFunction(workorder):
	workorder = frappe.get_doc("work_order" , workorder)

@frappe.whitelist()
def get_work_orders(start, end):
	"""frappe.db.sql("query")"""
	#frappe.publish_realtime('msgprint', 'message', user=user)
	#frappe.msgprint("test")
	print ("test")
	#if not frappe.has_premission("work_order","read"):
	#	raise frappe.PermissionError
	return frappe.db.sql("""select
			timestamp(date, start) as start,
			timestamp(date, end) as end,
			name,
			title,
			status
		from `tabwork_order`
		where `date` between %(start)s and %(end)s """,{
			"start": start,
			"end": end
		}, as_dict=True)
		
