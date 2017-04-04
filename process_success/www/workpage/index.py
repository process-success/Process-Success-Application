from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate

no_cache = 1
no_sitemap = 1

def get_context(context):
	context.manifest="/assets/process_success/app.appcache"



