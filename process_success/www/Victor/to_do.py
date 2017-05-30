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
		q = "select email, full_name from tabUser"
		for acc in frappe.db.sql(q, as_dict=1):
			result.append(acc)
		return {"rowContent": result}

@frappe.whitelist()
def toDo(desc, person, prio, date):
	frappe.errprint("llama")
	doc = frappe.new_doc("ToDo")
	doc.description = desc
	doc.owner = person
	doc.priority = prio
	doc.date = date
	doc.assigned_by = frappe.session.user
	doc.submit()
	frappe.msgprint("Entry added.")