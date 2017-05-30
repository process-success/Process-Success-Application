# -*- coding: utf-8 -*-
# Copyright (c) 2017, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.naming import make_autoname
from frappe.model.document import Document


class Location(Document):
    def autoname(self):
        self.name = make_autoname("LOC" + "-" + ".######")

    def validate(self):
        if not self.validate_doctype_contains_geojson():
            frappe.throw(_("Referenced doctype in a Location doc must contain a geojson field."))
        self.set_display_name()

    def set_display_name(self):
        # Mechanism for retrieving dynamically linked doctype
        # linked_doc = frappe.get_doc(self.document_type, self.document_id)
        # parent_doc = frappe.get_doc(self.parenttype, self.parent)
        self.display_name = self.document_type + " - " + self.document_id

    def validate_doctype_contains_geojson(self):
        doc = frappe.get_doc(self.document_type, self.document_id)
        keys = list(doc.as_dict())
        if not 'geojson' in keys:
            return False
        else:
            return True
