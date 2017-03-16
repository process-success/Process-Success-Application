
(function(){
	frappe.ready(function() {
	});
})();

(function(){
	frappe.provide("ps.timesheet.comands");
	frappe.provide("ps.timesheet.timeunits");

	//-------------------------------
	//           TIME  SHEET
	//-------------------------------
	var get_all_employees="process_success.ps_core.api.get_all_employees";
	var get_timesheet="process_success.time_tracking.api.get_days_timesheet";
	var get_timesheets="process_success.time_tracking.api.get_days_timesheets_and_timeunits";
	var remove_employee_from_sheet="process_success.time_tracking.api.remove_employee_from_sheet";
	var add_employee_to_sheet="process_success.time_tracking.doctype.time_sheet.time_sheet.add_employee_to_sheet"
	var update_time_units="process_success.time_tracking.api.update_time_units";
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


	ps.timesheet.get_timesheet=function(crew,date){
		//console.log("Get Time Sheet");
		var args={};
		args.cmd=get_timesheet;
		args.crew_name=crew;
		args.date= date;
		ps.call(args,function(data){
			//console.log(data.message.crew);
			time_sheet={};
			//time_sheet.template={};
			time_sheet=data.message;
			console.log(data.message);
			ps.timesheet.output_timesheet_to(time_sheet,".time");
		});
	}
	//ALL TIME SHEETS
	ps.timesheet.get_timesheets=function(date){
		//console.log("Get Time Sheets");
		var args={};
		args.cmd=get_timesheets;
		args.date= date;
		ps.call(args,function(data){
			console.log(data.message);
			var time_sheets=data.message[0];
			ps.timesheet.timeunits=data.message[1];
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
		//console.log(employee);
		ps.call(args,function(data){
			$("#"+ ps.escapeAttr(employee)).remove();
		});
	}
	ps.timesheet.add_employee_to_sheet=function(time_sheet,employee){
		args={};
		args.cmd=add_employee_to_sheet;
		args.employee=employee;
		args.save=1;
		args.time_sheet=time_sheet;
		ps.call(args,function(data){
			//console.log(data);
		 	$("#"+ ps.escapeAttr(employee)).remove();
		 	employee_container=data.message[0];
		 	employee_container.time_unit_obj=data.message[1];
		 	add_employee_ui(employee_container,data.message[0].parent);
		 	ps.init_ui();
		});

	}
	ps.timesheet.update_time_units=function(sheetname){
		args={};
		args.cmd=update_time_units;
		args.time_units=[];
		$.each($("#"+sheetname+"_forms li"),function(i,o){
			timeunit={};
			timeunit.name=$(o).attr("data-timeunit");
			timeunit.start=ps.preptime( $(o).find(".start").val());
			timeunit.end=ps.preptime( $(o).find(".end").val());
			args.time_units.push(timeunit);
		});

		ps.call(args,function(data){
			//console.log("YESSSS")
		});

	}


	ps.timesheet.output_timesheet_to=function(timesheet,selector){
		$(frappe.render_template("time_sheet_head", timesheet )).appendTo(selector);
		//Awesomplete
		var add_input = $("#"+timesheet.name+"_add")[0];
		var aw=init_awesomplete(add_input);
		aw.list=employee_lables;
		//bind add_employee
		$("#"+ timesheet.name + "_update_button").on("click", update(timesheet.name));
		$("#"+ timesheet.name + "_add_btn").on("click", add_employee_callback(timesheet.name));
		for(var i = 0; i < timesheet.employees.length; i++){ 
			var employee=timesheet.employees[i];
			
			//MATCH UP TIME UNITS TO THERE EMPLOYEES
			for(var x = 0; x < ps.timesheet.timeunits.length; x++){
				timeunit=ps.timesheet.timeunits[x];
				if (employee.time_unit==timeunit.name){
					timeunit.start=timeunit.start.split(".")[0];
					timeunit.end=timeunit.end.split(".")[0];
					timesheet.employees[i].time_unit_obj=timeunit;
				}
			}
			add_employee_ui(timesheet.employees[i],timesheet.name);
		}
		ps.init_ui();


	}

	function add_employee_ui(employee,timesheet_name){
		//console.log("EMPLOYEEEEEEEE");
		//console.log(employee);
		var container_selector= "#"+ timesheet_name+"_forms";
		$(frappe.render_template("time_sheet_form", employee )).appendTo(container_selector);
		$("#"+ ps.escapeAttr(employee.employee) +" .delete").on("click", remove_employee_callback(timesheet_name,employee.employee));
		$("#"+employee.time_unit_obj.name+ "_start").keypress(function (e) {
		 	//console.log("poo");
		});
		//console.log("#"+employee.time_unit_obj.name+ "_start");
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
	function update(sheetname){
		return function(event){
			event.preventDefault();
			ps.timesheet.update_time_units(sheetname);
		}
	}
	function remove_employee_callback(time_sheet,employee){
	  return function(event){
	  	console.log(time_sheet+" "+employee)
	  	event.preventDefault();
	    ps.timesheet.remove_employee_from_sheet(time_sheet,employee);
	  }
	}
	function add_employee_callback(time_sheet){
	  return function(event){
	  	event.preventDefault();
	  	var employee_name=($("#" + time_sheet +"_add").val() || "").trim();
	  	$("#" + time_sheet +"_add").val("");
	  	console.log(time_sheet+" "+employee_name)
	    ps.timesheet.add_employee_to_sheet(time_sheet,employee_name);
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
