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
def enterOperation(title, message):
	doc = frappe.new_doc("email_templates")
	doc.title = title
	doc.body = message
	doc.submit()
	frappe.msgprint("Template created.")
	return 0