# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe import throw, msgprint, _


class approval_manager(Document):

    def before_insert(self):
        manager_list = frappe.get_all("approval_manager")
        if len(manager_list) >= 1:
            frappe.throw(_("Only one approval manager is allowed.").format())

    def on_update(self):
        pass

    def validate(self):
        self.update_employees()
        self.update_customers()

    def update_employees(self):
        if frappe.has_permission("approval_manager"):
            approval_employee_containers = self.employee_approval
            for container in approval_employee_containers:
                container.update_container()
                if container.status in ["Approved", "Disabled"]:
                    container.delete()

    def update_customers(self):
        if frappe.has_permission("approval_manager"):
            approval_customer_containers = self.customer_approval
            for container in approval_customer_containers:
                container.update_container()
                if container.status in ["Approved", "Disabled"]:
                    container.delete()

    def add_customer(self, customer_doc):
        container = frappe.get_doc({
            "doctype": "approval_container_customer",
            "customer": customer_doc.name,
            "parent": self.name,
            "parenttype": "approval_manager"
        })
        container.save(ignore_permissions=True)
        self.append("customer_approval", container)
        self.save(ignore_permissions=True)

    def add_employee(self, employee_doc):
        container = frappe.get_doc({
            "doctype": "approval_container_employee",
            "parent": self.name,
            "parenttype": "approval_manager"
        })
        container.employee = employee_doc.name
        container.save(ignore_permissions=True)
        self.append("employee_approval", container)
        self.save(ignore_permissions=True)


