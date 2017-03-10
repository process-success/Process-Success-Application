# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json
from frappe.model.document import Document

class work_order(Document):
	pass
	
@frappe.whitelist(allow_guest=True)
def get_sub_tasks(work_order_name):
	sub_tasks = frappe.db.get_values("sub_task_work_order", {"parent": work_order_name}, "*")
	return {"sub_tasks" : sub_tasks}

@frappe.whitelist(allow_guest=True)
def test():
	return "ok"
