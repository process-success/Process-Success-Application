# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate, get_time, now

no_cache = 1
no_sitemap = 1

def test():
	work_orders = frappe.db.sql("SELECT w.title, w.date, w.start, w.end, w.status, c.full_name, v.vineyard_name, w.name FROM tabVineyard v JOIN tabwork_order w JOIN tabCustomer c ON (v.name = w.location AND w.customer = c.name) ORDER BY w.date ASC")
	return { "work_orders" : work_orders}

def get_context(context):
	role_error = 1
	user_roles = frappe.get_roles()
	#for user_role in user_roles:
	#	if (user_role == "PS Manager"):
	#		role_error = 0
	#		break
	#if (role_error):
	#	frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)

	work_orders = frappe.db.sql("SELECT w.title, w.date, w.start, w.end, w.status, c.full_name, v.vineyard_name, w.name FROM tabVineyard v JOIN tabwork_order w JOIN tabCustomer c ON (v.name = w.location AND w.customer = c.name) ORDER BY w.date ASC")
	#create a new list to store all the previous information and the employees names
	work_orders_return = list()
	#create a new list to store information for each work order
	work_return = []
	for work in work_orders:
		users = frappe.db.sql("SELECT _assign FROM tabwork_order WHERE name = %s", (work[7]))
		users_names = []
		if users:
			#get the emails from the users to get their names
			users_mails = users[0][0].replace("[","")
			users_mails = users_mails.replace("]","")
			users_mails = users_mails.replace(" ","")
			users_mails = users_mails.replace("\"","")
			users_mails = users_mails.split(',')
			for u in users_mails:
				user_name = frappe.db.sql("SELECT full_name FROM tabEmployee WHERE user = %s", (u))
				users_names.append(user_name[0][0])
		#store all the information in the new variable
		work_return = [work[0], work[1], work[2], work[3], work[4], work[5], work[6], work[7], users_names]
		#add information to the list to return
		work_orders_return.append(work_return)

	return { "work_orders" : work_orders_return}
