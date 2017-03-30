import frappe
from frappe import msgprint
from frappe.utils import random_string
from frappe import throw, msgprint, _
from frappe.model.document import Document
from process_success.time_tracking.doctype.time_sheet.time_sheet import get_employee_time_unit_by_date
import json

@frappe.whitelist()
def get_days_timesheet(crew_name, date):
	#is it bad practice to fetch and create from same function?
	time_sheet =frappe.db.get("Time Sheet", {"date":date, "crew":crew_name})
	#print("_______________get_days_timesheet________________")
	if not time_sheet:
		#print("_______________new Timesheet________________")
		time_sheet = frappe.get_doc({
			"doctype":"Time Sheet",
			"date": date,
			"crew": crew_name
		})
		time_sheet.flags.ignore_permissions = True
		time_sheet.insert()
	return frappe.get_doc("Time Sheet", time_sheet.name)

@frappe.whitelist()
def get_days_timesheets(date):
	crews=frappe.get_all("Crew",fields =["crew_lead","name"])
	time_sheets=[]
	time_units=[]
	for crew in crews:
		time_sheets.append(get_days_timesheet(crew.name,date))
	return time_sheets

@frappe.whitelist()
def get_days_timesheets_and_timeunits(date):
	#combined for less server calls
	sheets=get_days_timesheets(date)
	#units=[]
	units=get_days_timeunits_provided_sheets(sheets)
	return (sheets,units)

def get_days_timeunits_provided_sheets(sheets):
	time_units=[]
	if sheets:
		for sheet in sheets:
			time_units= time_units+get_sheets_time_units(sheet)
	return time_units


def get_sheets_time_units(sheet):
	if isinstance(sheet, unicode):
		timesheet=frappe.get_doc("Time Sheet", time_sheet)
	timesheet=sheet
	time_units=[]
	if timesheet.employees:
		for employee_cont in timesheet.employees:
			time_units.append(get_employee_time_unit_by_date(employee_cont.employee,timesheet.date))
	return time_units



# def get_timesheet_employees_with_timeunit(name):
# 	#print("__________ get employees --------")
# 	time_sheet = frappe.get_doc("Time Sheet", name)
# 	employees=[]
# 	if time_sheet.employees:
# 		for employee_container in time_sheet.employees:
# 			time_unit_obj=get_employee_time_unit_by_date(employee_container.employee,time_sheet.date)
# 			print("--------------------")
# 			employee_container.time_unit_start=time_unit_obj.start
# 			employees.append(employee_container)
# 	return employees

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

@frappe.whitelist()
def update_time_units(time_units):
	#print (time_units)
	j=json.loads(time_units)
	if j:
		for timeunit in j:
			print ("UPDATEING "+timeunit["name"])
			time_obj=frappe.get_doc("employee_work_time_entry", timeunit["name"])
			print (time_obj.start)
			time_obj.start=timeunit["start"]
			time_obj.end=timeunit["end"]
			print (time_obj.start)
			time_obj.save();










		
