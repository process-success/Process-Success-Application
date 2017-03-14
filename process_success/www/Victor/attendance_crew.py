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
		if (user_role == "Crew Leader" or user_role == "Administrator" ):
			role_error = 0
			break
	if (role_error):
		frappe.throw(_("You are not a Crew Leader."), frappe.PermissionError)

	user = frappe.session.user

	leaders = frappe.db.get_values("Employee", {"user":user}, "*")
	leader = leaders[0]
	leader_name = leader['name']
	
	crews = frappe.db.get_values("Crew", {"crew_lead":leader_name}, "*")
	crew = crews[0]
	crew_name = crew['name']
	
	employees = frappe.db.sql("SELECT el.employee, ew.date, ew.start, ew.end, ew.status FROM tabemployee_link el LEFT JOIN tabemployee_work_time_entry ew ON el.employee = ew.employee WHERE (ew.date = CURDATE() && el.parent = %s)", crew_name)
	att_date = getdate(nowdate())
	start_ = get_time(now())
	end_ = get_time(now())
	
	return {"crew_name": crew_name,
		"employees" : employees,
		"leader_name" : leader_name,
		"date_" : att_date,
		"start_" : start_,
		"end_" : end_,
		"usr_pd": user,
		"title": "Crew Attendance"}
