# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator

class work_order(WebsiteGenerator):
    
    website = frappe._dict(
        template = "templates/generators/work_order/work_order_profile.html"
    )

    def autoname(self):
        self.name = make_autoname("WO" + "-" + ".######")
        self.set_path()

    def get_context(self, context):
        print("############## CONTEXT ###############")
        context.parents = [{"name": "work_orders", "title": "Work Orders", "route": "/work_orders"}]
        context.name = self.name
        context.status = self.status if context.status else "Unknown"
        context.date = self.date if context.date else "Unassigned"
        context.location = self.location
        context.customer = self.customer
        context.crew = self.crew
        context.crew_lead = self.crewlead
        if(len(self.subtask) > 0):
            context.tasks = [frappe.get_doc("sub_task_work_order", stask) for stask in self.subtask]

    def set_path(self):
        self.page_name = self.name
        self.route = self.parent_page + "/" + self.page_name

    def validate(self):
        self.set_path()
