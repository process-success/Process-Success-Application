# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator

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
		print(self.workflow_state)

		if self.status=="approved":
			self.published= 1

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


@frappe.whitelist(allow_guest=True)
def customer_sign_up(email, full_name, redirect_to):

	if frappe.db.sql("""select count(*) from tabUser where
		HOUR(TIMEDIFF(CURRENT_TIMESTAMP, TIMESTAMP(modified)))=1""")[0][0] > 300:

		frappe.respond_as_web_page(_('Temperorily Disabled'),
			_('Too many users signed up recently, so the registration is disabled. Please try back in an hour'),
			http_status_code=429)

	user = create_user(email, full_name)
	employee = frappe.db.get("Employee", {"email": email})


	if user==0 or employee:
		return 0, _("Already Registered")

	else:
		from frappe.utils import random_string
		employee = frappe.get_doc({
			"doctype":"Employee",
			"email": email,
			"first_name": first_name,
			"last_name": last_name,
			"user": user.name 
		})
		employee.flags.ignore_permissions = True
		employee.insert()

	if redirect_to:
		frappe.cache().hset('redirect_after_login', user.name, redirect_to)

	if user.flags.email_sent:
		return 1, _("Please check your email for verification")
	else:
		return 2, _("Please ask your administrator to verify your sign-up")

def create_user(email, first_name, last_name):
	print("-----------------CREATE USER ---------------------")
	user = frappe.db.get("User", {"email": email})

	if user:
		if user.disabled:
			return 0
		else:
			return 0
	else:
		from frappe.utils import random_string
		user = frappe.get_doc({
			"doctype":"User",
			"email": email,
			"first_name": first_name,
			"last_name": last_name,
			"enabled": 1,
			"new_password": random_string(10),
			"user_type": "Website User"
		})
		user.flags.ignore_permissions = True
		user.insert()
		return user

