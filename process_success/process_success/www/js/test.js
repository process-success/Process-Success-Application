function send(){
			var d = document.getElementById("code");
			var p = document.getElementById("amount");
			var date = document.getElementById("date");

			frappe.call({
				method: "frappe.www.test1.enterOperation",
				args: {"code": d.options[d.selectedIndex].value,"amount":p.value, "date": date.value},
				callback: function(r){
					
				}
			});
			
		}