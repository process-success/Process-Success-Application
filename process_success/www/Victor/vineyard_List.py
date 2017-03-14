# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate

no_cache = 1
no_sitemap = 1

ROWS_PER_PAGE = 5
def get_context(context):
	if (frappe.session.user == "Guest" or
        frappe.db.get_value("User", frappe.session.user, "user_type")=="Website User"):
        	frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)
			
	vineyards = []
	joined = []
	for acc in frappe.db.sql("select * from `tabvineyards` where true", as_dict=1):
			vineyards.append(acc)
			frappe.errprint(acc)	
	
	#for acc in frappe.db.sql("select * from `tabWork Order` where true", as_dict=1):
	#		joined .append(acc)
	#		frappe.errprint(acc)
	
	#for acc in frappe.db.sql("select * from `tabCrv_attendance` at JOIN (`tabvineyards` v, `tabWork Order` wo) on at.vineyard=v.name AND at.work_order=wo.name", as_dict=1):
	#		joined .append(acc)
	#		frappe.errprint(acc)	
	
	for acc in frappe.db.sql("select wo.name, wo.subject, wo.project, wo.status, wo.priority, wo.exp_start_date, wo.expected_time, wo.task_weight, wo.exp_end_date, wo.progress, wo.description, wo.depends_on_tasks, wo.act_start_date, wo.actual_time, wo.act_end_date, wo.total_costing_amount, wo.total_expense_claim, wo.total_billing_amount, wo.review_date, wo.closing_date, wo.company, v.vineyard_name, v.address, at.vineyard  from `tabCrv_attendance` at JOIN (`tabvineyards` v, `tabWork Order` wo) on at.vineyard=v.name AND at.work_order=wo.name", as_dict=1):
			joined .append(acc)
			frappe.errprint(acc)	
		
			
	return {
		"Svineyards" : vineyards,
		"Sjoined" : joined,
		"pages" : ROWS_PER_PAGE
	}