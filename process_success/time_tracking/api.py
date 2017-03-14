import frappe
from frappe import msgprint
from frappe.utils import random_string
from frappe import throw, msgprint, _
from frappe.model.document import Document
from process_success.time_tracking.doctype.time_sheet.time_sheet import get_employee_time_unit_by_date

@frappe.whitelist()
def get_days_timesheet(crew_name, date):
	#is it bad practice to fetch and create from same function?
	time_sheet =frappe.db.get("Time Sheet", {"date":date, "crew":crew_name})
	print(time_sheet)
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
	time_sheet.employees=get_timesheet_employees(time_sheet.name)
	return time_sheet

@frappe.whitelist()
def get_days_timesheets(date):
	crews=frappe.get_all("Crew",fields =["crew_lead","name"])
	time_sheets=[]
	for crew in crews:
		time_sheets.append(get_days_timesheet(crew.name,date))
	return time_sheets

def get_timesheet_employees(name):
	#print("__________ get employees --------")
	time_sheet = frappe.get_doc("Time Sheet", name)
	employees=[]
	if time_sheet.employees:
		for employee_container in time_sheet.employees:
			#employee_container.time_unit=get_employee_time_unit_by_date(employee_container.employee,time_sheet.date,name)
			#print(employee_container.time_unit)
			employees.append(employee_container)
	return employees

@frappe.whitelist()
def remove_employee_from_sheet(time_sheet,employee):
	time_sheet = frappe.get_doc("Time Sheet", time_sheet)
	date=time_sheet.date
	new_employees=[]
	print (time_sheet.employees)
	for employee_container in time_sheet.employees:
		if not employee_container.employee==employee:
			new_employees.append(employee_container)
			print("___DELETE IT ____")
		else:
			time_unit =frappe.db.get("employee_work_time_entry",{"employee":employee, "date":date})
			time_unit=frappe.get_doc("employee_work_time_entry",time_unit.name )
			time_unit.time_sheet=""
			time_unit.save()

	time_sheet.employees=new_employees
	time_sheet.save()
			#del time_sheet.employees





		
