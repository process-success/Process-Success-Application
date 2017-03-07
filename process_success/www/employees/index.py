import frappe

def get_context(context):
	print("------------ customer.py get context ---------------")
	context.employees =  frappe.get_all("Employee", fields =["first_name", "last_name" ,"name","route"])
