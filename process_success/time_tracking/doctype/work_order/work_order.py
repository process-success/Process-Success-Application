# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json
from frappe.model.naming import make_autoname
from frappe.website.website_generator import WebsiteGenerator
from process_success.vineyards.api import get_vineyard_tasks_by_workorder
import json
import copy

class work_order(WebsiteGenerator):
    
    website = frappe._dict(
        template="templates/generators/work_order/work_order_profile.html"
    )

    def autoname(self):
        self.name = make_autoname("WO" + "-" + ".######")
        self.set_path()

    def on_trash(self):
        #get_vineyard_tasks_by_workorder(self.name)
        frappe.delete_doc("User", self.user)

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
        #context.customer = self.customer if self.customer else "Unknown"
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


@frappe.whitelist()
def get_workorders(crew=0, date=0,status=0,location=0):
    filter={}
    if crew:
        filter['crew']=crew
    if date:
        filter['date']=date
    if status:
        filter['status']=status
    if location:
        filter['location']=location
    if not filter:
        filter={"*"}
    workorders=frappe.get_all("work_order",filters=filter,fields=["*"])
    print ("_________________get_workorders _________________")
    print (workorders)
    workorder_list=[]
    if workorders:
        for workorder in workorders:
            workorder_list.append(frappe.get_doc("work_order",workorder.name))
    return workorder_list

@frappe.whitelist()
def update_workorder(item):
    """ takes the jason representation 
    Can update 
    start
    end
    status
    subtasks.status changes
    """
    j=json.loads(item)
    workorderObj=frappe.get_doc("work_order",j["name"])
    workorderObj.start=j["start"]
    workorderObj.end=j["end"]
    workorderObj.status=j["status"]

    if workorderObj.subtask:
        index = 0
        for task in workorderObj.subtask:
            task.status=j["subtask"][index]["status"]
            index+=1
    workorderObj.save()

    return workorderObj



