# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate

no_cache = 1
no_sitemap = 1

def get_context(context):
	if (frappe.session.user == "Guest" or frappe.db.get_value("User", frappe.session.user, "user_type")=="Website User"):
		frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)
	else:
		result = []
		q = "select e.employee_name, v.address, work_order, description from tabTasks t join tabCrv_attendance c join tabEmployee e join tabvineyards v on (t.name = c.task and c.vineyard = v.name and c.employee = e.name)"
		q = q + " where c.status = 'Present'"
		for acc in frappe.db.sql(q, as_dict=1):
				result.append(acc)
				frappe.errprint(acc)
		return {"rowContent": result}

@frappe.whitelist()
def send(client, img, date):
	doc = frappe.new_doc("maps_for_client")
	doc.client = client
	doc.map = img
	doc.date = date
	doc.submit()
	frappe.msgprint("Capture saved.")
