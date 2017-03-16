# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator

class Vineyard(WebsiteGenerator):

    website = frappe._dict(
        template = "templates/generators/vineyard/vineyard_profile.html",
        page_title_field = "vineyard_name"
    )

    def get_context(self, context):
        context.parents = [{"name": "vineyards", "title": "Vineyards","route": "/vineyards"}]
        if(len(self.customers) > 0):
            context.customers = [frappe.get_doc("Customer", container.customer) for container in self.customers]

        context.locations = [location.geojson for location in self.locations]

    def set_path(self):
        sluggified_vineyard_name=self.scrub(self.vineyard_name)
        self.page_name = make_autoname(sluggified_vineyard_name + "_" + '.####')
        self.route = self.parent_page + "/" + self.page_name

    def validate(self):
        self.set_path()


   

