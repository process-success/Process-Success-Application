console.log("HELLO");

args={};
args.cmd="process_success.ps_core.api.get_all_full_doc";
args.doctype="Issue";
args.filters={title:"hello"};
frappe.ready(function(){
	ps.call(args, function(data){
		alert(data.message);
	})
});
