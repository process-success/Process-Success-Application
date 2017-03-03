function send(){
			var d = document.getElementById("desc");
			var p = document.getElementById("person");
			var e = document.getElementById("prio");
			var date = document.getElementById("due_date");

			frappe.call({
				method: "frappe.www.to_do.toDo",
				args: {"desc":d.value, "person":p.options[p.selectedIndex].value, "prio": e.options[e.selectedIndex].text, "date": date.value},
				callback: function(r){
				}
			});
			
		}