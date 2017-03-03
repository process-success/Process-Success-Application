function send(){
			var t = document.getElementById("title");
			var m = document.getElementById("message");

			frappe.call({
				method: "frappe.www.form_templates3.enterOperation",
				args: {"title": t.value, "message":m.value},
				callback: function(r){
					
				}
			});
			
		}