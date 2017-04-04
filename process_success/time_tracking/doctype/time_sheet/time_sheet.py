# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from process_success.ps_core.api import get_crews_employees
from frappe import throw, _
import json

class TimeSheet(Document):
	def before_insert(self):
		duplicate=frappe.db.get("Time Sheet", {"date":self.date, "crew":self.crew})
		if duplicate:
			frappe.throw(_("There is a duplicate time entry for {0} on {1}").format(self.crew, self.date))



	def after_insert(self):
		if self.crew:
			crew_members = get_crews_employees(self.crew)
			for employee in crew_members:
				add_employee_to_sheet(employee, self)
		self.save()

	def validate(self):
		print("VALIDATE")
		#duplicates in other timesheets
		self.check_duplicate_workers()
		#duplicates in this time sheet
		uniq=[]
		uniq_cont=[]
		for employee_cont in self.employees:
			#employee_cont.time_unit=get_employee_time_unit_by_date(employee_cont.employee, self.date).name
		 	if not employee_cont.employee in uniq:
		 		uniq.append(employee_cont.employee)
		 		uniq_cont.append(employee_cont)
		 	else:
				print("-----------duplicate ---------")
				frappe.throw(_("{0} is a duplicate employee.").format(employee_cont.employee))
		# add the date
		for employee_cont in self.employees:
			employee_cont.date=self.date

	def check_duplicate_workers(self):
		print("-----------check_duplicate_workers--------------")
		(changed, added_employees)=self.check_employee_changed()
		if changed:
			# check if its in another crew
			timesheets = frappe.get_all("Time Sheet",filters={"date": self.date},fields =["name"])
			for timesheet in timesheets:
				if not timesheet.name==self.name:
					timesheet_obj = frappe.get_doc("Time Sheet", timesheet.name)
					save_flag=0
					new_employees=[]
					for container in timesheet_obj.employees:
						if not container.employee in added_employees:
							new_employees.append(container)
						else:
							save_flag=1
					if save_flag:
						timesheet_obj.employees=new_employees
						timesheet_obj.save()
		
	def check_employee_changed(self):
		print("-----------check_employee_changed--------------")
		##  Can make this into a util function check_table_changed(newItem, tableName)
		## return (changed, added[], removed[])
		## could handel non tables
		## return (changed, newval, oldval)
		changed=0
		added_employees=[]
		#check if exists first
		if not frappe.db.get("Time Sheet",self.name):
			if self.employees:
				changed=1
				for container in self.employees:
					added_employees.append(container.employee)
		else:
			original_time_sheet = frappe.get_doc("Time Sheet", self.name)
			original_employees= [container.employee for container in original_time_sheet.employees]
			for container in self.employees:
				if not container.employee in original_employees:
					added_employees.append(container.employee)
					changed=1
		return (changed, added_employees)

@frappe.whitelist()
def get_make_days_timesheet(crew, date):
	time_sheet =frappe.db.get("Time Sheet", {"date":date, "crew":crew})
	if not time_sheet:
		#print("_______________new Timesheet________________")
		time_sheet = frappe.get_doc({
			"doctype":"Time Sheet",
			"date": date,
			"crew": crew
		})
		time_sheet.flags.ignore_permissions = True
		time_sheet.insert()
	return frappe.get_doc("Time Sheet", time_sheet.name)

@frappe.whitelist()
def get_make_days_timesheets(date):
	crews=frappe.get_all("Crew",fields =["crew_lead","name"])
	time_sheets=[]
	for crew in crews:
		time_sheets.append(get_make_days_timesheet(crew.name,date))
	return time_sheets

@frappe.whitelist()
def update_timesheet(item):
	""" takes the jason representation """
	j=json.loads(item)
	print("-----------------------garffff---------------------")
	new_employee=None;
	timesheet=frappe.get_doc("Time Sheet",j["name"])
	jarray=[]
	for passed_employee in j['employees']:
		if 'new' in passed_employee.keys():
			#create employee
			new_employee=frappe.get_doc({
				"doctype":"employee_link_with_time",
				"employee":passed_employee['employee']
			});

		jarray.append(passed_employee['employee']);
		for employee in timesheet.employees:
			if passed_employee["employee"]==employee.employee:
				if "start" in passed_employee:
					employee.start=passed_employee["start"]
				if "end" in passed_employee:
					employee.end=passed_employee["end"];
	forRemove=[]
	for employee_container in timesheet.employees:
		if  employee_container.employee not in jarray:
			forRemove.append(employee_container)
	print("___________REMOVE______________")
	print(forRemove);
	if forRemove:
		for remove in forRemove:
			timesheet.employees.remove(remove)

	if new_employee is not None:
		timesheet.append("employees",new_employee)

	#handel status
	timesheet.status=j["status"]
	timesheet.save()
	return frappe.get_doc("Time Sheet",j["name"])



@frappe.whitelist()
def add_employee_to_sheet(employee, time_sheet,save=0):
	if isinstance(time_sheet, unicode):
		timesheet_obj=frappe.get_doc("Time Sheet", time_sheet)
	else:
		timesheet_obj=time_sheet
	employee_container=frappe.get_doc({
			"doctype":"employee_link_with_time",
			"employee":employee
	})
	#time_sheet.append("employees",employee_container)
	timesheet_obj.append("employees",employee_container)
	if save:
		timesheet_obj.save()
		#time_unit_obj=get_employee_time_unit_by_date(employee_container.employee,timesheet_obj.date)
		return employee_container
	return employee_container
# edge cases,  on more than one crew, on more than one time sheet.

@frappe.whitelist()
def remove_employee_from_sheet(time_sheet,employee):
	time_sheet = frappe.get_doc("Time Sheet", time_sheet)
	date=time_sheet.date
	new_employees=[]
	#print (time_sheet.employees)
	for employee_container in time_sheet.employees:
		if not employee_container.employee==employee:
			new_employees.append(employee_container)
	time_sheet.employees=new_employees
	time_sheet.save()


# @frappe.whitelist()
# def get_employee_time_unit_by_date(employee, date):
# 	time_unit =frappe.db.get("employee_work_time_entry",{"employee":employee, "date":date})
# 	print("--------old time-unit --------")
# 	if not time_unit:
# 		time_unit = frappe.get_doc({
# 			"doctype":"employee_work_time_entry",
# 			"date": date,
# 			"employee": employee,
# 			"status" : "Started"
# 		})
# 		time_unit.insert();
# 		print("--------new time-unit --------")
# 	return time_unit

