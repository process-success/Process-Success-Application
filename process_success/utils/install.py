from __future__ import unicode_literals

import frappe


def after_install():
    install_basic_docs()


def install_basic_docs():
    # core users / roles
    install_docs = [
        {'doctype': "Role", "role_name": "Administrator", "desk_access": 1},
        {'doctype': "Role", "role_name": "Employee"},
        {'doctype': "Role", "role_name": "Crew Lead"},
        {'doctype': "Role", "role_name": "Customer"},
        {'doctype': "Role", "role_name": "Manager", "desk_access": 1}
    ]

    for d in install_docs:
        try:
            frappe.get_doc(d).insert()
        except frappe.NameError:
            pass