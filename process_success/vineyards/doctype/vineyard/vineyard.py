# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.website.website_generator import WebsiteGenerator

class Vineyard(WebsiteGenerator):

    website = frappe._dict(
        template = "templates/generators/vineyard/vineyard_profile.html",
        condition_field = "published",
        page_title_field = "vineyard_name"
    )

    def get_context(self, context):
        context.parents = [{"name": "vineyards", "title": "Vineyards","route": "/vineyards"}]
        context.user_object = frappe.get_doc("User", self.user)