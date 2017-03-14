# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate

no_cache = 1
no_sitemap = 1

ROWS_PER_PAGE = 2

def get_context(context):
	if (frappe.session.user == "Guest" or frappe.db.get_value("User", frappe.session.user, "user_type")=="Website User"):
		frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)
	else:
		result = []
		q = "select w.name, v.`vineyard name`, location, c.customer_name, description from tabvineyards v join `tabWork Order` w join tabCustomer c on (w.client = c.name and v.name = w.vineyard) where w.status='Working'"

		#q = "select `tabWork Order`.company, description, customer_name, address, country from tabCustomer join `tabWork Order` join tabProject join tabCompany on (`tabWork Order`.company = tabCompany.company_name and `tabWork Order`.project = tabProject.project_name and tabCustomer.customer_name = tabProject.customer)"
		#q = q + " where `tabWork Order`.status = 'Working'"
		for acc in frappe.db.sql(q, as_dict=1):
				result.append(acc)
	

		return {"rowContent" : result,
				"pages" : ROWS_PER_PAGE}
