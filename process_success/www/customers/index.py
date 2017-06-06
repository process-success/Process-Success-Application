import frappe
def get_context(context):
	print("------------ customer.py get context ---------------")
	context.customers =  frappe.get_all("Customer", fields =["first_name", "last_name", "name","route","status"])
	context.users = frappe.get_all("User", fields =["*"])

	for customer in context.customers:
		for user in context.users:
			if user.name == customer.name:
				customer["phone"]=user.phone
				customer["birth_date"]= user.birth_date
				customer["gender"]=user.gender
				customer["location"]=user.location