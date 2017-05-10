from __future__ import unicode_literals
import frappe
from frappe import _

def get_items_by_role(menu_name, role_name):
	all_top_items = frappe.db.sql("""\
		select i.name, i.creation, i.modified, i.modified_by
		, i.owner, i.docstatus, i.parent, i.parentfield
		, i.parenttype, i.idx, i.link as url, i.parent_label
		, 0 as `right`, i.target, i.display_label as label
		from tabmenu_item i, tabMenu m
		where i.parent = m.name 
		and m.menu_name = %s
		and i.role = %s
		order by idx asc""", (menu_name, role_name), as_dict=1)

	top_items = [d for d in all_top_items if not d['parent_label']]

	# attach child items to top bar
	for d in all_top_items:
		if d['parent_label']:
			for t in top_items:
				if t['label']==d['parent_label']:
					if not 'child_items' in t:
						t['child_items'] = []
					t['child_items'].append(d)
					break
	return top_items

