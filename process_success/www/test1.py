# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt
from __future__ import unicode_literals
import frappe
from frappe import _
from process_success.website_options.roles_menu import get_items_by_role

no_cache = 1
no_sitemap = 1

def get_context(context):
	menu_name = 'top_bar_items_administrator'
	user_roles = frappe.get_roles()
	top_bar_items_roles = []
	for user_role in user_roles:
#		items_name = user_role.replace(" ","_")
#		items_name = items_name.lower() + items_name
		items_role = get_items_by_role(menu_name, user_role)
		top_bar_items_roles.append(items_role)

	prosadataTest = "vmorales"
	
	return { "prosadataTest" : "Prosadata test comment: vmorales@prosadata.com",
		"top_bar_items_roles" : top_bar_items_roles,
		"title" : "my title"}