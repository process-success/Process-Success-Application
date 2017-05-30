
//PS core file first to load
//tools and what not

(function(){

	frappe.provide("ps");
	frappe.provide("ps.frappe");
	
	var get_all_employees="process_success.ps_core.api.get_all_employees";

	ps.init_ui=function(){

	};
	//----------------------------------------
	//   simplify Calls
	//   ps.set_handlers
	//   ps.call
	//----------------------------------------
	ps.alert={};
	ps.alert.config={
		fadeIn:200,
		fadeOut:600,
		showFor:2000
	};
	ps.successAlert=function(msg){
		$(".success-text").html(" "+msg);
		var alert=$("#alerts #alert-success");
		alert.fadeIn(ps.alert.config.fadeIn);
		setTimeout(function(){
		  alert.fadeOut(ps.alert.config.fadeOut);
		}, ps.alert.config.showFor);

	};
	ps.failAlert=function(msg){
		$(".fail-text").html(" "+msg);
		var alert=$("#alerts #alert-fail");
		alert.fadeIn(ps.alert.config.fadeIn);
		setTimeout(function(){
		  alert.fadeOut(ps.alert.config.fadeOut);
		}, ps.alert.config.showFor);
	};
	ps.offlineAlert=function(msg){
		$(".fail-text").html(" You are now in offline mode.");
		var alert=$("#alerts #alert-offline");
		alert.fadeIn(ps.alert.config.fadeIn);
	};
	ps.onlineAlert=function(msg){
		$(".fail-text").html(" "+msg);
		var alert=$("#alerts #alert-offline");
		alert.fadeOut(ps.alert.config.fadeOut);
	};
	ps.set_handlers = function(success,fail) {
		var get_error_handler = function(default_message,fail) {
			return function(xhr, data) {
				if(xhr.responseJSON) {
					data = xhr.responseJSON;
				}

				var message = default_message;
				
				if (data._server_messages) {
					message = ($.map(JSON.parse(data._server_messages || '[]'), function(v) {
						// temp fix for messages sent as dict
						console.log(v);
						try {
							return JSON.parse(v).message;
						} catch (e) {
							return v;
						}
					}) || []).join('<br>') || default_message;
				}

				//frappe.msgprint(message);
				console.log(message);
				if(typeof(fail)!="undefined"){
					fail();
				}
			};
		};

		var call_handelers = {
			200: function(data) {
				success(data);
			},
			401: get_error_handler(__("error"),fail),
			417: get_error_handler(__("error"),fail),
			404: get_error_handler(__("error"),fail),
			400: get_error_handler(__("error"),fail)
		};
		return call_handelers;
	};

	ps.call = function(args,success,fail) {
		return frappe.call({
			type: "POST",
			args: args,
			freeze: true,
			statusCode: ps.set_handlers(success,fail)
		});
	};


	// Turns things like s@gmail.com into escaped version to be used with j query selectors
	ps.escapeAttr=function ( str ) {
	    return str.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );

	};
	
	// probably outdated depreciated.   might move away form the original plugin
	//in favor of the standard type="time" feilds html5

	ps.am_to_numeric=function(time){
		var finaltime="";
		var timearray=time.split(":");
		var am=timearray[1].split("A");
		if(am.length==1){
			var pm=timearray[1].split("P");
			finaltime=(parseInt(timearray[0]) + 12).toString() +":"+ pm[0] + ":00";
		}else{
			finaltime=timearray[0]+":"+am[0]+":00";
		}
		return finaltime;
	};
	ps.time_add_digits=function(time){
		var timearr=time.split(':');
		if(timearr.length==2){
			return timearr[0]+":"+timearr[1]+":00";
		}
		else{return time;}
	};
	ps.time_add_front_zero=function(time){
		if(typeof(time)!="undefined"){
			var timearr=time.split(':');
			var returnTime="";
			for(var i = 0; i < timearr.length; i++){
				var digit=timearr[i];
				if(digit.length==1){
					digit="0"+digit;
				}
				if(i==0){returnTime+=digit;}
				else{returnTime+=":"+digit;}
			}
			return returnTime;
		}
	};


	ps.frappe.isready=0;

})();

//Init bit

frappe.ready(function() {
	ps.init_ui();
	ps.frappe.isready=1;
});

