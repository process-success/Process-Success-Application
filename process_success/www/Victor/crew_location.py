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
		q = "select e.employee_name, v.`vineyard name`, v.address, att_date, work_order, description, customer from tabTasks t join tabCrv_attendance c join tabEmployee e join tabvineyards v on (t.name = c.task and c.vineyard = v.name and c.employee = e.name)"
		q = q + " where c.status = 'Present'"
		for acc in frappe.db.sql(q, as_dict=1):
				result.append(acc)
				frappe.errprint(acc)
		

		return {"rowContent" : result,
				"pages" : ROWS_PER_PAGE}
