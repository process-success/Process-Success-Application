# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator

class work_order(WebsiteGenerator):
    
    website = frappe._dict(
        template="templates/generators/work_order/work_order_profile.html"
    )

    def autoname(self):
        self.name = make_autoname("WO" + "-" + ".######")
        self.set_path()

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

        print("############## CONTEXT ###############")
        context.parents = [{"name": "work_orders", "title": "Work Orders", "route": "/work_orders"}]
        context.name = self.name
        context.status = self.status if self.status else "Unknown"
        context.date = self.date if self.date else "Not provided"
        context.location = self.location if self.location else "Not provivded"
        context.customer = self.customer if self.customer else "Unknown"
        context.crew = self.crew if self.crew else "Unassigned"
        context.crewlead = self.crewlead if self.crewlead else "Unassigned"
        context.subtasks = [task for task in self.get("subtask")]
        context.issues = frappe.get_all("Issue", fields=["*"], filters=[["work_order", "=", self.name]])
        context.geojson = json.dumps(geojson, separators=(',', ': '))
        print(context.geojson)

    def set_path(self):
        self.page_name = self.name
        self.route = self.parent_page + "/" + self.page_name

    def validate(self):
        self.set_path()