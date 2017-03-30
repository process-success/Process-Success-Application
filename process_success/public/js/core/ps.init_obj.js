// DEFINE THE OBJECTS 

frappe.provide("ps");
ps.initWorkorder=function(){
	var workorders=ps.obj.init();
	workorders.doctype="work_orders";
	workorders.get_function="process_success.time_tracking.doctype.work_order.work_order.get_workorders";
	workorders.update_function="process_success.time_tracking.doctype.work_order.work_order.update_workorder";
	return workorders;
};

ps.initCurrentUser=function(){
	var userinfo=ps.obj.init();
	userinfo.doctype="Employee";
	userinfo.get_function="process_success.ps_core.api.get_current_users_info";
	userinfo.update_function="";
	return userinfo;
};


//can we make a general tool 
//that takes in a predefined doctype 
//but defaults to a general getdoc call
//the update function would need a legend to write
ps.initGeneral=function(){

};