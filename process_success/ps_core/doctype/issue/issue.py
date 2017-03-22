# -*- coding: utf-8 -*-
# Copyright (c) 2017, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class Issue(Document):
    pass


frappe.whitelist()
def get_issues_for_doctype(doctype, fields, filters):
    return frappe.get_all(doctype=doctype, fields=fields, filters=filters)
