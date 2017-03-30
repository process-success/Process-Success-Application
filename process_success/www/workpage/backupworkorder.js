(function(){
	frappe.provide("ps.workorders");

	ps.workorders.initWorkorders=function(){
		//Workorder tool.
		//run a init and save the returned object::  var myWorkorders=initWorkorders();
		//run a get with args to populate the workorders::  myWorkorders.get_workorders(args,callback);
		//  myWorkorders.workorders={**your workorders**}
		//  Do manipulations directly on this object  myWorkorders.workorders[0].start=new Date......
		//  pass workorders from itself to itself is the best use case

		var get_workorders="process_success.time_tracking.doctype.work_order.work_order.get_workorders";
		var update_workorder="process_success.time_tracking.doctype.work_order.work_order.update_workorder";
		var local_crew="";
		var local_date="";

		wo={};
		wo.workorders={};
		wo.id="";
		wo.args={};

		wo.get_workorders=function(args,callback){
			args.cmd=get_workorders;
			this.id=md5(JSON.stringify(args));
			this.args=args;
			console.log("ONLINE"+ps.online);

			if(ps.online){
				workorders_from_server(args,callback);
			}
			else{
				workorders_from_local(args,callback);
			}
		};

		wo.update_workorder=function(workorder){
			var args={};
			args.cmd=update_workorder;
			args.workorder=workorder;
			ps.call(args,function(data){
				ps.socket.socket.emit('update_workorder', workorder);
			});
		};

		wo.render_workorder=function(workorder,template,selector,bindings){
			$(frappe.render_template(template, workorder )).appendTo(selector);
			bindings(workorder.name,wo);
			ps.socket.socket.on('update_workorder_'+workorder.name, return_emmit(template,selector,bindings));
		};
		wo.rerender_workorder=function(workorder,template,selector,bindings){
			$(frappe.render_template(template, workorder )).appendTo(selector);
			bindings(workorder.name,wo);
		};

		wo.derender_workorder=function(workorder){
			$("#" + workorder.name).remove();
		};
		wo.get_index_workorder= function(workorder_name){
			for (var i = 0; i < this.workorders.length; i++){
				if (workorder_name==this.workorders[i].name){
					return i;
				}
			}
		};

		wo.get_workorder = function(workorder_name){
			for (var i = 0; i < this.workorders.length; i++){
				if (workorder_name==this.workorders[i].name){
					return this.workorders[i];
				}
			}
		};
		function return_emmit(template,selector,bindings){
			return function(workorder_pushed) {
				console.log("Emit caught for " +workorder_pushed.name);
				var index=wo.get_index_workorder(workorder_pushed.name);
				wo.workorders[index]=workorder_pushed;
				wo.derender_workorder(workorder_pushed);
				wo.rerender_workorder(workorder_pushed,template,selector,bindings);
			};
		}
		function sort_workorders(){
			wo.workorders.sort(function(a, b){return a.priority-b.priority;});
		}
		function workorders_from_server(args,callback){
			ps.call(args,function(data){
				set_workorders(args,data.message);
				callback();
			});
		}

		function set_workorders(args,workorders){
			wo.workorders=workorders;
			sort_workorders();
			ps.storage.store(args,workorders);
		}

		function workorders_from_local(args,callback){
			var workorders_storage=ps.storage.get(args);
			console.log(workorders_storage);
			if( typeof(workorders_storage)=="undefined"){
				//failed to get workorders
			}
			callback();
		}


		return wo;
	};

})();


//  Days workpage Code
(function(){

	var render_days_workorders=function(daysWorkorders,selector){
		//days workorders is the workorders object with functions
		//make 2 sections complete/incomplete and pending/created/started
		var workorderArea=$(selector);
		workorderArea.append("<div class='inprogress'><h4>In Progress</h4></div>");
		workorderArea.append("<div class='clearfix'></div><div class='completed'><h4>Complete</h4></div>");

		for (var i = 0; i < daysWorkorders.workorders.length; i++){
			workorder=daysWorkorders.workorders[i];
			var container_id=workorder.name+"_container";
			//Where does it go?

			if(workorder.status=="incomplete"||workorder.status=="complete"){
				$(".completed").append("<div class='col-md-4 col-sm-4' data-priotity='"+workorder.priority+"' id='"+ container_id +"'></div>");
				daysWorkorders.render_workorder(workorder,"workorder","#"+container_id);
				//work_order_bindings(workorder.name,daysWorkorders);
			}
			else{
				$(".inprogress").append("<div class='col-md-4 col-sm-4' data-priotity='"+workorder.priority+"' id='"+ container_id +"'></div>");
				daysWorkorders.render_workorder(workorder,"workorder","#"+container_id,work_order_bindings);
				//work_order_bindings(workorder.name,daysWorkorders);
			}
			//CLEAR FIX    maybe set height on subtask to handel 4

			// if( i % 3 == 2 ){
			// 	$("<div class='clearfix'></div>").appendTo(selector);
			// }
		}
		
		function work_order_bindings(workorder_name){
			var item=$(".workorders #" + workorder_name+" input");
			$(".workorders #" + workorder_name +" input").change(function(event){
				var target=$(event.target);
				var workorder_name=target.parent().parent().attr("data-workorder");
				var task_index=parseInt(target.parent().parent().attr("data-subidx"))-1;
				var workorder_index=daysWorkorders.get_index_workorder(workorder_name);
				if (target.is(":checked")){
					target.parent().addClass("line-through");
					daysWorkorders.workorders[workorder_index].subtask[task_index].status=1;
				}
				else{
					target.parent().removeClass();
					daysWorkorders.workorders[workorder_index].subtask[task_index].status=0;
				}
				daysWorkorders.update_workorder(daysWorkorders.workorders[workorder_index]);
			});

			$(".workorders #" + workorder_name +" select").change(function(event){
				var target=$(event.target);
				var workorder_name=target.attr("data-workorder");
				var workorder_index=daysWorkorders.get_index_workorder(workorder_name);
				var workorder=$("#"+workorder_name);
				var status=target.find("option:selected").text();
				if(status=="Pending"){
					workorder.removeClass().addClass("panel panel-default workorder");
				}
				if(status=="Started"){
					workorder.removeClass().addClass("panel panel-warning workorder");
					var dt = new Date();
					var start = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
					daysWorkorders.workorders[workorder_index].start=start;
				}
				if(status=="Complete"){
					workorder.removeClass().addClass("panel panel-success workorder");
					var dt = new Date();
					var end = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
					daysWorkorders.workorders[workorder_index].end=end;
				}
				if(status=="Incomplete"){
					workorder.removeClass().addClass("panel panel-danger workorder");
				}
				daysWorkorders.workorders[workorder_index].status=status;
				daysWorkorders.update_workorder(daysWorkorders.workorders[workorder_index]);
			});

		}



	};

	frappe.ready(function() {
		frappe.templates.workorder=$('#workorder').html();
		var daysWorkorders=ps.workorders.initWorkorders(rerenderAction);
		args={};
		args.crew="{{crew.name}}";
		args.date="{{today}}";
		var wo_selector=".workorders";
		//if offline
			//Make sure you have gotten todays data
			//else not display an error and skip the loading
		//init workorders (selector, crew, date)
		//init timesheets (selector, crew, date)
		daysWorkorders.get_workorders(args,function(){
			console.log(daysWorkorders.workorders);
			if(typeof(daysWorkorders.workorders)=="undefined"){
				$(wo_selector).append("No Workorders");
			}
			else{
				render_days_workorders(daysWorkorders,wo_selector);
			}
		});
	});

})();