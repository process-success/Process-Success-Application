// DEFINE THE OBJECTS 

frappe.provide("ps");
ps.initWorkorder=function(){
	var workorders=ps.obj.init();
	workorders.doctype="work_orders";
	workorders.get_function="process_success.time_tracking.doctype.work_order.work_order.get_workorders";
	workorders.update_function="process_success.time_tracking.doctype.work_order.work_order.update_workorder";
	return workorders;
};
ps.apiSetup={};
ps.apiSetup.workOrders={
	doctype:'work_order',
	update:'process_success.time_tracking.doctype.work_order.work_order.update_workorder'
};
ps.apiSetup.vineyardTasks={
	doctype:['Pruning','Spraying'],
};
ps.initCurrentUser=function(){
	var userinfo=ps.obj.init();
	userinfo.doctype="Employee";
	userinfo.get_function="process_success.ps_core.api.get_current_users_info";
	userinfo.update_function="";
	return userinfo;
};

ps.initTimeSheets=function(){
	var obj=ps.obj.init();
	obj.doctype="Time_Sheet";
	obj.get_function='process_success.time_tracking.doctype.time_sheet.time_sheet.get_make_days_timesheets';
	obj.update_function="process_success.time_tracking.doctype.time_sheet.time_sheet.update_timesheet";
	obj.add_employee_to_sheet="";
	return obj;
};

ps.initIssue =function(){
	var obj=ps.obj.init();
	obj.doctype="Issue";
	obj.get_function='process_success.core.doctype.issue.issue.get_issues';
	obj.update_function="process_success.core.doctype.issue.issue.update_issue";
	obj.create_function="process_success.core.doctype.issue.issue.create_issue";
	obj.add_employee_to_sheet="";
	return obj;
};

	// ps.timesheet.remove_employee_from_sheet=function(time_sheet,employee){
	// 	args={};
	// 	args.cmd=remove_employee_from_sheet;
	// 	args.employee=employee;
	// 	args.time_sheet=time_sheet;
	// 	//console.log(employee);
	// 	ps.call(args,function(data){
	// 		$("#"+ ps.escapeAttr(employee)).remove();
	// 	});
	// };
	// ps.timesheet.add_employee_to_sheet=function(time_sheet,employee){
	// 	args={};
	// 	args.cmd=add_employee_to_sheet;
	// 	args.employee=employee;
	// 	args.save=1;
	// 	args.time_sheet=time_sheet;
	// 	ps.call(args,function(data){
	// 		//console.log(data);
	// 	 	$("#"+ ps.escapeAttr(employee)).remove();
	// 	 	employee_container=data.message[0];
	// 	 	employee_container.time_unit_obj=data.message[1];
	// 	 	add_employee_ui(employee_container,data.message[0].parent);
	// 	 	ps.init_ui();
	// 	});

	// }
ps.initEmployeeList=function(){
	var obj=ps.obj.init();
	obj.doctype="Employee";
	obj.get_function="process_success.ps_core.api.get_all_employees";
	obj.update_function="";
	return obj;
};


ps.initGeneral=function(){

};