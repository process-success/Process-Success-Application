import frappe
import json


## DEPRECIATED
@frappe.whitelist()
def get_vineyard_tasks_by_workorder(filters):
	print ("TEST!!")
	doctype_list=["Pruning","Spraying"]
	return_docs=[]
	for doc_type in doctype_list:
		doc_names=frappe.get_all(doc_type,filters={'work_order': workorder}, fields=['name'])
	 	for doc_name in doc_names:
	 		return_docs.append(frappe.get_doc(doc_type,doc_name))
	return return_docs

@frappe.whitelist()
def create_task(item):
	print ("---------------- create_doc -------------------")
	j=json.loads(item)
	obj={"doctype":j['doctype']}
	for key in j:
		obj[key]=j[key]
	new_doc = frappe.get_doc(obj)
	new_doc.insert();
	return new_doc


@frappe.whitelist()
def update_task(item):
	print ("---------------- UPDATE DOC -------------------")
	j=json.loads(item)
	doctype=j['doctype']
	check=frappe.get_all(doctype,filters={"name":j["name"]})
	if check:
		doc=frappe.get_doc(doctype,j["name"])
		print (type(doc))
		for key in j:
			setattr(doc,key,j[key])
		doc.save()
		return doc
	return "Fail"

@frappe.whitelist()
def remove_task(name,doctype):
	print (name)
	print ("---------------- REMOVE DOC -------------------")
	check=frappe.get_all(doctype,filters={"name":name})
	if check:
		doc=frappe.get_doc(doctype,name)
		doc.delete()
		return "Success"
	return "Fail"