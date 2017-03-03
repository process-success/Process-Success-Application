# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json
from frappe.model.document import Document

class employee_work_time_entry(Document):
	pass
	
"""
Started
Finished
Approved
Payed
"""

def delete_attendance(employee_, date_, status_):
	start_ = ""
	attendances = frappe.db.get_values("employee_work_time_entry",{"employee":employee_,"date":date_,"status":status_},"*")
	for attendance_record in attendances:
		name = attendance_record["name"]
		start_ = attendance_record["start"]
		try:
			attendance = frappe.get_doc({
				"doctype": "employee_work_time_entry",
				"name": name
				})
			attendance.delete()
		except frappe.DuplicateEntryError:
			name = "frappe.DuplicateEntryError"
		except:
			name = "except in save: "

	frappe.db.commit()
	
	return start_
	
def insert_attendance(employee_, status_, date_, end_, start_):
	attendance = frappe.new_doc("employee_work_time_entry")
	attendance.employee = employee_
	attendance.status = status_
	attendance.date = date_
	attendance.end = end_
	attendance.start = start_
	attendance.insert()
	frappe.db.commit()
	
@frappe.whitelist(allow_guest=True)
def save_check_in(employee_, date_, start_):
	statusSearch_ = "Started"
	x = delete_attendance(employee_, date_, statusSearch_)
	status_ = "Started"
	end_ = ""
	insert_attendance(employee_, status_, date_, end_, start_)

	return "check_in_saved"

@frappe.whitelist(allow_guest=True)
def save_check_out(employee_, date_, end_):
	status_ = "Finished"
	statusSearch_ = "Started"
	start_ = delete_attendance(employee_, date_, statusSearch_)
	insert_attendance(employee_, status_, date_, end_, start_)
	statusSearch_ = "Finished"
	start_ = delete_attendance(employee_, date_, statusSearch_)
	insert_attendance(employee_, status_, date_, end_, start_)
	
	return "check_out_saved"

@frappe.whitelist(allow_guest=True)
def save_attendance2():
	return save_attendance3("hello")

@frappe.whitelist(allow_guest=True)
def save_attendance3(par):
	return "save_attendance3 " + par