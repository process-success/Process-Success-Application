function send(){
			var t = document.getElementById("type");
			var m = document.getElementById("message");

			frappe.call({
				method: "frappe.www.form_messages9.enterOperation",
				args: {"typeM": t.options[t.selectedIndex].text, "message":m.value},
				callback: function(r){
					
				}
			});
			
		}