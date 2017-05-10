# -*- coding: utf-8 -*-
# Copyright (c) 2017, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class approval_container_employee(Document):

    def validate(self):
        pass

    def update_container(self):
        employee = frappe.get_doc("Employee", self.employee)
        user = frappe.get_doc("User", employee.user)
        if self.status == "Approved":
            employee.compensation_type = self.compensation_type
            employee.compensation = self.compensation
            employee.status = self.status
            if self.role == "Employee":
                print("just employee")
                user.set("roles", [{"role": "Employee"}])
                user.save()
            else:
                user.set("roles", [{"role": "Employee"}, {"role": self.role}])
                user.save()
            employee.save()
        elif self.status == "Disabled":
            employee.status = self.status
            user.enabled = False
            user.save()
            employee.save()
