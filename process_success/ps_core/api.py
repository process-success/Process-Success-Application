import frappe
from frappe import msgprint
from frappe.utils import random_string
from frappe import throw, msgprint, _
from frappe.model.document import Document

def testFunction(workorder):
	workorder = frappe.get_doc("work_order" , workorder)

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
			"user": user.name 
		})
		employee.flags.ignore_permissions = True
		employee.insert()
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
			"user": user.name 
		})
		customer.flags.ignore_permissions = True
		customer.insert()
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
		frappe.throw( "You are in more than one crew! This shouldent happen.")
		return 1
	else:
		return 0
		
@frappe.whitelist(allow_guest=True)
def get_all_employees():
	employees=frappe.get_all("Employee",fields =["name","full_name"])
	return employees


# to be called in validate or insertion
def check_field_changed(self):
	pass
	##  Can make this into a util function check_table_changed(newItem, tableName)
	## return (changed, added[], removed[])
	## could handel non tables
	## return (changed, newval, oldval)
	# changed=0
	# added_employees=[]
	# #check if exists first
	# if not frappe.db.get("Time Sheet",self.name):
	# 	if self.employees:
	# 		changed=1
	# 		for container in self.employees:
	# 			added_employees.append(container.employee)
	# else:
	# 	original_time_sheet = frappe.get_doc("Time Sheet", self.name)
	# 	original_employees= [container.employee for container in original_time_sheet.employees]
	# 	for container in self.employees:
	# 		if not container.employee in original_employees:
	# 			added_employees.append(container.employee)
	# 			changed=1

	# return (changed, added_employees)







		
