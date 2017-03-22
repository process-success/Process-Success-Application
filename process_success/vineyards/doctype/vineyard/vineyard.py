# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator

class Vineyard(WebsiteGenerator):

    website = frappe._dict(
        template="templates/generators/vineyard/vineyard_profile.html",
        page_title_field="vineyard_name"
    )

    def get_context(self, context):
        geojson = {}
        geojson['data'] = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -120.201,
                            34.6122
                        ]
                    },
                    "properties": {
                        "marker-color": "#800b0b",
                        "marker-size": "medium",
                        "name": "Margerum Wines"
                    }
                }
            ]
        }
        geojson['center'] = [-120.201, 34.6122]

        context.parents = [{"name": "vineyards", "title": "Vineyards", "route": "/vineyards"}]
        if(len(self.customers) > 0):
            context.customers = [frappe.get_doc("Customer", container.customer) for container in self.customers]

        context.locations = [location.geojson for location in self.locations]
        context.issues = self.get_unresolved_issues()
        context.geojson = json.dumps(geojson, separators=(',', ': '))

    def set_path(self):
        sluggified_vineyard_name=self.scrub(self.vineyard_name)
        self.page_name = make_autoname(sluggified_vineyard_name + "_" + '.####')
        self.route = self.parent_page + "/" + self.page_name

    def validate(self):
        print("######################################################")
        print(self.get_unresolved_issues())
        print("######################################################")
        self.set_path()

    def get_unresolved_issues(self):
        issues = frappe.get_all("Issue", fields=["*"], filters=[["status", "!=", "Resolved"], ["document_id", "=", self.name]])
        return issues

   

