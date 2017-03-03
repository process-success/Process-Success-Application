function send(){
			var d = document.getElementById("code");
			var p = document.getElementById("trans");
			var date = document.getElementById("date");

			frappe.call({
				method: "frappe.www.document_assets.enterOperation",
				args: {"code": d.options[d.selectedIndex].text,"trans":p.options[p.selectedIndex].text, "date": date.value},
				callback: function(r){
					
				}
			});
			
		}