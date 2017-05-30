function send(){
			var t = document.getElementById("type");
			var m = document.getElementById("message");

			frappe.call({
				method: "frappe.www.form_messages.enterOperation",
				args: {"typeM": t.options[t.selectedIndex].text, "message":m.value},
				callback: function(r){
					
				}
			});
			
		}