# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate, get_time

no_cache = 1
no_sitemap = 1

def get_context(context):
	if (frappe.session.user == "Guest" or
        frappe.db.get_value("User", frappe.session.user, "user_type")=="Website User"):
        	frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)

	usr_pd = frappe.session.user
	user = "derekbrenner@gmail.com"
	employee = frappe.db.get_values("Employee", {"user":user}, "*")[0]
	employee_name = employee['full_name']
	att_date = getdate(nowdate())
	start_ = get_time(nowdate())
	
	return { "employee" : employee,
		"employee_name" : employee_name,
		"att_date" : att_date,
		"start_" : start_,
		"usr_pd": usr_pd}

		
