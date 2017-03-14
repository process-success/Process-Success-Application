# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate

no_cache = 1
no_sitemap = 1
ROWS_PER_PAGE = 2

def get_context(context):
    if (frappe.session.user == "Guest" or frappe.db.get_value("User", frappe.session.user, "user_type")=="Website User"):
        frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)
    else:
        result = []
        q = "select employee_name, work_order, description, c.status, `vineyard name` from tabvineyards v join tabTasks t join tabCrv_attendance c on (v.name = c.vineyard and t.name = c.task) order by work_order"
        i = 0
        for acc in frappe.db.sql(q, as_dict=1):
            result.append(acc)
        
        row = ""
        result2 = []
        for cont in result: 
            if i>0:
                if cont['work_order'] == result[i-1]['work_order']:
                  row = row + ", " + cont['employee_name'] 
                else:
                    cont2 = result[i-1]
                    cont2['employee_name'] = row
                    row = cont['employee_name']
                    result2.append(cont2)
            else:
                row = cont['employee_name']
            i = i + 1 
        if i > 0:
            cont2 = result[i-1]
            cont2['employee_name'] = row
            result2.append(cont2)
        return {"rowContent" : result2,
                "pages" : ROWS_PER_PAGE}
