# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Crew(Document):
    def validate(self):
        pass
        #if adding an employee
        # self_copy = frappe.get_doc("Customer", self.name)

    def check_duplicate_workers(self):
        pass
        #was somthing changed?
        # changes=0
        # original_crew = frappe.get_doc("Customer", self.name)
        # if not self.crew_lead==original_crew.cree_lead:
        #   changed=1

        






    # def duplicate_vineyard_test(self):
    #     self_copy = frappe.get_doc("Customer", self.name)
    #     current_vineyards_containers = self_copy.vineyards
    #     post_save_vineyard_containers = self.vineyards
    #     if len(current_vineyards_containers) < len(self.vineyards):
    #         pre_save_name_list = [container.vineyard for container in current_vineyards_containers]
    #         post_save_name_list = [container.vineyard for container in self.vineyards]
    #         for name in pre_save_name_list:
    #             count = 0
    #             for test_name in post_save_name_list:
    #                 if name == test_name:
    #                     count += 1
    #                 if count > 1:
    #                     return False
    #     return True
