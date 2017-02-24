# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe

from frappe.website.doctype.website_settings.website_settings import get_website_settings
from frappe.website.doctype.website_settings.website_settings import get_items
from frappe.website.router import get_page_context

def get_context(path, args=None):
	if args and args.source:
		context = args
	else:
		context = get_page_context(path)
		if args:
			context.update(args)

	context = build_context(context)

	if hasattr(frappe.local, 'request'):
		# for <body data-path=""> (remove leading slash)
		# path could be overriden in render.resolve_from_map
		context["path"] = frappe.local.request.path[1:]
	else:
		context["path"] = path

	# set using frappe.respond_as_web_page
	if hasattr(frappe.local, 'response') and frappe.local.response.get('context'):
		context.update(frappe.local.response.context)
	
	# print frappe.as_json(context)

	user_roles = frappe.get_roles()
	top_bar_items_roles = []
	for user_role in user_roles:
		items_name = user_role.replace(" ","_")
		items_name = items_name.lower()
		items_name = 'top_bar_items_' + items_name
		items_role = get_items(items_name)
		top_bar_items_roles.append(items_role)

	context.top_bar_items_roles = top_bar_items_roles
	prosadataTest = "vmorales"
	
	return context

def update_controller_context(context, controller):
	module = frappe.get_module(controller)

	if module:
		# get config fields
		for prop in ("base_template_path", "template", "no_cache", "no_sitemap",
			"condition_field"):
			if hasattr(module, prop):
				context[prop] = getattr(module, prop)

		if hasattr(module, "get_context"):
			ret = module.get_context(context)
			if ret:
				context.update(ret)

		if hasattr(module, "get_children"):
			context.children = module.get_children(context)


def build_context(context):
	"""get_context method of doc or module is supposed to render
		content templates and push it into context"""
	context = frappe._dict(context)

	if not "url_prefix" in context:
		context.url_prefix = ""

	if context.url_prefix and context.url_prefix[-1]!='/':
		context.url_prefix += '/'

	context.update(get_website_settings())
	context.update(frappe.local.conf.get("website_context") or {})

	# provide doc
	if context.doc:
		context.update(context.doc.as_dict())
		context.update(context.doc.website)
		if hasattr(context.doc, "get_context"):
			ret = context.doc.get_context(context)

			if ret:
				context.update(ret)

		for prop in ("no_cache", "no_sitemap"):
			if not prop in context:
				context[prop] = getattr(context.doc, prop, False)

	elif context.controller:
		# controller based context
		update_controller_context(context, context.controller)

		# controller context extensions
		context_controller_hooks = frappe.get_hooks("extend_website_page_controller_context") or {}
		for controller, extension in context_controller_hooks.items():
			if isinstance(extension, list):
				for ext in extension:
					if controller == context.controller:
						update_controller_context(context, ext)
			else:
				update_controller_context(context, extension)

	add_metatags(context)

	if context.show_sidebar:
		context.no_cache = 1
		add_sidebar_data(context)

	# determine templates to be used
	if not context.base_template_path:
		app_base = frappe.get_hooks("base_template")
		context.base_template_path = app_base[0] if app_base else "templates/base.html"

	return context

def add_sidebar_data(context):
	from frappe.utils.user import get_fullname_and_avatar
	import frappe.www.list

	if not context.sidebar_items:
		sidebar_items = frappe.cache().hget('portal_menu_items', frappe.session.user)
		if sidebar_items == None:
			sidebar_items = []
			roles = frappe.get_roles()
			portal_settings = frappe.get_doc('Portal Settings', 'Portal Settings')

			def add_items(sidebar_items, menu_field):
				for d in portal_settings.get(menu_field):
					if d.enabled and ((not d.role) or d.role in roles):
						sidebar_items.append(d.as_dict())

			if not portal_settings.hide_standard_menu:
				add_items(sidebar_items, 'menu')

			if portal_settings.custom_menu:
				add_items(sidebar_items, 'custom_menu')

			frappe.cache().hset('portal_menu_items', frappe.session.user, sidebar_items)

		context.sidebar_items = sidebar_items

	info = get_fullname_and_avatar(frappe.session.user)
	context["fullname"] = info.fullname
	context["user_image"] = info.avatar
	context["user"] = info.name


def add_metatags(context):
	tags = context.get("metatags")
	if tags:
		if not "twitter:card" in tags:
			tags["twitter:card"] = "summary"
		if not "og:type" in tags:
			tags["og:type"] = "article"
		if tags.get("name"):
			tags["og:title"] = tags["twitter:title"] = tags["name"]
		if tags.get("description"):
			tags["og:description"] = tags["twitter:description"] = tags["description"]
		if tags.get("image"):
			tags["og:image"] = tags["twitter:image:src"] = tags["image"]

