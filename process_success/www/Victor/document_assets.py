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
		q = "select name, asset_name from tabAsset"
		for acc in frappe.db.sql(q, as_dict=1):
			result.append(acc)
		return {"rowContent": result}

@frappe.whitelist()
def enterOperation(code, trans, date):
	
	doc = frappe.new_doc("asset_documentation")
	doc.asset = code
	doc.date = date
	doc.trans_type = trans
	doc.submit()
	frappe.msgprint("Registration done.")
	return 0