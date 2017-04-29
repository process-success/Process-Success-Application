import frappe
from frappe import msgprint
from frappe.utils import random_string
from frappe import throw, msgprint, _
from frappe.model.document import Document
from frappe.utils import cint, nowdate, nowtime, cstr, add_days, flt, today
from frappe.sessions import get_csrf_token



@frappe.whitelist()
def get_work_orders(start, end):
	"""frappe.db.sql("query")"""
	#frappe.publish_realtime('msgprint', 'message', user=user)
	#frappe.msgprint("test")
	print ("test")
	#if not frappe.has_premission("work_order","read"):
	#	raise frappe.PermissionError
	return frappe.db.sql("""select
			timestamp(date, start) as start,
			timestamp(date, end) as end,
			name,
			title,
			status
		from `tabwork_order`
		where `date` between %(start)s and %(end)s """,{
			"start": start,
			"end": end
		}, as_dict=True)
#--------------------------------------
#                Sign up
#--------------------------------------
@frappe.whitelist(allow_guest=True)
def sign_up(email, first_name, last_name, user_type, redirect_to, password):
	#process_success.ps_core.doctype.employee.employee.sign_up
	if frappe.db.sql("""select count(*) from tabUser where
		HOUR(TIMEDIFF(CURRENT_TIMESTAMP, TIMESTAMP(modified)))=1""")[0][0] > 300:

		frappe.respond_as_web_page(_('Temperorily Disabled'),
			_('Too many users signed up recently, so the registration is disabled. Please try back in an hour'),
			http_status_code=429)

	user = create_user(email, first_name, last_name, password)
	ps_user=0
	if user:
		if user_type=="employee":
			ps_user = create_employee(email, first_name, last_name, user)

		else:
			ps_user= create_customer(email, first_name, last_name, user)

	if not ps_user or not user:
		return _("Already Registered")
	#if redirect_to:
		#frappe.cache().hset('redirect_after_login', user.name, redirect_to)
	else:
		return "signedup"


	if user.flags.email_sent:
		return _("Please check your email for verification")
	else:
		return _("Please ask your administrator to verify your sign-up")

def create_employee(email, first_name, last_name, user):
	employee = frappe.db.get("Employee", {"email": email})
	
	if employee:
		return 0

	else:
		from frappe.utils import random_string
		employee = frappe.get_doc({
			"doctype":"Employee",
			"email": email,
			"first_name": first_name,
			"last_name": last_name,
			"user": user.name,
			"status": "Pending"
		})
		employee.flags.ignore_permissions = True
		employee.insert()
		insert_into_approval_manager(employee, "Employee")
	return employee

def create_customer(email, first_name, last_name, user):
	customer = frappe.db.get("Customer", {"email": email})
	if customer:
		return 0

	else:
		from frappe.utils import random_string
		customer = frappe.get_doc({
			"doctype":"Customer",
			"email": email,
			"first_name": first_name,
			"last_name": last_name,
			"user": user.name,
			"status": "Pending"
		})
		customer.flags.ignore_permissions = True
		customer.insert()
		insert_into_approval_manager(customer, "Customer")
	return customer

def create_user(email, first_name, last_name, password=0):
	print("-----------------CREATE USER ---------------------")
	user = frappe.db.get("User", {"email": email})

	if user:
		if user.disabled:
			return 0
		else:
			return 0
	else:
		print(password)
		if not password:
			password = random_string(10);
		print(password)
		user = frappe.get_doc({
			"doctype":"User",
			"email": email,
			"first_name": first_name,
			"last_name": last_name,
			"enabled": 1,
			"new_password": password,
			"user_type": "Website User"
		})
		if not password:
			user.password=password

		user.flags.ignore_permissions = True
		user.insert()
		return user

## CREW UTIL

def get_crews_employees(crew_name):
	crew=frappe.get_doc("Crew", crew_name)
	all_members=[]

	if crew.crew_lead:
		#print(crew.crew_lead)
		all_members.append(crew.crew_lead)
	for team_member in crew.team_members:
		all_members.append(team_member.employee)
	return all_members


def get_employees_crew(employee_name):
	#Returns an array of crews.  Could be in more than one
	#print("--------get_employees_crew---------")
	user=frappe.db.get("Employee",{"name":employee_name})
	crews=frappe.get_all("Crew",fields =["crew_lead","name"])
	crews_return=[]

	for crew in crews:
		#print(crew.name)
		all_members=get_crews_employees(crew.name)
		crew.all_members=all_members
		for member in all_members:
			if member==employee_name:
				crews_return.append(crew)

	if len(crews_return)==1:
		return crews_return[0]
	#  there should be a better way to handel errors!!
	elif len(crews_return)>1:
		frappe.throw( "You are in more than one crew! This shouldn't happen.")
		return 1
	else:
		return 0

def insert_into_approval_manager(doc, type):
	approval_manager_list = frappe.get_all("approval_manager")
	if len(approval_manager_list) > 0:
		approval_manager = frappe.get_doc("approval_manager", approval_manager_list[0])
		if type == "Customer":
			approval_manager.add_customer(doc)
		if type == "Employee":
			approval_manager.add_employee(doc)
	else:
		frappe.throw(_("No approval manager exists. Please contact Process Success for support."))

@frappe.whitelist()
def get_all_employees():
	employees=frappe.get_all("Employee",fields =["name","full_name"])
	return employees


@frappe.whitelist(allow_guest=True)
def get_current_users_info():
	user={};
	user['username'] = frappe.session.user
	user['current_user'] = frappe.db.get("User",{"name":user['username']})
	crew = get_employees_crew(user['username'])
	if not crew:
		user['crew'] = 'none'
	else:
		user['crew'] = get_employees_crew(user['username']).name
	user['today'] = today()
	users=[]
	users.append(user)
	#return get_csrf_token()
	return user


# to be called in validate or insertion
def check_field_changed(self):
	pass



def check_table_changed(newItem, tableName):
	## return (changed, added[], removed[])
	## return (changed, newval, oldval)
	#usage
	# return_dic=check_table_changed(this, 'table_name')
	# for toDelete in return_dic['removed']:
	# 	frappe.get_doc(toDelete.doctype, toDelete.name).delete()
	changed=0
	added=[]
	removed=[]
	old_item=frappe.db.get(newItem.doctype, newItem.name)

	if not old_item:
	 	if newItem[tableName]:
	 		for item in newItem[tableName]:
	 			added_employees.append(item)
	 			changed=1
	else:
		original_items= [container for container in old_item[tableName]]
		new_items_items= [container for container in new_item[tableName]]

		for container in newItem[tableName]:
			if not container in original_items:
				added.append(container)
				changed=1

		for container in original_items:
			if not container in new_items_items:
				removed.append(container)
				changed=1

	return {'changed':changed, 'added' : added, 'removed':removed};

# @frappe.whitelist()
# def get_csrf():
# 	return get_csrf_token()

#-------------------------------------
#   Get all but with full Doctype 
#-------------------------------------

@frappe.whitelist()
def get_all_full_doc(doctype, filters):
    docnames=frappe.get_all(doctype,filters=filters)
    doc_list=[]
    if docnames:
        for docname in docnames:
            doc_list.append(frappe.get_doc(doctype,docname.name))
    return doc_list

@frappe.whitelist()
def create_doc(doctype,item):
	pass

@frappe.whitelist()
def remove_doc(doctype,item_name):
	pass







