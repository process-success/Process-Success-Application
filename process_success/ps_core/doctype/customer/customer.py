# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import throw, _
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator
from process_success.ps_core.api import create_user

class Customer(WebsiteGenerator):
    website = frappe._dict(
        #condition_field = "on_site",
        template = "templates/generators/customer/customer_profile.html",
        page_title_field = "full_name",
        condition_field = "published"

    )

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
        context.parents = [{"name": "customers", "title": "Customers","route": "/customers"}]
        context.user_object = frappe.get_doc("User", self.user)
        print(context.user_object.first_name)

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
        if self.status=="aproved":
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

        if(self.duplicate_vineyard_test()):
            self.add_customer_to_vineyards()
        else:
            frappe.throw(_("Customer cannot have duplicate Vineyards"))
        self.delete_customer_from_vineyards()
        
    def duplicate_vineyard_test(self):
        self_copy = frappe.get_doc("Customer", self.name)
        current_vineyards_containers = self_copy.vineyards
        if len(current_vineyards_containers) < len(self.vineyards):
            pre_save_name_list = [container.vineyard for container in current_vineyards_containers]
            post_save_name_list = [container.vineyard for container in self.vineyards]
            for name in pre_save_name_list:
                count = 0
                for test_name in post_save_name_list:
                    if name == test_name:
                        count += 1
                    if count > 1:
                        return False
        return True

    def add_customer_to_vineyards(self):
        # Add self to customer list for each vineyard.
        for vineyard_container in self.vineyards:
            if frappe.db.exists("Vineyard", vineyard_container.vineyard):
                vineyard = frappe.get_doc("Vineyard", vineyard_container.vineyard)
                if len(vineyard.customers) == 0:
                    self.add_self_to_vineyard_customers_container(vineyard)
                for cust_container in vineyard.customers:
                    if(cust_container.customer != self.name):
                        self.add_self_to_vineyard_customers_container(vineyard)

    def delete_customer_from_vineyards(self):
        # NOTE: annot be called in on_update as save() method updates child tables with the deletion event in the UI (for desk UI forms)
        self_copy = frappe.get_doc("Customer", self.name)
        current_vineyards_containers = self_copy.vineyards
        if len(current_vineyards_containers) > len(self.vineyards):
            pre_save_name_list = [frappe.get_doc("vineyard_container", container.name).vineyard for container in current_vineyards_containers]
            post_save_name_set = set(frappe.get_doc("vineyard_container", container.name).vineyard for container in self.vineyards)
            for vineyard_name in pre_save_name_list:
                if vineyard_name not in post_save_name_set:
                    vineyard = frappe.get_doc("Vineyard", vineyard_name)
                    customers = vineyard.get("customers")
                    new_customer_list = []
                    for customer_container in customers:
                        if customer_container.customer != self.name:
                            new_customer_list.append(customer_container)
                    vineyard.customers = new_customer_list
                    vineyard.save()

    def add_self_to_vineyard_customers_container(self, vineyard):
        customer_container = frappe.get_doc({"doctype":"customer_container"})
        customer_container.customer = self.name
        customer_container.customer_full_name = self.full_name
        vineyard.append('customers', customer_container)
        vineyard.save() 

    



