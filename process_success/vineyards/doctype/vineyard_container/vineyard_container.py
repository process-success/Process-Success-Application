# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class vineyard_container(Document):
	
	def validate(self):
		pass


	def on_trash(self):
		pass
