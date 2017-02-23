# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Process Success",
			"color": "grey",
			"icon": "octicon octicon-file-directory",
			"type": "module",
			"label": ("Process Success")
		},
		{
			"module_name": "ps_core",
			"color": "grey",
			"icon": "octicon octicon-file-directory",
			"type": "module",
			"label": _("P S Core")
		},
		{
			"module_name": "website_options",
			"color": "grey",
			"icon": "octicon octicon-file-directory",
			"type": "module",
			"label": ("web options")

		}
	]
