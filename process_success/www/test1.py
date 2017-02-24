# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt
from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.website.doctype.website_settings.website_settings import get_items

no_cache = 1
no_sitemap = 1

def get_context(context):
	user_roles = frappe.get_roles()
	top_bar_items_roles = []
	for user_role in user_roles:
		items_name = user_role.replace(" ","_")
		items_name = items_name.lower()
		items_name = 'top_bar_items_' + items_name
		items_role = get_items(items_name)
		top_bar_items_roles.append(items_role)

	prosadataTest = "vmorales"
	
	return { "prosadataTest" : prosadataTest,
		"top_bar_items_roles" : top_bar_items_roles,
		"title" : "my title"}