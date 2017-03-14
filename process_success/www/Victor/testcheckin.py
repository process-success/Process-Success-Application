from __future__ import unicode_literals
import frappe
from frappe import _
import frappe.frappecliente
import sys

no_cache = 1
no_sitemap = 1

def get_context(context):
	for url in sys.argv[1:]:
		get_parameters_ = url
	return { "get_parameters" : get_parameters_}
