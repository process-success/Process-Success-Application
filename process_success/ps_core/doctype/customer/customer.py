# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator

class Customer(WebsiteGenerator):
	website = frappe._dict(
		#condition_field = "on_site",
		template = "templates/generators/customer/customer_profile.html",
		page_title_field = "full_name"
	)
	#def make_route(self):
	#	return 'customers/' + self.scrub(self.first_name) + "_" + self.scrub(self.last_name)

	def validate(self):
		print("-------------validate-----------------")
		print(self.workflow_state)
		
		formatted_full_name=self.scrub(self.first_name) + "_" + self.scrub(self.last_name)
		if not self.page_name: 
			self.page_name = self.name

		self.route=  self.parent_page + "/" + self.page_name


	def autoname(self):
		print("-------------AUTO NAME-----------------")
		formatted_full_name=self.scrub(self.first_name) + "_" + self.scrub(self.last_name)
		self.name = make_autoname( formatted_full_name + "_" + '.####')
		#if frappe.defaults.get_global_default('customer_naming_by') != 'Naming Series':

	def on_aprove(self):
		print("-------------on_aprove-----------------")
	def on_aproved(self):
		print("-------------on_aproved-----------------")
	def aproved(self):
		print("-------------aproved-----------------")
	def aprove(self):
		print("-------------aprove-----------------")

	def on_update(self):
		print("-------------update-----------------")
		pass
		

	def get_context(self, context): 
		print("-------------Context-----------------")
		context.parents = [{"name": "customers", "title": "Customers","route": "/customers"}]
		context.user_object = frappe.get_doc("User", self.user)
		print(context.user_object.first_name)


#@frappe.whitelist()
#def get_full_name(attendee):
#	user = frappe.get_doc("User", attendee)

	# concatenates by space if it has value
#	return " ".join(filter(None, [user.first_name, user.middle_name, user.last_name]))



