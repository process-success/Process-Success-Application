import frappe

def get_context(context):
	print("------------ customer.py get context ---------------")
	context.employees =  frappe.get_all("Employee", fields =["first_name", "last_name", "name", "user_type"])
	context.users = frappe.get_all("User", fields =["*"])

	for employee in context.employees:
		print(type(employee))
		for user in context.users:
			if user.name == employee.name:
				employee["phone"]=user.phone
				employee["birth_date"]= user.birth_date
				employee["gender"]=user.gender
				employee["location"]=user.location

