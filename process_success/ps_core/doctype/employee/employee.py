# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import throw, msgprint, _
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator
from process_success.ps_core.api import create_user

@frappe.whitelist(allow_guest=True)
def test():
	return "YEA!!!!"

	
class Employee(WebsiteGenerator):
	website = frappe._dict(
		#condition_field = "on_site",
		template = "templates/generators/employee/employee_profile.html",
		page_title_field = "full_name"

	)
	def on_trash(self):
		self.user
		frappe.delete_doc("User", self.user)
		print("----------USER DELETED-----------")

	def before_insert(self):
		#--- create a new user ----
		print("-------------before insert-----------------")
		full_name = self.first_name + " " + self.last_name

		if not self.user:
			user =create_user(self.email, self.first_name, self.last_name)
			if user==0:
				frappe.throw("User already exists")
			self.user=user.name


	def validate(self):
		print("-------------validate-----------------")

		formatted_full_name=self.scrub(self.first_name) + "_" + self.scrub(self.last_name)
		user=frappe.get_doc("User", self.user)
		save_flag=0
		self.full_name= self.first_name + " " + self.last_name
		#update user
		if not user.first_name==self.first_name:
			user.first_name= self.first_name
			save_flag=1
		if not user.last_name==self.last_name:
			user.last_name==self.last_name
			save_flag=1
		if save_flag:
			user.full_name=self.full_name
			user.save()
			self.set_path()


	def autoname(self):
		print("-------------AUTO NAME-----------------")
		self.name = self.user
		self.set_path()

	def set_path(self):
		formatted_full_name=self.scrub(self.first_name) + "_" + self.scrub(self.last_name)
		self.page_name = make_autoname( formatted_full_name + "_" + '.####')
		self.route = self.parent_page + "/" + self.page_name
		#if frappe.defaults.get_global_default('customer_naming_by') != 'Naming Series':

		

	def get_context(self, context): 
		print("-------------Context-----------------")
		context.parents = [{"name": "employees", "title": "Employees","route": "/employees"}]
		#context.user_object = frappe.get_doc("User", self.user)
		#print(context.user_object.first_name)

