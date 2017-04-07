from __future__ import unicode_literals
import frappe

no_cache = 1
no_sitemap = 1

def get_context(context):
	#context.manifest="/assets/process_success/app.appcache"
	username=frappe.session.user
	if not username=="Geust":
		context.manifest="http://localhost:9000/app.appcache"



