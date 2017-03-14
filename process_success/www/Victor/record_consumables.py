# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate

no_cache = 1
no_sitemap = 1

def get_context(context):
	if (frappe.session.user == "Guest" or frappe.db.get_value("User", frappe.session.user, "user_type")=="Website User"):
		frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)
	else:
		result = []
		q = "select name, cons_name from tabconsumables"
		for acc in frappe.db.sql(q, as_dict=1):
			result.append(acc)
		return {"rowContent": result}

@frappe.whitelist()
def enterOperation(code, amount, date):
	amount = float(amount)
	consumable = frappe.get_all('consumables',filters={'name':code},fields=['name', 'amount'])
	if (consumable[0]['amount'] - amount < 0):
		frappe.msgprint("The amount requested exceeds the amount available.")
	else:
		updateItem = frappe.get_doc('consumables', consumable[0]['name'])
		doc = frappe.new_doc("use_of_consumables")
		doc.consumable = consumable[0]['name']
		doc.amount = amount
		doc.date = date
		doc.submit()
		updateItem.amount = updateItem.amount - amount
		updateItem.save()
		frappe.msgprint("Registration done.")
	return 0