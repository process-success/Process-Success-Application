src = "https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js";
	$( document ).ready(function() {
		var name = localStorage.getItem('name');
		var title = localStorage.getItem('title');
		$("#title").text("List of sub tasks for work order: " + title);
		//ajax call to frappe rest api Remote Procedure Calls (RPC) https://frappe.github.io/frappe/user/en/guides/integration/rest_api
		$.ajax
            ({
                type: "GET",
                url: "http://54.202.147.200:8000/api/method/process_success.ps_core.doctype.work_order.work_order.get_sub_tasks?work_order_name=" + name,
                dataType: 'json',
                async: false,
                success: function (result) {
					for (var i in result.message.sub_tasks){ 
						$("#body1").append($("<tr id = "+ i +"></tr>"))
						$("#"+ i).append($("<td>"+ result.message.sub_tasks[i].task +"</td>"));
						$("#"+ i).append($("<td>"+ result.message.sub_tasks[i].status +"</td>"));
						$("#"+ i).append($("<td>"+ result.message.sub_tasks[i].creation +"</td>"));
					}
				}				
			});
	});
