# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json
from frappe.model.document import Document
from frappe.utils import getdate, nowdate, get_time, now
from frappe import throw, msgprint, _

class employee_work_time_entry(Document):
	def before_insert(self):
		duplicate=frappe.db.get("employee_work_time_entry", {"date":self.date, "employee":self.employee})
		if duplicate:
			frappe.throw(_("There is a duplicate time entry for {0} on {1}").format(self.employee, self.date))



"""
Started
Finished
Approved
Payed
"""


##Vicktor Code###
# def delete_attendance(employee_, date_, status_):
# 	start_ = ""
# 	attendances = frappe.db.get_values("employee_work_time_entry",{"employee":employee_,"date":date_,"status":status_},"*")
# 	for attendance_record in attendances:
# 		name = attendance_record["name"]
# 		start_ = attendance_record["start"]
# 		try:
# 			attendance = frappe.get_doc({
# 				"doctype": "employee_work_time_entry",
# 				"name": name
# 				})
# 			attendance.delete()
# 		except frappe.DuplicateEntryError:
# 			name = "frappe.DuplicateEntryError"
# 		except:
# 			name = "except in save: "

# 	frappe.db.commit()
	
# 	return start_
	
# def insert_attendance(employee_, status_, date_, end_, start_):
# 	attendance = frappe.new_doc("employee_work_time_entry")
# 	attendance.employee = employee_
# 	attendance.status = status_
# 	attendance.date = date_
# 	attendance.end = end_
# 	attendance.start = start_
# 	attendance.insert()
# 	frappe.db.commit()
	
# def get_attendance(employee_, status_, date_):
# 	attendance = ""
# 	attendances = frappe.db.get_values("employee_work_time_entry",{"employee":employee_,"date":date_,"status":status_},"*")
# 	if attendances:
# 		attendance = attendances[0]
# 	return attendance
	
# def update_attendance(name_, status_, end_, start_):
# 	frappe.db.sql("UPDATE `tabemployee_work_time_entry` SET status = %s, start = %s, end = %s WHERE name = %s", (status_, start_, end_, name_))
# 	#try:
# 		#attendance = frappe.get_doc({
# 		#	"doctype": "employee_work_time_entry",
# 		#	"name": name_
# 		#	})
# 		#attendance.name = name_
# 		#attendance.employee = employee_
# 		#attendance.status = status_
# 		#attendance.date = date_
# 		#attendance.start = start_
# 		#attendance.end = end_
# 		#attendance.save()
# 	#except frappe.DuplicateEntryError:
# 	#	name = "frappe.DuplicateEntryError"
# 	#except:
# 	#	name = "except in save: "
	
# 	#frappe.db.commit()
	
# def test_check_out():
# 	employee_ = "Employee1 Prosadata"
# 	date_ = getdate(nowdate())
# 	end_ = get_time(now())
# 	return save_check_out(employee_, date_, end_)
	
# @frappe.whitelist(allow_guest=True)
# def save_check_in(employee_, date_, start_):
# 	statusSearch_ = "Started"
# 	x = get_attendance(employee_, statusSearch_,  date_)
# 	status_ = "Started"
# 	end_ = ""
# 	if not x:
# 		insert_attendance(employee_, status_, date_, end_, start_)
# 	else:
# 		update_attendance(x['name'], status_, end_, start_)
		
# 	return "check_in_saved" 
	
# @frappe.whitelist(allow_guest=True)
# def save_check_out(employee_, date_, end_):
# 	status_ = "Finished"
# 	statusSearch_ = "Started"
# 	x = get_attendance(employee_, statusSearch_,  date_)
# 	update_attendance(x['name'], status_, end_, x['start'])
	
# 	return "employee_work_time_entry_saved"

# @frappe.whitelist(allow_guest=True)
# def save_attendance2():
# 	return "save_attendance2"
