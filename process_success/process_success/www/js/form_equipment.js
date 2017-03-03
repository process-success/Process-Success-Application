function send(){
			var c = document.getElementById("code");
			var n = document.getElementById("name");
			var s = document.getElementById("status");
			var d = document.getElementById("desc");

			frappe.call({
				method: "frappe.www.form_equipment3.enterOperation",
				args: {"code": c.value,"description": d.value, "status":s.options[s.selectedIndex].text, "item_name": n.value},
				callback: function(r){
					
				}
			});
			
		}