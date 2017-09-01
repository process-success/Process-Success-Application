import frappe
from frappe import msgprint
from frappe import throw, msgprint, _
from frappe.model.document import Document
from frappe.utils import cint, nowdate, nowtime, cstr, add_days, flt, today
from frappe.sessions import get_csrf_token
import json
import unicodedata
from process_success.ps_core.api import create_doc, update_doc

#Tasks have
# Task: docType -describes what it is
# TaskData: multi doctype
#   - variable data/properties for the task
#   - varies fields dependent type of task
# TaskTypeOptions: doctype
#   - contains the global const data assotiated specific tasks like variable pricing

###
# CREATE TASK TYPE
###

# create TaskData doctype Doctype (document type of Doctype)
# create a taskTypeOptions


###
# UPDATE TASK TYPE
###

###
# Get Tasks
###

###
# Create task
##

###
# Update Task
###

###
# Remove Task
###
