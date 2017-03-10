from __future__ import unicode_literals
import frappe
from frappe import _
import sys

no_cache = 1
no_sitemap = 1
#git checkout mi branch
def get_context(context):
	get_parameters_ = "no parameters"
	for url in sys.argv[1:]:
		get_parameters_ = url
	#get_parameters_ = request.form['x']
	"""form = cgi.FieldStorage()
	get_parameters_ = form["x"]"""
	#get_parameters_ = request.GET['x']
	#form = web.input()
	#get_parameters_ = os.getenv("QUERY_STRING")
	#get_parameters_ = "-"+sys.stdin.read()+"-"
	#get_parameters_ = validate_oauthTest()
	get_parameters_ = sys.argv[0]
	return { "get_parameters_" : get_parameters_}
	
def validate_oauthTest():
	uri = "empty"
	return "j"
	"""
	from frappe.oauth import get_url_delimiter
	form_dict = frappe.local.form_dict
	authorization_header = frappe.get_request_header("Authorization").split(" ") if frappe.get_request_header("Authorization") else None
	return authorization_header + ".."
	if authorization_header and authorization_header[0].lower() == "bearer":
		from frappe.integration_broker.oauth2 import get_oauth_server
		token = authorization_header[1]
		r = frappe.request
		parsed_url = urlparse(r.url)
		access_token = { "access_token": token}
		uri = parsed_url.scheme + "://" + parsed_url.netloc + parsed_url.path + "?" + urlencode(access_token)
		http_method = r.method
		body = r.get_data()
		headers = r.headers
	return uri
	"""