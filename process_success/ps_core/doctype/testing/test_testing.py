# -*- coding: utf-8 -*-
# Copyright (c) 2017, Process Success and Contributors
# See license.txt
from __future__ import unicode_literals

import frappe
import unittest

class TestTesting(unittest.TestCase):
	pass


def get_all_full_doc(doctype, filters):
    docnames=frappe.get_all(doctype,filters=filters)
    doc_list=[]
    if docnames:
        for docname in docnames:
            doc_list.append(frappe.get_doc(doctype,docname.name))
    return doc_list