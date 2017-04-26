from __future__ import unicode_literals

import frappe


def after_install():
    install_basic_docs()


def install_basic_docs():
    # core users / roles
    install_docs = [
        # Roles
        {'doctype': "Role", "role_name": "Administrator", "desk_access": 1},
        {'doctype': "Role", "role_name": "Employee", "desk_access": 0},
        {'doctype': "Role", "role_name": "Crew Lead", "desk_access": 0},
        {'doctype': "Role", "role_name": "Customer", "desk_access": 0},
        {'doctype': "Role", "role_name": "Manager", "desk_access": 1},
        # Navigation
        {'doctype': "Top Bar Item", "parent":"Website Settings", "parentfield":"top_bar_items",
                    "parenttype": "Website Settings", "label": "Directory"},
        {'doctype': "Top Bar Item", "parent": "Website Settings", "parentfield": "top_bar_items",
                    "parenttype": "Website Settings", "parent_label": "Directory", "url": "/employees",
                    "label": "Employees"},
        {'doctype': "Top Bar Item", "parent": "Website Settings", "parentfield": "top_bar_items",
         "parenttype": "Website Settings", "parent_label": "Directory", "url": "/customers",
         "label": "Customers"},
        {'doctype': "Top Bar Item", "parent": "Website Settings", "parentfield": "top_bar_items",
         "parenttype": "Website Settings", "parent_label": "Directory", "url": "/vineyards",
         "label": "Vineyards"},
        {'doctype': "Top Bar Item", "parent": "Website Settings", "parentfield": "top_bar_items",
         "parenttype": "Website Settings", "parent_label": "Directory", "url": "/work_orders",
         "label": "Work Orders"},
        # Single Approval Manager
        {'doctype': "approval_manager"}
    ]

    for d in install_docs:
        try:
            frappe.get_doc(d).insert()
        except frappe.NameError:
            pass