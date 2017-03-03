function newVineyard(){
		var path = "/vineyard_form.html";
		window.location.href = path;
	}	
	
	function newWorkOrder(){
		var path = "/workOrder_form.html";
		window.location.href = path;
	}	
	
	var rows_per_page = {{pages}}
	var pager = new Pager('tablepaging', rows_per_page);
	pager.init();
	pager.showPageNav('pager', 'pageNavPosition');
	pager.showPage(1);
	
	function find(){
		
      	var new_tbody = document.createElement('tbody');
		var vYard = document.getElementById("vineyard").value;
		var sel = document.createElement("select");
		var sel2 = document.createElement("select");
		var myarray=new Array()
			myarray[0] ="January"
			myarray[1] ="February"
			myarray[2] ="March"
			myarray[3] ="April"
			myarray[4] ="May"
			myarray[5] ="June"
			myarray[6] ="July"
			myarray[7] ="August"
			myarray[8] ="September"
			myarray[9] ="October"
			myarray[10] ="November"
			myarray[11] ="December"
		var myarray2=new Array()
			myarray2[0] ="Summer"
			myarray2[1] ="Autumn"
			myarray2[2] ="Winter"
			myarray2[3] ="Spring"
		sel.name = "Monthly";
		sel2.name = "Season";
		for (i=1; i<13; i++) {
			opt = document.createElement('option');
			opt.value = i;
			opt.innerHTML = myarray[i-1];
			sel.appendChild(opt);
		}
		for (i=0; i<4; i++) {
			opt = document.createElement('option');
			opt.value = i;
			opt.innerHTML = myarray2[i];
			sel2.appendChild(opt);
		}
		sel.setAttribute("id", "Monthly");
		sel2.setAttribute("id", "Season");
		//sel.selectedIndex = "0";
		var sdiv = document.getElementById("selects");
		var old_selects = document.getElementById("Monthly");
		var old_selects2 = document.getElementById("Season");
		if(!(!old_selects)){
			sdiv.removeChild(old_selects);
		}
		if(!(!old_selects2)){
			sdiv.removeChild(old_selects2);
		}
      	//old_selects.parentNode.replaceChild(sel, old_selects);
		sdiv.appendChild(sel);
		sdiv.appendChild(sel2);
		{% for cont in Sjoined:%}
			if ("{{cont['vineyard']}}" === vYard){
				row = document.createElement("tr");

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['vineyard']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['vineyard_name']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['address']}}");
				row.appendChild(cell1);
				cell1= document.createElement("td");
				createNewCell(cell1,"{{cont['name']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['subject']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['project']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['status']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['priority']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['exp_start_date']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['expected_time']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['task_weight']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['exp_end_date']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['progress']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['description']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['depends_on_tasks']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['act_start_date']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['actual_time']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['act_end_date']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['total_costing_amount']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['total_expense_claim']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['total_billing_amount']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['review_date']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['closing_date']}}");
				row.appendChild(cell1);

				cell1= document.createElement("td");
				createNewCell(cell1, "{{cont['company']}}");
				row.appendChild(cell1);

				new_tbody.appendChild(row);
			}
		{% endfor %}
		
		//var sel= document.getElementById("Monthly");
		//sel.addEventListener("change", findMonthly());
		//var sel2= document.getElementById("Season");
		//sel2.addEventListener("change", findSeason()); 
		var old_tbody = document.getElementsByTagName("tbody").item(0);;
		old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
		var rows_per_page = {{pages}}
		var pager = new Pager('tablepaging', rows_per_page);
		pager.init();
		pager.showPageNav('pager', 'pageNavPosition');
		pager.showPage(1);
  }
		
	function findSeason() {
  	var new_tbody = document.createElement('tbody');
		var vYard = document.getElementById("vineyard").value;
		var season = document.getElementById("Season").value;
		{% for cont in Sjoined:%}
			if ("{{cont['vineyard']}}" === vYard){
				var d="{{cont['exp_start_date']}}";
				//alert(getSeason(d) + " " + season);
				if(getSeason(d)==season){
					row = document.createElement("tr");

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['vineyard']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['vineyard_name']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['address']}}");
					row.appendChild(cell1);
					cell1= document.createElement("td");
					createNewCell(cell1,"{{cont['name']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['subject']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['project']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['status']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['priority']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['exp_start_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['expected_time']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['task_weight']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['exp_end_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['progress']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['description']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['depends_on_tasks']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['act_start_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['actual_time']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['act_end_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['total_costing_amount']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['total_expense_claim']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['total_billing_amount']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['review_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['closing_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['company']}}");
					row.appendChild(cell1);

					new_tbody.appendChild(row);
				}
			}
		{% endfor %}
      var old_tbody = document.getElementsByTagName("tbody").item(0);
      old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
      var rows_per_page = {{pages}}
      var pager = new Pager('tablepaging', rows_per_page);
      pager.init();
      pager.showPageNav('pager', 'pageNavPosition');
      pager.showPage(1);
	};	
	
	function findMonthly(){
      	var new_tbody = document.createElement('tbody');
		var vYard = document.getElementById("vineyard").value;
		var month = document.getElementById("Monthly").value;
		{% for cont in Sjoined:%}
			if ("{{cont['vineyard']}}" === vYard){
				var d="{{cont['exp_start_date']}}";
				var res = d.split("-");
				var resS0 = res[1].split("0");
				//alert(resS0[1] + " " + month);
				if(resS0[1]==month){
					row = document.createElement("tr");

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['vineyard']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['vineyard_name']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['address']}}");
					row.appendChild(cell1);
					cell1= document.createElement("td");
					createNewCell(cell1,"{{cont['name']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['subject']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['project']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['status']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['priority']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['exp_start_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['expected_time']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['task_weight']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['exp_end_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['progress']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['description']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['depends_on_tasks']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['act_start_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['actual_time']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['act_end_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['total_costing_amount']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['total_expense_claim']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['total_billing_amount']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['review_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['closing_date']}}");
					row.appendChild(cell1);

					cell1= document.createElement("td");
					createNewCell(cell1, "{{cont['company']}}");
					row.appendChild(cell1);

					new_tbody.appendChild(row);
				}
			}
		{% endfor %}
      var old_tbody = document.getElementsByTagName("tbody").item(0);
      old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
      var rows_per_page = {{pages}}
      var pager = new Pager('tablepaging', rows_per_page);
      pager.init();
      pager.showPageNav('pager', 'pageNavPosition');
      pager.showPage(1);
  }

  function createNewCell(cell1, content_cell){
    textNode1 = document.createTextNode(content_cell);
    cell1.appendChild(textNode1);
  }

	function getSeason(date){
		var res = date.split("-");
		switch(res[1]) {
			case "01":
				return 2;
				break;
			case "02":
				return 2;
				break;
			case "03":
				if(res[2]<21){
					return 2;
				}else{
					return 3;
				}
				break;
			case "04":
				return 3;
				break;
			case "05":
				return 3;
				break;
			case "06":
				if(res[2]<21){
					return 3;
				}else{
					return 0;
				}
				break;
			case "07":
				return 0;
				break;
			case "08":
				return 0;
				break;
			case "09":
				if(res[2]<21){
					return 0;
				}else{
					return 1;
				}
				break;	
			case "10":
				return 1;
				break;
			case "11":
				return 1;
				break;
			case "12":
				if(res[2]<21){
					return 1;
				}else{
					return 2;
				}
				break;	
		} 
	}

  function Pager(tableName, itemsPerPage) {
	this.tableName = tableName;
	this.itemsPerPage = itemsPerPage;
	this.currentPage = 1;
	this.pages = 0;
	this.inited = false;
	this.showRecords = function(from, to) {
		var rows = document.getElementById(tableName).rows;
		// i starts from 1 to skip table header row
		for (var i = 1; i < rows.length; i++) {
			if (i < from || i > to)
				rows[i].style.display = 'none';
			else
				rows[i].style.display = '';
		}

	}
	this.showPage = function(pageNumber) {
		if (! this.inited) {
			alert("not inited");
			return;
		}
		var oldPageAnchor = document.getElementById('pg'+this.currentPage);
		oldPageAnchor.className = 'pg-normal';
		this.currentPage = pageNumber;
		var newPageAnchor = document.getElementById('pg'+this.currentPage);
		newPageAnchor.className = 'pg-selected';
		var from = (pageNumber - 1) * itemsPerPage + 1;
		var to = from + itemsPerPage - 1;
		this.showRecords(from, to);
	}
	this.prev = function() {
		if (this.currentPage > 1)
		this.showPage(this.currentPage - 1);
	}
	this.next = function() {
		if (this.currentPage < this.pages) {
		this.showPage(this.currentPage + 1);
		}
	}
	this.init = function() {
		var rows = document.getElementById(tableName).rows;
		var records = (rows.length - 1);
		this.pages = Math.ceil(records / itemsPerPage);
		this.inited = true;
	}
	this.showPageNav = function(pagerName, positionId) {
		if (! this.inited) {
			alert("not inited");
			return;
		}
		var element = document.getElementById(positionId);
		var pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal"> « Prev </span> ';
		for (var page = 1; page <= this.pages; page++)
			pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span> ';
		pagerHtml += '<span onclick="'+pagerName+'.next();" class="pg-normal"> Next »</span>';
		element.innerHTML = pagerHtml;
	}

}
