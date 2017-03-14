
(function(){
	frappe.ready(function() {
	});
})();

(function(){
	frappe.provide("ps.timesheet.comands");

	//-------------------------------
	//           TIME  SHEET
	//-------------------------------
	var get_all_employees="process_success.ps_core.api.get_all_employees";
	var get_timesheet="process_success.time_tracking.api.get_days_timesheet";
	var get_timesheets="process_success.time_tracking.api.get_days_timesheets";
	var remove_employee_from_sheet="process_success.time_tracking.api.remove_employee_from_sheet";
	var employee_lables=[];
	ps.timesheet.set_employee_lables=function(){
		args={};
		args.cmd=get_all_employees;
		ps.call(args,function(data){
			var lables = data.message.map(function(obj) { 
			   var rObj = {};
			   rObj.label=obj.full_name;
			   rObj.value=obj.name;
			   return rObj;
			});
			employee_lables=lables;
		});
	}
	employees={}

	ps.timesheet.get_timesheet=function(crew,date){
		console.log("Get Time Sheet");
		var args={};
		args.cmd=get_timesheet;
		args.crew_name=crew;
		args.date= date;
		ps.call(args,function(data){
			console.log(data.message.crew);
			time_sheet={};
			//time_sheet.template={};
			time_sheet=data.message;
			console.log(data.message);
			ps.timesheet.output_timesheet_to(time_sheet,".time");
		});
	}
	//ALL TIME SHEETS
	ps.timesheet.get_timesheets=function(date){
		console.log("Get Time Sheets");
		var args={};
		args.cmd=get_timesheets;
		args.date= date;
		ps.call(args,function(data){
			console.log(data.message);
			var time_sheets=data.message;
			for (var i = 0; i < time_sheets.length; i++){
				var time_sheet=time_sheets[i];
				ps.timesheet.output_timesheet_to(time_sheet,".time");
			}
		});
	}
	ps.timesheet.remove_employee_from_sheet=function(time_sheet,employee){
		args={};
		args.cmd=remove_employee_from_sheet;
		args.employee=employee;
		args.time_sheet=time_sheet;
		console.log(employee);
		ps.call(args,function(data){
			$("#"+ ps.escapeAttr(employee)).remove()
		});
	}
	ps.timesheet.add_employee_to_sheet=function(time_sheet,employee){


	}


	ps.timesheet.output_timesheet_to=function(timesheet,selector){
		var container_selector= "#"+ timesheet.name+"_forms";
		$(frappe.render_template("time_sheet_head", timesheet )).appendTo(selector);
		var add_input = $("#"+timesheet.name+"_add")[0];
		var aw=init_awesomplete(add_input);
		aw.list=employee_lables;
		// [{ label: "derek", value: "derebrenner@gmail.com" },
		// { label: "a", value: "alpha" },
		// { label: "b", value: "beta" },
		// { label: "c", value: "cat" },
		// { label: "da", value: "dad" },
		// { label: "dill", value: "dilly" },
		// { label: "deck", value: "deck" }];
		for(var i = 0; i < timesheet.employees.length; i++){ 
			var employee=timesheet.employees[i];
			console.log(employee);
			console.log(employee.employee);
			$(frappe.render_template("time_sheet_form", employee )).appendTo(container_selector);
			$("#"+ ps.escapeAttr(employee.employee) +" .delete").on("click", remove_employee_callback(timesheet.name,employee.employee));
		}
		ps.init_ui();


	}

	function init_awesomplete(input){
		var aw = new Awesomplete(input,{
			minChars: 0,
			maxItems: 99,
			autoFirst: true,
			filter: function(item, input) {
				var value = item.value.toLowerCase();
				if(value.indexOf('is_action') !== -1 ||
					value.indexOf(input) !== -1) {
					return true;
				}
			},
			item: function(item, input) {
				var d = item;
				var html = "<span>" + __(item.label || item.value) + "</span>";
				return $('<li></li>')
					.data('item.autocomplete', item)
					.html('<a><p>' + html + '</p></a>')
					.get(0);
			}
		});
		return aw;
	}

	function remove_employee_callback(time_sheet,employee){
	  return function(event){
	  	console.log(time_sheet+" "+employee)
	  	event.preventDefault();
	    ps.timesheet.remove_employee_from_sheet(time_sheet,employee);
	  }
	}
	function add_employee_callback(time_sheet,employee){
	  return function(event){
	  	console.log(time_sheet+" "+employee)
	  	event.preventDefault();
	    ps.timesheet.remove_employee_from_sheet(time_sheet,employee);
	  }
	}






	//Template
	
	frappe.ready(function() {
		ps.timesheet.set_employee_lables();
		frappe.templates.time_sheet_head=$('#time_sheet_wrapper').html();
		frappe.templates.time_sheet_form=$('#time_sheet_template').html();
		//ps.timesheet.get_timesheet("{{crew.name}}","{{today}}");
		ps.timesheet.get_timesheets("{{today}}");


	});

})();
