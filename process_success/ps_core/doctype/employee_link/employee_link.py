# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from process_success.time_tracking.doctype.employee_work_time_entry.employee_work_time_entry import save_check_in, save_check_out

class employee_link(Document):
	pass

@frappe.whitelist(allow_guest=True)
def save_crew_check_in(crew_name_, date_, start_):
	employees = frappe.db.sql("SELECT employee FROM tabemployee_link WHERE parent = %s", crew_name_)
	for employee in employees:
		employee_ = employee[0]
		save_check_in(employee_, date_, start_)
	return "check_in_saved"
	
@frappe.whitelist(allow_guest=True)
def save_crew_check_out(crew_name_, date_, end_):
	employees = frappe.db.sql("SELECT employee FROM tabemployee_link WHERE parent = %s", crew_name_)
	for employee in employees:
		employee_ = employee[0]
		save_check_out(employee_, date_, end_)
	return "check_out_saved"
	
@frappe.whitelist(allow_guest=True)
def save_attendance2():
	return "save_attendance2"