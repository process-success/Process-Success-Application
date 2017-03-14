# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate, get_time, now

no_cache = 1
no_sitemap = 1

def get_context(context):
	role_error = 1
	user_roles = frappe.get_roles()
	for user_role in user_roles:
		if (user_role == "Employee"):
			role_error = 0
			break
	if (role_error):
		frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)

	user = frappe.session.user

	employees = frappe.db.get_values("Employee", {"user":user}, "*")
	employee = employees[0]
#		frappe.throw(_("You are not an employee."), frappe.PermissionError)

	employee_name = employee['full_name']
	att_date = getdate(nowdate())
	end_ = get_time(now())
	
	return { "employee" : employees,
		"employee_name" : employee_name,
		"att_date" : att_date,
		"end_" : end_,
		"usr_pd": user}
