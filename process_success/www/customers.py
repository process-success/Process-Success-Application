import frappe

def get_context(context):
	print("------------ customer.py get context ---------------")
	context.customers =  frappe.get_all("Customer", fields =["first_name", "last_name" ,"name"])
