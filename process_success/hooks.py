# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "process_success"
app_title = "Process Success"
app_publisher = "Process Success"
app_description = "Core application to be used in the Frappe framework."
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "cmuell89@gmail.com"
app_license = "Process Success"
home_page = "index"

website_context = {
	"disable_website_theme": True
}

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/process_success/css/process_success.css"
# app_include_js = "/assets/process_success/js/process_success.js"

# include js, css files in header of web template
# web_include_css = "/assets/process_success/css/process_success.css"
# web_include_js = "/assets/process_success/js/process_success.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
role_home_page = {
	"administrator": "admin_index",
	"customer": "customer_index",
	"employee": "employee_index",
	"crew_lead": "crew_index",
	"ps_manager": "ps_manager_index"
}

fixtures = ["Custom Field"]
# Website user home page (by function)
# get_website_user_home_page = "process_success.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "process_success.install.before_install"
after_install = "process_success.utils.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "process_success.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"User": {
		"on_update": "method",
		"on_cancel": "method",
		"on_trash": "method"
	}
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"process_success.tasks.all"
# 	],
# 	"daily": [
# 		"process_success.tasks.daily"
# 	],
# 	"hourly": [
# 		"process_success.tasks.hourly"
# 	],
# 	"weekly": [
# 		"process_success.tasks.weekly"
# 	]
# 	"monthly": [
# 		"process_success.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "process_success.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "process_success.event.get_events"
# }

