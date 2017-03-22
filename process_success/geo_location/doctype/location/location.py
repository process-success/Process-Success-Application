# -*- coding: utf-8 -*-
# Copyright (c) 2017, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Location(Document):

	def validate(self):
		self.autoname()

	def autoname(self):
		# Mechanism for retrieving dynamically linked doctype
		# linked_doc = frappe.get_doc(self.document_type, self.document_id)
		parent_doc = frappe.get_doc(self.parenttype, self.parent)
		self.name = self.parenttype + " - " + self.document_id
		
