import frappe
# from frappe import msgprint
# from frappe.utils import random_string
# from frappe import throw, msgprint, _
# from frappe.model.document import Document
# from process_success.time_tracking.doctype.time_sheet.time_sheet import get_employee_time_unit_by_date
# import json





# @frappe.whitelist()
# def get_days_timesheets_and_timeunits(date):
# 	#combined for less server calls
# 	sheets=get_days_timesheets(date)
# 	#units=[]
# 	units=get_days_timeunits_provided_sheets(sheets)
# 	return (sheets,units)

# def get_days_timeunits_provided_sheets(sheets):
# 	time_units=[]
# 	if sheets:
# 		for sheet in sheets:
# 			time_units= time_units+get_sheets_time_units(sheet)
# 	return time_units


# def get_sheets_time_units(sheet):
# 	if isinstance(sheet, unicode):
# 		timesheet=frappe.get_doc("Time Sheet", time_sheet)
# 	timesheet=sheet
# 	time_units=[]
# 	if timesheet.employees:
# 		for employee_cont in timesheet.employees:
# 			time_units.append(get_employee_time_unit_by_date(employee_cont.employee,timesheet.date))
# 	return time_units



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



# @frappe.whitelist()
# def update_time_units(time_units):
# 	#print (time_units)
# 	j=json.loads(time_units)
# 	if j:
# 		for timeunit in j:
# 			print ("UPDATEING "+timeunit["name"])
# 			time_obj=frappe.get_doc("employee_work_time_entry", timeunit["name"])
# 			print (time_obj.start)
# 			time_obj.start=timeunit["start"]
# 			time_obj.end=timeunit["end"]
# 			print (time_obj.start)
# 			time_obj.save();










		
