# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Vineyard(Document):
	
	def delete_customer_from_customers(self, customer_name):
		self.remove(customer_name)
