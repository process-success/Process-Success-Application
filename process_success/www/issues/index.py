import frappe


def get_context(context):
	print("------------ vineyards.py get context ---------------")
	context.vineyards =  frappe.get_all("Issues", fields =["vineyard_name", "route"])