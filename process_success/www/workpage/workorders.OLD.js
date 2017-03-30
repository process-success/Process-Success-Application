//  Days workpage Code
(function(){
	//------------------------------------
	//   Render Days Workorders
	//    Beast mode function
	//     heavy lisfting for view
	//-------------------------------------
	var render_days_workorders=function(daysWorkorders,selector){
		//days workorders is the workorders object with functions
		//make 2 sections complete/incomplete and pending/created/started
		var workorderArea=$(selector);
		workorderArea.append("<div class='inprogress'><h4>In Progress</h4></div>");
		workorderArea.append("<div class='clearfix'></div><div class='completed'><h4>Complete</h4></div>");

		for (var i = 0; i < daysWorkorders.items.length; i++){
			workorder=daysWorkorders.items[i];
			var container_id=workorder.name+"_container";
			//Where does it go?
			if(workorder.status=="incomplete"||workorder.status=="complete"){
				$(".completed").append("<div class='col-md-4 col-sm-4' data-priotity='"+workorder.priority+"' id='"+ container_id +"'></div>");
				daysWorkorders.render(workorder,"workorder","#"+container_id);
				//work_order_bindings(workorder.name,daysWorkorders);
			}
			else{
				$(".inprogress").append("<div class='col-md-4 col-sm-4' data-priotity='"+workorder.priority+"' id='"+ container_id +"'></div>");
				daysWorkorders.render(workorder,"workorder","#"+container_id,work_order_bindings);
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
				console.log("LOGGED");
				var target=$(event.target);
				var workorder_name=target.parent().parent().attr("data-workorder");
				var task_index=parseInt(target.parent().parent().attr("data-subidx"))-1;
				var workorder_index=daysWorkorders.get_index_of_item(workorder_name);
				if (target.is(":checked")){
					target.parent().addClass("line-through");
					daysWorkorders.items[workorder_index].subtask[task_index].status=1;
				}
				else{
					target.parent().removeClass();
					daysWorkorders.items[workorder_index].subtask[task_index].status=0;
				}
				daysWorkorders.update(daysWorkorders.items[workorder_index]);
			});

			$(".workorders #" + workorder_name +" select").change(function(event){
				var target=$(event.target);
				var workorder_name=target.attr("data-workorder");
				var workorder_index=daysWorkorders.get_index_of_item(workorder_name);
				var workorder=$("#"+workorder_name);
				var status=target.find("option:selected").text();
				if(status=="Pending"){
					workorder.removeClass().addClass("panel panel-default workorder");
				}
				if(status=="Started"){
					workorder.removeClass().addClass("panel panel-warning workorder");
					var dt = new Date();
					var start = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
					daysWorkorders.items[workorder_index].start=start;
				}
				if(status=="Complete"){
					workorder.removeClass().addClass("panel panel-success workorder");
					var dt = new Date();
					var end = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
					daysWorkorders.items[workorder_index].end=end;
				}
				if(status=="Incomplete"){
					workorder.removeClass().addClass("panel panel-danger workorder");
				}
				daysWorkorders.items[workorder_index].status=status;
				daysWorkorders.update(daysWorkorders.items[workorder_index]);
			});
		}
	};

	frappe.ready(function() {
		frappe.templates.workorder=$('#workorder').html();
		var wo_selector=".workorders";
		//if offline
			//Make sure you have gotten todays data
			//else not display an error and skip the loading
		var currentUser=ps.initCurrentUser();
		var daysWorkorders=ps.initWorkorder();
		if(frappe.user_id=="Guest"){window.location = "/login";}
		else{
			currentUser.get({},function(){
				var user=currentUser.items;
				if(user.username=="Guest"){
					window.location = "/login";
				}
				$(".username").append(user.current_user.full_name);
				$(".today").append(user.today);
				var wo={};
				if (user.crew=='none'){
					$(wo_selector).append("No Workorders");
				}
				else{
					//has crew
					wo.crew=user.crew;
					wo.date=user.today;
					console.log(wo);
					daysWorkorders.get(wo, workorderCallback);
				}
			});
		}

		function workorderCallback(){
			//console.log(daysWorkorders.items);
			if(typeof(daysWorkorders.items)=="undefined"){
				$(wo_selector).append("No Workorders");
			}
			else{
				render_days_workorders(daysWorkorders,wo_selector);
			}
		}
	});

})();