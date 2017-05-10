function send(){
			var c = document.getElementById("code");
			var n = document.getElementById("name");
			var a = document.getElementById("amount");
			var d = document.getElementById("desc");
			var u = document.getElementById("unit");

			frappe.call({
				method: "frappe.www.consumables2.enterOperation",
				args: {"code": c.value,"amount":a.value, "description": d.value, "cons_name": n.value, "unit":u.value},
				callback: function(r){
					
				}
			});
			
		}