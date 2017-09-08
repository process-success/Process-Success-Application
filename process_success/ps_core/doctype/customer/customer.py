# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator
from process_success.ps_core.api import create_user
from process_success.utils.utilities import ModuleBlocker


class Customer(WebsiteGenerator):

    website = frappe._dict(
        #condition_field = "on_site",
        template = "templates/generators/customer/customer_profile.html",
        page_title_field = "full_name",
        condition_field = "published"
    )

    def get_context(self, context):
        context.parents = [{"name": "customers", "title": "Customers","route": "/customers"}]

    def set_path(self):
        print("____________________SET PATH _____________________")
        formatted_full_name=self.scrub(self.first_name) + "_" + self.scrub(self.last_name)
        self.page_name = make_autoname( formatted_full_name + "_" + '.####')
        self.route = self.parent_page + "/" + self.page_name

    def autoname(self):
        self.name = self.first_name + " " + self.last_name
        self.set_path()

    def validate(self):
        print("____________________validate 2113 _____________________")
        if self.status == "Approved":
            self.published = 1

        formatted_full_name = self.scrub(self.first_name) + "_" + self.scrub(self.last_name)
        self.full_name = self.first_name + " " + self.last_name
        save_flag = 0

        if not self.user:
            if self.email:
                user = create_user(self.email, self.first_name, self.last_name, )
                if user == 0:
                    frappe.throw("User already exists")
                self.user = user.name
        # update user
        if self.user:
            user = frappe.get_doc("User", self.user)
            if not user.first_name == self.first_name:
                user.first_name = self.first_name
                save_flag = 1
            if not user.last_name == self.last_name:
                user.last_name == self.last_name
                save_flag = 1
            if save_flag:
                user.full_name = self.full_name
                user.save()
                self.set_path()

        if (self._duplicate_vineyard_test()):
            self._add_customer_to_vineyards()
        else:
            frappe.throw(frappe._("Customer cannot have duplicate Vineyards"))
        self._delete_customer_from_vineyards()

    def before_insert(self):
        print("____________________ insert  _____________________")
        #--- create a new user ----
        full_name = self.first_name + " " + self.last_name

        if not self.user and self.email:
            user =create_user(self.email, self.first_name, self.last_name)
            if user==0:
                frappe.throw("User already exists")
            self.user=user.name

    def on_update(self):
        if self.status == "Approved":
            self._update_roles(["Customer"])
            self._update_module_access()
        if self.status == "Disabled":
            self._update_roles()
            user = frappe.get_doc("User", self.user)
            user.enabled = False
            user.save(ignore_permissions=True)

    def on_trash(self):
        frappe.delete_doc("User", self.user)

    def _update_roles(self, list_of_roles=[]):
        user = frappe.get_doc("User", self.user)
        if len(list_of_roles) > 0:
            for role in list_of_roles:
                if isinstance(role, basestring) or isinstance(role, str):
                    user.append("roles", {"role": role})
                else:
                    frappe.throw(_("list_of_roles must be list of string types."))
        else:
            user.set("roles", [])
        user.save(ignore_permissions=True)

    def _update_module_access(self, additional_modules=None):
        module_blocker = ModuleBlocker()
        user = frappe.get_doc("User", self.user)
        roles = [user_role.role for user_role in user.get("roles")]
        # block frappe module access
        if not (("Administrator" in roles) or ("System Manager" in roles) or ("Manager" in roles)):
            module_blocker.block_modules(user, module_names=["Core", "Desk", "Email", "File Manager",
                                                       "Setup", "website_options"])

    def _duplicate_vineyard_test(self):
        if not frappe.db.exists("Customer", self.name):
            return True
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

    def _add_customer_to_vineyards(self):
        # Add self to customer list for each vineyard.
        for vineyard_container in self.vineyards:
            print(vineyard_container.as_dict())
            if frappe.db.exists("Vineyard", vineyard_container.vineyard):
                vineyard = frappe.get_doc("Vineyard", vineyard_container.vineyard)
                if len(vineyard.customers) == 0:
                    self._add_self_to_vineyard_customers_container(vineyard)
                customer_names = [container.customer for container in vineyard.customers]
                if self.name not in customer_names:
                    self._add_self_to_vineyard_customers_container(vineyard)

    def _delete_customer_from_vineyards(self):
        # NOTE: cannot be called in on_update as save() method updates child tables with the deletion event in the UI (for desk UI forms)
        if frappe.db.exists("Customer", self.name):
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

    def _add_self_to_vineyard_customers_container(self, vineyard):
        customer_container = frappe.get_doc({"doctype":"customer_container"})
        customer_container.customer = self.name
        customer_container.customer_full_name = self.full_name
        vineyard.append('customers', customer_container)
        vineyard.save()
