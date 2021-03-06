# -*- coding: utf-8 -*-
# Copyright (c) 2015, Process Success and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.naming import make_autoname
from frappe.model.document import Document
from frappe import throw, msgprint, _


class Crew(Document):
    def autoname(self):
        self.name = make_autoname("CREW" + "-" + ".####")

    def on_update(self):
        for employee_link in self.get('team_members'):
            employee = frappe.get_doc('Employee', employee_link.employee)
            employee.crew = self.name
            employee.save()

    def validate(self):
        # if adding an employee
        self.check_duplicate_workers()

    def check_duplicate_workers(self):
        (changed, added_employees) = self.check_employee_changed()
        if changed:
            # check if its in another crew
            print("-----------CHANGED--------------")
            crews = frappe.get_all("Crew", fields=["crew_lead", "name"])
            for crew in crews:
                if not crew.name == self.name:
                    # alas he crew leads for another!
                    if crew.crew_lead in added_employees:
                        frappe.throw(
                            _("Cannot add employee {0}, for he is already the crew lead of {1}").format(crew.crew_lead,
                                                                                                        crew.name))
                    else:
                        crew_obj = frappe.get_doc("Crew", crew.name)
                        save_flag = 0
                        new_team_members = []
                        for container in crew_obj.team_members:
                            if not container.employee in added_employees:
                                new_team_members.append(container)
                            else:
                                save_flag = 1
                        if save_flag:
                            crew_obj.team_members = new_team_members
                            crew_obj.save()

    def check_employee_changed(self):
        changed = 0
        added_employees = []
        # check if exists first
        if not frappe.db.get("Crew", self.name):
            print("NEW insert CONDITION")

            if self.crew_lead:
                added_employees.append(self.crew_lead)
                changed = 1
            if self.team_members:
                changed = 1
                for container in self.team_members:
                    added_employees.append(container.employee)

        else:
            original_crew = frappe.get_doc("Crew", self.name)
            original_workers = [container.employee for container in original_crew.team_members]
            if not self.crew_lead == original_crew.crew_lead:
                added_employees.append(self.crew_lead)
                changed = 1
            for container in self.team_members:
                if not container.employee in original_workers:
                    added_employees.append(container.employee)
                    changed = 1
        return (changed, added_employees)



