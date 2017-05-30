from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate, get_time, now
from process_success.time_tracking.doctype.employee_work_time_entry.employee_work_time_entry import save_check_in
 
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
	employee_ = employee_name
	date_ = "2017-03-02"
	start_ = "15:01:57.195568"
	name = save_check_in(employee_, date_, start_)
	
	return { "employee" : employees,
		"employee_name" : name,
		"att_date" : date_,
		"start_" : start_,
		"usr_pd": user}
