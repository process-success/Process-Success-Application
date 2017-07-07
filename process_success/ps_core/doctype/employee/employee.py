# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator
from process_success.ps_core.api import create_user
from process_success.utils.utilities import ModuleBlocker


class Employee(WebsiteGenerator):

    website = frappe._dict(
        # condition_field = "on_site",
        template="templates/generators/employee/employee_profile.html",
        page_title_field="full_name"
    )

    def get_context(self, context):
        context.parents = [{"name": "employees", "title": "Employees", "route": "/employees"}]

    def set_path(self):
        formatted_full_name = self.scrub(self.first_name) + "_" + self.scrub(self.last_name)
        self.page_name = make_autoname(formatted_full_name + "_" + '.####')
        self.route = self.parent_page + "/" + self.page_name
        # if frappe.defaults.get_global_default('customer_naming_by') != 'Naming Series':

    def autoname(self):
        self.name = self.first_name + " " + self.last_name
        self.set_path()

    def validate(self):
        formatted_full_name = self.scrub(self.first_name) + "_" + self.scrub(self.last_name)
        save_flag = 0
        self.full_name = self.first_name + " " + self.last_name
        #Setup Email
        full_name = self.first_name + " " + self.last_name
        if not self.user:
            if self.email:
                user = create_user(self.email, self.first_name, self.last_name, )
                if user == 0:
                    frappe.throw("User already exists")
                self.user = user.name
                self._update_module_access()
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
        ## default the pending if no user
        if self.status=="Approved" or self.status=="Disabled":
            if not self.user:
                self.status="Pending"

        if self.user:
            self.handlePerms()

    def before_insert(self):
        self.set_path()

    def handlePerms(self):
        print("-------------PERMS----------------")
        if self.status == "Approved":
            module_blocker = ModuleBlocker()
            if self.user_type == "Employee":
                self._update_roles([])
                self._update_roles(["Employee"])
                self._update_module_access()
            if self.user_type == "Crew Lead":
                self._update_roles([])
                self._update_roles(["Employee", "Crew Lead"])
                self._update_module_access()
            if self.user_type == "Manager":
                self._update_roles([])
                self._update_roles(["Employee", "Manager"])
                user = frappe.get_doc("User", self.user)
                module_blocker.restore_module_access(user)
                module_blocker.block_modules(user, module_names=["Setup", "Website", "website_options"])
        elif self.status == "Disabled":
            self._update_roles()
            user = frappe.get_doc("User", self.user)
            user.enabled = False
            user.save(ignore_permissions=True)

    def after_delete(self):
        frappe.delete_doc("User", self.user)

    def _update_roles(self, list_of_roles=[]):
        user = frappe.get_doc("User", self.user)
        if len(list_of_roles) > 0:
            for role in list_of_roles:
                if isinstance(role, basestring) or isinstance(role, str):
                    user.append("roles", {"role": role})
                else:
                    frappe.throw(frappe._("list_of_roles must be list of string types."))
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
                                                       "Setup", "Website", "website_options"])
