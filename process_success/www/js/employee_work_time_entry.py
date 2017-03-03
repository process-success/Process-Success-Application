# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class employee_work_time_entry(Document):
	pass

@frappe.whitelist()
def save_attendance(employee_, date_, status_, start_, end_=None):
	attendance = frappe.new_doc("employee_work_time_entry")
	attendance.employee = employee_
	attendance.status = status_
#	attendance.date = date_
#	attendance.end = end_
#	attendance.start = start_
	attendance.submit()
	return "employee_work_time_entry_saved"
