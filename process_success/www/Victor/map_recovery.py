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
		q = "select name, customer_name from tabCustomer"
		for acc in frappe.db.sql(q, as_dict=1):
			result.append(acc)
		return {"rowContent": result}

@frappe.whitelist()
def send(client, date):
	doc = frappe.new_doc("maps_for_client")
	result = []
	q = "select center, markers, notes, shapes from tabmaps_for_client where customer = '" + client +"' and date='" + date + "'"
	for acc in frappe.db.sql(q, as_dict=1):
			result.append(acc)
	return {"rowContent": result}
