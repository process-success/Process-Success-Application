# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import getdate, nowdate

no_cache = 1
no_sitemap = 1

def get_context(context):
	if (frappe.session.user == "Guest" or
        frappe.db.get_value("User", frappe.session.user, "user_type")=="Website User"):
        	frappe.throw(_("You are not permitted to access this page."), frappe.PermissionError)

	joined = []
	clients = []
	attendance = []
	
	#for acc in frappe.db.sql("select * from `tabvineyards` where true", as_dict=1):
	#		vineyards.append(acc)
	#		frappe.errprint(acc)	
			
	for acc in frappe.db.sql("select cus.customer_name, cus.customer_type, cus.name, cus.image, cus.status, cus.tax_id, cus.website, cus.credit_days_based_on, cus.credit_days, cus.credit_limit, cus.customer_details, cus.default_commission_rate, l.lead_name, cg.customer_group_name, t.territory_name, c.currency_name, pl.price_list_name, lan.language_name, sp.partner_name from `tabCustomer` cus LEFT JOIN (`tabLead` l, `tabCustomer Group` cg, `tabTerritory` t, `tabCurrency` c, `tabPrice List` pl, `tabLanguage` lan, `tabSales Partner` sp ) on l.name=cus.lead_name AND cg.name=cus.customer_group AND t.name=cus.territory AND c.name=cus.default_currency AND pl.name = cus.default_price_list AND lan.name=cus.language AND sp.name = cus.default_sales_partner", as_dict=1):
			clients.append(acc)
			frappe.errprint(acc)		
			
#	for acc in frappe.db.sql("select * from `tabCustomer` cus JOIN `tabLead` l ON  l.name=cus.lead_name JOIN `tabCustomer Group` cg ON cg.name=cus.customer_group JOIN `tabTerritory` t ON t.name=cus.territory JOIN `tabCurrency` c ON c.name=cus.default_currency JOIN `tabPrice List` pl ON pl.name = cus.default_price_list JOIN `tabLanguage` lan ON lan.name=cus.language JOIN `tabSales Partner` sp ON sp.name = cus.default_sales_partner", as_dict=1):
#			clients.append(acc)
#			frappe.errprint(acc)	
							 
			
#	for acc in frappe.db.sql("select * from `tabCustomer` cus at JOIN (`tabLead` l, `tabCustomer Group` cg, `tabTerritory` t, `tabCurrency` c, `tabPrice List` pl, `tabLanguage` lan, `tabSales Partner` sp ) on l.name=cus.lead_name AND cg.name=cus.customer_group AND t.name=cus.territory AND c.name=cus.default_currency AND pl.name = cus.default_price_list AND lan.name=cus.language AND sp.name = cus.default_sales_partner", as_dict=1):
#			clients.append(acc)
#			frappe.errprint(acc)			
	
	for acc in frappe.db.sql("select * from `tabCrv_attendance` at JOIN (`tabvineyards` v,  `tabCustomer` cus) on at.vineyard=v.name AND at.customer = cus.name" , as_dict=1):
			joined.append(acc)
			frappe.errprint(acc)	
	
	for acc in frappe.db.sql("select * from `tabWork Order` WHERE TRUE" , as_dict=1):
			attendance.append(acc)
			frappe.errprint(acc)	
	
	
	return {"SClient" : clients, "Svineyard": joined, "Sattendance": attendance}
