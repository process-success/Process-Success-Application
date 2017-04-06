# -*- coding: utf-8 -*-
# Copyright (c) 2017, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import dateutil
import json
from frappe.model.naming import make_autoname
from frappe.model.document import Document


class Issue(Document):
    def autoname(self):
        self.name = make_autoname("I" + "-" + ".######")

    def validate(self):
        pass


def _edit_issue_fields(issue, key, value):
    if key == "vineyard":
        doc = frappe.get_doc("Vineyard", str(value))
        issue.set(key, doc.name)
    elif key == "work_order":
        doc = frappe.get_doc("work_order", str(value))
        issue.set(key, doc.name)
    elif key == "datetime":
        datetime = dateutil.parser.parse(value)
        issue.set(key, datetime)
    elif key == "locations":
        for location in issue.locations:
            frappe.delete_doc("Location", location.name, force=1)
        issue.set('locations', [])
        for entry in value:
            if frappe.db.exists(entry['doctype'], entry['document_id']):
                location = frappe.get_doc({"doctype": "Location"})
                location.set('document_type', entry['doctype'])
                location.set('document_id', entry['document_id'])
                # Make sure to set parent field so that it is visible from the desk dashboard.
                location.set('parentfield', 'locations')
                issue.locations.append(location)
            else:
                frappe.throw(
                    frappe._("Reference doctype and/or document_id in locations does not exist or is invalid."))
    else:
        issue.set(key, value)
    return issue

@frappe.whitelist()
def get_issue(name):
    return frappe.get_doc("Issue", name)

@frappe.whitelist()
def delete_issue(name):
    issue = frappe.get_doc("Issue", name)
    for location in issue.locations:
        frappe.delete_doc("Location", location.name, force=1)
    frappe.delete_doc("Issue", name, force=1)

@frappe.whitelist()
def update_issue(item):

    """
    Takes json input. If assigning a new vineyard, you must pass the vineyard name as a string
    and not the actual object.

    JSON format:
    {
        "name": "name_of_issue_doc",
        "datetime": "date_time",
        "work_order": "work_order_name",
        "vineyard": "vineyard_name",
        "title": "title_of_issue",
        "priority: 1 i.e. integer,
        "issue": "issue_description",
        "status": "status_update",
        "locations": [{"doctype":"doctype", "document_id":"name"}]
    }
    """
    update_item = json.loads(item)
    print(update_item)
    try:
        if frappe.db.exists("Issue", update_item['name']):
            issue = frappe.get_doc("Issue", update_item['name'])
            keys = (issue.as_dict()).keys()
            for key, value in update_item.items():
                if (key in keys) and (value or type(value) == list):
                    print(key, value)
                    issue = _edit_issue_fields(issue, key, value)
            issue.save()
            # In order to get display_name names of locations to update, we loop and save each.
            for location in issue.locations:
                location.save()
            return issue
        else:
            frappe.throw(frappe._("No issue with given name exists"))
    except KeyError as e:
        frappe.throw(frappe._("Key passed in JSON does not exist in doctype. Check to make sure you included a name!"))
    except frappe.DoesNotExistError as e:
        frappe.throw(frappe._("Attempted to access a doctype that does not exist. Validate that all doctype names exist."))


@frappe.whitelist()
def create_issue(item):
    """
    Takes json input. If assigning a new vineyard, you must pass the vineyard name as a string
    and not the actual object.

    JSON format:
    {
        "datetime": "date_time",
        "work_order": "work_order_name",
        "vineyard": "vineyard_name",
        "title": "title_of_issue",
        "priority: 1 i.e. integer,
        "issue": "issue_description",
        "status": "status_update",
        "locations": ["array_of_location_names"]
    }
    """
    create_item = json.loads(item)
    try:
        issue = frappe.get_doc({"doctype": "Issue"})
        for key, value in create_item.items():
            if key in (issue.as_dict()).keys() and value:
                issue = _edit_issue_fields(issue, key, value)
        issue.save()
        # In order to get display name to update.
        for location in issue.locations:
            location.save()
        return issue
    except KeyError as e:
        frappe.throw(frappe._("Key passed in JSON does not exist in doctype!"))
    except frappe.DoesNotExistError as e:
        frappe.throw(frappe._("Attempted to access a doctype that does not exist. Validate that all doctype names exist."))