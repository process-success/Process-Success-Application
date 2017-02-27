# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Crew(Document):

    def on_update(self):

        for employee_link in self.get('team_members'):
            employee = frappe.get_doc('Employee', employee_link.employee)
            employee.crew = self.name
            employee.save()


