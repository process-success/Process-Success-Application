function send(){
			var d = document.getElementById("code");
			var p = document.getElementById("person");
			var e = document.getElementById("operation");
			var date = document.getElementById("date");

			frappe.call({
				method: "frappe.www.check_tools.enterOperation",
				args: {"op": e.options[e.selectedIndex].text, "itemCode":d.options[d.selectedIndex].value, "person":p.value, "date": date.value},
				callback: function(r){
					
				}
			});
			
		}