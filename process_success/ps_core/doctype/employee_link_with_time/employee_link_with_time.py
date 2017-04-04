# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class employee_link_with_time(Document):

	def before_insert(self):
		print("__________time unit insert _________________")

	def validate(self):
		frappe.db.get("Time Sheet", self.parent)
		print ("_______________VALIDATE!!!!!!!!!!!!_________________________")
		print(self.parent)


