function findClient(){
		var new_tbody = document.createElement('div');
		new_tbody.setAttribute("id", "body1"); 
		var client = document.getElementById("client").value;
		{% for cont in SClient: %}
				//alert("if 1" + "{{cont['name']}}" + " " + client );
				if ("{{cont['name']}}" == client){
					createDivImage("{{cont['image']}}", new_tbody)
					createDiv("Full Name", "{{cont['customer_name']}}", new_tbody);	
					createDiv("Type", "{{cont['customer_type']}}", new_tbody);	
					createDiv("Status", "{{cont['status']}}", new_tbody);	
					createDiv("Tax ID", "{{cont['tax_id']}}", new_tbody);	
					createDiv("Address HTML", "{{cont['address_html']}}",new_tbody);	
					createDiv("Website", "{{cont['website']}}",new_tbody);
					
					createDiv("Credit Days", "{{cont['credit_days']}}",new_tbody)	
					createDiv("Credit Limit", "{{cont['Credit Limit']}}",new_tbody);	
					createDiv("Details", "{{cont['customer_details']}}",new_tbody);	
					createDiv("Comission Rate", "{{cont['default_commission_rate']}}",new_tbody);	
					
					createDiv("Lead", "{{cont['lead_name']}}",new_tbody);
					createDiv("Customer Group", "{{cont['customer_group_name']}}",new_tbody);
					createDiv("Territory", "{{cont['territory_name']}}",new_tbody);
					createDiv("Billing Currency", "{{cont['currency_name']}}",new_tbody);
					createDiv("Default Price List", "{{cont['price_list_name']}}",new_tbody);
					createDiv("Print Language", "{{cont['language_name']}}",new_tbody);
					createDiv("Sales Partner", "{{cont['partner_name']}}",new_tbody);
				}	
		{% endfor %}
		var titule = document.createElement("h3");
		var tituleContent = document.createTextNode("Vineyard History"); 
		titule.appendChild(tituleContent); 
		new_tbody.appendChild(titule);
		var vtab = document.createElement("TABLE"); 
		vtab.setAttribute("id", "tablepaging"); 
		createHeader("date",vtab);
		createHeader("vineyard",vtab);
		createHeader("address",vtab);
		{% for cont2 in Svineyard: %}
			if ("{{cont2['customer']}}" == client){
				row = document.createElement("tr");
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont2['att_date']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont2['vineyard_name']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont2['address']}}");
				row.appendChild(cell1);
				vtab.appendChild(row);
			}	
		{% endfor %}
		new_tbody.appendChild(vtab);
		var titule2 = document.createElement("h3");
		var tituleContent2 = document.createTextNode("Work History"); 
		titule2.appendChild(tituleContent2); 
		new_tbody.appendChild(titule2);
		var vtab2 = document.createElement("TABLE"); 
		//vtab2.setAttribute("id", "tablepaging"); 
		createHeader("id",vtab2);
		createHeader("Subject",vtab2);
		createHeader("Status",vtab2);
		createHeader("Priority",vtab2);
		createHeader("Expected Start Date",vtab2);
		createHeader("Expected Time (in hours)",vtab2);
		createHeader("Weight",vtab2);
		createHeader("Expected End Date",vtab2);
		createHeader("% Progress",vtab2);
		createHeader("Details",vtab2);
		createHeader("Actual Start Date (via Time Sheet)",vtab2);
		createHeader("Actual Time (in hours)",vtab2);
		createHeader("Actual End Date (via Time Sheet)",vtab2);
		createHeader("Total Costing Amount (via Time Sheet)",vtab2);
		createHeader("Review Date",vtab2);
		createHeader("Closing Date",vtab2);
		createHeader("Location",vtab2);
		{% for cont3 in Sattendance: %}
			if ("{{cont3['client']}}" == client){
				row = document.createElement("tr");
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['name']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['subject']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['status']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['priority']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['exp_start_date']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['expected_time']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['task_weight']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['exp_end_date']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['progress']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['description']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['act_start_date']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['actual_time']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['act_end_date']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['total_costing_amount']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['review_date']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['closing_date']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont3['location']}}");
				row.appendChild(cell1);
				vtab2.appendChild(row);
			}	
		{% endfor %}	
		new_tbody.appendChild(vtab2); 
		var everything = document.getElementById("everything");
		everything.appendChild(new_tbody);
		var old_tbody = document.getElementById("body1"); 
	 	//var old_tbody = document.getElementsByTagName("div").item(7);
	 	old_tbody.parentNode.replaceChild(new_tbody, old_tbody); 
	}	
	
	function createDivImage(data, new_tbody){
		var newDiv = document.createElement("div"); 		
		var elem = document.createElement("img");
		elem.src = data;
		//var newContent = document.createTextNode(type + ": " + data);
		newDiv.className = "profileImage";
		newDiv.appendChild(elem);
		//newDiv.appendChild(newContent); 
		new_tbody.appendChild(newDiv);
	}	 
	function createHeader (data, tab){
		var th = document.createElement("th"); 
		var newContent = document.createTextNode(data);
		th.appendChild(newContent); 
		tab.appendChild(th);
	}
   function createNewCell(cell1, content_cell){
    	textNode1 = document.createTextNode(content_cell);
    	cell1.appendChild(textNode1);
  	}
	function createDiv(type, data, new_tbody){
		var newDiv = document.createElement("div"); 
		var newContent = document.createTextNode(type + ": " + data); 
		newDiv.className = "infoDiv";
		newDiv.appendChild(newContent); 
		new_tbody.appendChild(newDiv);
	}