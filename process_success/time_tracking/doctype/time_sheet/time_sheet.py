# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from process_success.ps_core.api import get_crews_employees
from frappe import throw, _

class TimeSheet(Document):
	def before_insert(self):
	 	print("timesheet before insert")
	 	print(self)



	def after_insert(self):
		if self.crew:
			crew_members = get_crews_employees(self.crew)
			for employee in crew_members:
				add_employee_to_sheet(employee, self)
		self.save()

	def validate(self):
		#crew_members = get_crews_employees()
		print("VALIDATE")
		print(self.employees)
		#for employee_container in self.employees:
			#if not employee_container.time_unit:
				#employee_container.time_unit=get_employee_time_unit_by_date(employee_container.employee, self.date, self.name)

def add_employee_to_sheet(employee, time_sheet):
	if isinstance(time_sheet, str):
		time_sheet=frappe.get_doc("Time Sheet", time_sheet)
	for employee_cont in time_sheet.employees:
		if employee==employee_cont.employee:
			return 0
	employee_container=frappe.get_doc({
			"doctype":"employee_link",
			"employee":employee
	})
	#time_sheet.append("employees",employee_container)
	time_unit=get_employee_time_unit_by_date(employee,time_sheet.date,time_sheet.name)
	employee_container.time_unit=time_unit.name
	time_sheet.append("employees",employee_container)
# edge cases,  on more than one crew, on more than one time sheet.
# when a user is removed form a time sheet the time-unit should be deleted
@frappe.whitelist(allow_guest=True)
def get_employee_time_unit_by_date(employee, date, time_sheet=0):
	if not time_sheet:
		time_unit =frappe.db.get("employee_work_time_entry",{"employee":employee, "date":date})
	else:
		time_unit =frappe.db.get("employee_work_time_entry",{"employee":employee, "date":date, "time_sheet":time_sheet})

	print("--------old time-unit --------")
	if not time_unit:
		time_unit = frappe.get_doc({
			"doctype":"employee_work_time_entry",
			"date": date,
			"employee": employee,
			"status" : "Started"
		})
		if time_sheet:
			time_unit.time_sheet=time_sheet
		time_unit.insert();
		print("--------new time-unit --------")
	return time_unit

