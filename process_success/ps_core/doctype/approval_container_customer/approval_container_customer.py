# -*- coding: utf-8 -*-
# Copyright (c) 2017, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class approval_container_customer(Document):
    def validate(self):
        pass

    def update_container(self):
        customer = frappe.get_doc("Customer", self.customer)
        user = frappe.get_doc("User", customer.user)
        if self.status == "Approved":
            if not self.duplicate_vineyard_container_check(customer):
                vineyard_container = frappe.get_doc({
                    "doctype": "vineyard_container",
                    "parent": self.customer,
                    "parenttype": "Customer"

                })
                vineyard_container.vineyard = self.vineyard
                customer.append("vineyards", vineyard_container)
            customer.status = self.status
            customer.save()
        elif self.status == "Disabled":
            customer.status = self.status
            user.enabled = False
            user.save()
            customer.save()

    def duplicate_vineyard_container_check(self, customer):
        vineyard_containers = customer.get_all_children()
        for container in vineyard_containers:
            if container.vineyard == self.vineyard:
                return True
        return False
