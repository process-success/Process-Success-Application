from __future__ import unicode_literals

import frappe
from frappe import throw, msgprint, _

class ModuleBlocker:

    def __init__(self, application_names=["frappe", "process_success"]):
        self.application_names = application_names

    def restore_module_access(self, user, module_exceptions=[]):
        frappe.db.sql("""DELETE FROM `tabBlock Module` WHERE parent = '{}'""".format(user.name))
        user.save()
        self.block_modules(user, module_exceptions)

    def block_modules(self, user, module_names):
        for module_name in module_names:
            if self.check_if_module_exists(module_name):
                block_module = frappe.get_doc({
                    "doctype": "Block Module",
                    "parent": user.name,
                    "parenttype": "User",
                    "module": module_name
                })
                user.append("block_modules", block_module)
        user.save(ignore_permissions=True)


    def check_if_module_exists(self, module_name):
        modules = list()
        for app in self.application_names:
            modules = modules + frappe.get_module_list(app_name=app)
        if module_name in modules:
            return True
        else:
            return False
