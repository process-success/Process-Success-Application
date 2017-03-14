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
		
		return {"rowContent": result}

@frappe.whitelist()
def enterOperation(code, amount, description, cons_name, unit):
	amount = float(amount)
	doc = frappe.new_doc("consumables")
	doc.code = code
	doc.amount = amount
	doc.description = description
	doc.unit = unit
	doc.cons_name = cons_name
	doc.submit()
	frappe.msgprint("Registration done.")
	return 0