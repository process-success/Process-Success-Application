(function(){
	frappe.provide("ps.workorders");

	//-------------------------------
	//           WorkOrders
	//-------------------------------
	var get_workorders="process_success.time_tracking.api.get_workorders";



	ps.workorders.get_workorders=function(crew,date){
		console.log("Get Workorders");
		var args={};
		args.cmd=get_workorders;
		args.crew=crew;
		args.date= date;
		ps.call(args,function(data){
			selector=".workorders";
			console.log(data.message);
			for (var i = 0; i < data.message.length; i++){
				workorder=data.message[i]
				ps.workorders.output_workorder_to(workorder,selector);
				if( i % 3 == 2 ){
					$("<div class='clearfix'></div>").appendTo(selector);
				}
			}
			update_ui();
			$(".workorders input").change(function(){
				update_ui();
			});
			$(".workorders select").change(function(){
				update_ui();
			});
		});
	}


	// DISPLAY FUNCTION
	ps.workorders.output_workorder_to=function(workorder,selector){
		$(frappe.render_template("workorder", workorder )).appendTo(selector);
	}
	
	function remove_employee_callback(time_sheet,employee){
	  return function(event){
	  }
	}
	function add_employee_callback(time_sheet){
	  return function(event){
	  }
	}
	var update_ui=function(){
		$.each($(".workorder"),function(i,o){
			var status=$(o).find(".status option:selected").text();
			$.each($(o).find(".checkbox"),function(ai,ao){
				$(ao).find("label").removeClass("line-through");
				if ($(ao).find("input").is(":checked")){
					$(ao).find("label").addClass("line-through");
				}
			});

			console.log(status);
			if(status=="Pending"){$(o).removeClass().addClass("panel panel-default workorder");}
			if(status=="Started"){$(o).removeClass().addClass("panel panel-warning workorder");}
			if(status=="Complete"){$(o).removeClass().addClass("panel panel-success workorder");}
			if(status=="Incomplete"){$(o).removeClass().addClass("panel panel-danger workorder");}
			
		});

	}


	frappe.ready(function() {
		frappe.templates.workorder=$('#workorder').html();
		ps.workorders.get_workorders("{{crew.name}}","{{today}}");
	});

})();