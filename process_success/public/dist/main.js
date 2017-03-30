
//PS core file first to load
//tools and what not

(function(){

	frappe.provide("ps");
	frappe.provide("ps.frappe");
	
	var get_all_employees="process_success.ps_core.api.get_all_employees";

	ps.init_ui=function(){
		var inputs=$('.timepicker').timepicker({
		    timeFormat: 'h:mmp',
		    // interval: 60,
		    // minTime: '10',
		    // maxTime: '6:00pm',
		    defaultTime: 'pm',
		    // startTime: '10:00',
		    dynamic: false,
		    dropdown: false,
		    scrollbar: false
		});
		inputs.trigger("change");
	};
	//----------------------------------------
	//   simplify Calls
	//   ps.set_handlers
	//   ps.call
	//----------------------------------------

	ps.set_handlers = function(success,fail) {
		var get_error_handler = function(default_message,success,fail) {
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
			};
		};

		var call_handelers = {
			200: function(data) {
				success(data);
			},
			401: get_error_handler(__("error")),
			417: get_error_handler(__("error"))
		};
		return call_handelers;
	};

	ps.call = function(args,success) {
		return frappe.call({
			type: "POST",
			args: args,
			freeze: true,
			statusCode: ps.set_handlers(success)
		});
	};


	// Turns things like s@gmail.com into escaped version to be used with j query selectors
	ps.escapeAttr=function ( str ) {
	    return str.replace( /(:|\.|\[|\]|,|=|@)/g, "\\$1" );

	};
	
	// probably outdated depreciated.   might move away form the original plugin
	//in favor of the standard type="time" feilds html5

	ps.preptime=function(time){
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

	ps.frappe.isready=0;

})();

//Init bit

frappe.ready(function() {
	ps.init_ui();
	ps.frappe.isready=1;
});


/* ------------------------------------------- 
-------------  SOCKET.IO CODE ----------------
--------------------------------------------- */
ps.get_host= function() { 
	var host = window.location.origin;
	if(window.dev_server) {
		var parts = host.split(":");
		var port = frappe.boot.socketio_port || '8000';
		if(parts.length > 2) {
			host =  parts[1];
		}
		host = host + ":" + port;
	}
	return host;
};
ps.hostReachable= function() {
	// Handle IE and more capable browsers
	var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
	var status;
	xhr.open( "HEAD", "//" + ps.get_host()+"/test.html", false );
	try {
	xhr.send();
	return ( xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304) );
	} catch (error) {
	return false;
	}
};

ps.online=ps.hostReachable();
ps.socket = {
	open_tasks: {},
	open_docs: [],
	init: function() {
		if (ps.socket.socket) {
			return;
		}

		//Enable secure option when using HTTPS
		if (window.location.protocol == "https:") {
   			ps.socket.socket = io.connect(ps.socket.get_host(), {secure: true});
		}
		else if (window.location.protocol == "http:") {
			ps.socket.socket = io.connect(ps.socket.get_host());
		}
		if (!ps.socket.socket) {
			console.log("Unable to connect to " + ps.socket.get_host());
			return;
		}

		ps.socket.socket.on('msgprint', function(message) {
			frappe.msgprint(message);
		});
		ps.socket.socket.on('reconnect', function(message) {
			frappe.msgprint("reconnected");
			ps.online=true;

		});
		ps.socket.socket.on('connect', function(message) {
			ps.online=true;
		});
		ps.socket.socket.on('disconnect', function(message) {
			frappe.msgprint("disconnect");
			ps.online=false;
		});
		//ps.socket.socket.emit('msgprint','load');
	},
	get_host: function() {
		var host = window.location.origin;
		if(window.dev_server) {
			var parts = host.split(":");
			var port = frappe.boot.socketio_port || '9000';
			if(parts.length > 2) {
				host = parts[0] + ":" + parts[1];
			}
			host = host + ":" + port;
		}
		return host;
	},
	subscribe: function(task_id, opts) {

	},
	process_response: function(data, method) {
		return;
	}
};
ps.socket.init();
frappe.ready(function() {
	
});
frappe.provide("ps.storage");

/*
	LOCAL STORAGE TOOL
	takes a object/JSON and turns it to a ID
	uses that json as a key
	adds an expiration to the item
	garbageCollect : garbage collects
*/
ps.storage={
	ident:"pstimed",
	generateKey:function(args,time){
		var expire = new Date().getTime()+(time * 60 * 60 * 1000);
		var key = this.ident+"?"+expire+"?"+md5(JSON.stringify(args));
		return key;
	},
	garbageCollect:function(){
		var removeKeys=[];
		if(localStorage.length>0){
			for (var i = 0; i < localStorage.length; i++){
    			var key=localStorage.key(i);
    			var keyarray=key.split("?");
    			if (keyarray.length==3){
    				var time=keyarray[1];
    				if(time < new Date().getTime()){
    					removeKeys.push(key);
    				}
    			}

			}
		}
		if(removeKeys.length>0){
			for(var y = 0; y < removeKeys.length; y++){
				localStorage.removeItem(removeKeys[y]);
			}
		}
	},
	store:function(args,value,time){
		if(typeof(time)=="undefined"){time=30;}
		var saveKey = this.generateKey(args,time);
		var checkhash=md5(JSON.stringify(args));
		var remove=[];
		for (var i = 0; i < localStorage.length; i++){
			var key=localStorage.key(i);
			var hash=key.split("?");
			if (hash.length==3){
				var thehash=hash[2];
				if ( hash[0]==this.ident&& thehash==checkhash){
					remove.push(key);
				}
			}
		}
		if(remove.length>0){
			for(var y = 0; y < remove.length; y++){
				localStorage.removeItem(remove[y]);
			}
		}
		this.garbageCollect();
		localStorage.setItem(saveKey,JSON.stringify(value));

	},
	get:function(args){
		var searchfor=md5(JSON.stringify(args));
		for (var i = 0; i < localStorage.length; i++){
			var key=localStorage.key(i);
			var hash=key.split("?");
			if (hash.length==3){
				var thehash=hash[2];
				if ( hash[0]==this.ident&& thehash==searchfor){
					var value=localStorage.getItem(key);
					if (value=="undefined"){
						return 0;
					}
					return JSON.parse(value);
				}
			}
		}
	},
	remove:function(args){
		var searchfor=md5(JSON.stringify(args));
		for (var i = 0; i < localStorage.length; i++){
			var key=localStorage.key(i);
			var hash=key.split("?");
			if (hash.length==3){
				var thehash=hash[2];
				if ( hash[0]==this.ident&& thehash==searchfor){
					localStorage.removeItem(key);
				}
			}
		}
	}
};
 //--------------------------------------
//       offline and live sync 
//            OBJECT TOOL 
//
// Hooks up to a doctyp with a getfunction, 
// and update function
// update function should take a json 
// representation of the returned get
//______________________________________

(function(){
	frappe.provide("ps.obj");

	ps.obj.init=function(){
		//object tool.
		//in Template all html should be wrapped in element with id of item.name
		//run a init and save the returned object::  var myWorkorders=ps.obj.init();
		//run a get with args to populate the obj::  myWorkorders.get(args,callback);
		//  myWorkorders.workorders={**your workorders**}
		//  Do manipulations directly on this object  myWorkorders.workorders[0].start=new Date......
		//  pass obj from itself to itself is the best use case
		var obj={};
		obj.get_function="";
		obj.update_function="";
		obj.doctype="";
		obj.items=[];
		obj.id="";
		obj.args={};
		obj.hasUpdates=0;
		obj.renderHook=function(){};
		obj.rendermode=0;

		obj.get=function(args,callback){
			//CHECK THE QUE FIRST
			if (typeof(args)=="undefined"){
				args={};
			}
			obj.args=args;
			obj.args.cmd=obj.get_function;
			//console.log(obj.args);
			obj.id=md5(JSON.stringify(obj.args));
			get_from_local(obj.args);

			console.log("ONLINE"+ps.online);
			if(ps.online){
				//is frappe ready?
				if(ps.frappe.isready){
					obj.updateQue(function(){get_from_server(obj.args,callback);});
				}
				else{
					frappe.ready(function(){
						obj.updateQue(function(){get_from_server(obj.args,callback);});
					});
				}
			}
			else{
				get_from_local(obj.args,callback);
			}
			return obj.items;
		};

		obj.update=function(item,success){
			updateStorage();
			var args={};
			args.cmd=obj.update_function;
			args.item=item;
			if (ps.online){
				console.log("________update__________");
				console.log(item);
				ps.call(args,function(data){
					ps.socket.socket.emit('update_item', {doctype:obj.doctype, item:item});
					if (typeof(success)!="undefined"){
						success();
					}
				});
			}
			else{
				var previousItems=ps.storage.get(obj.id+"que");
				if (typeof(previousItems)!="undefined"){
					var insert=1;
					for(var i = 0; i < previousItems.length; i++){
						if (previousItems[i]==item.name){
							insert=0;
						}
					}
					if(insert){
						previousItems.push(item.name);
					}

				}else{previousItems=[item.name];}
				ps.storage.store(obj.id+"que",previousItems);
				obj.hasUpdates=1;
			}
		};

		obj.updateQue=function(callback){
			var updateItems=ps.storage.get(obj.id+"que");
			function sucCallback(itemName,last){
				return function(){
					var updateItemsCB=ps.storage.get(obj.id+"que");
					var i=updateItemsCB.indexOf(itemName);
					updateItemsCB.splice(i,1);
					if(updateItemsCB.length===0){
						ps.storage.remove(obj.id+"que");
					}else{
						ps.storage.store(obj.id+"que",updateItemsCB);
					}
					if(last){callback();}
				};
			}
			if(ps.online){
				if(typeof(updateItems)!="undefined"){
					for(var i = 0; i < updateItems.length; i++){
						var updateItem=updateItems[i];
						var last=0;
						if (i==updateItems.length-1){last=1;}
						obj.update(obj.get_item(updateItem),sucCallback(updateItem,last));
					}
				}
				else{callback();}
			}
		};
		obj.reactSetup=function(callback){
			obj.renderHook=callback;
			for(var i = 0; i < obj.items.length; i++){ 
				var item=obj.items[i];
				console.log(obj.doctype+'_'+item.name);
				ps.socket.socket.on('update_'+obj.doctype+'_'+item.name, return_react_emit());
			}
		},
		obj.render=function(item,template,selector,bindings){
			obj.rendermode=1;
			$(frappe.render_template(template, item )).appendTo(selector);
			bindings(item.name);
			ps.socket.socket.on('update_'+obj.doctype+'_'+item.name, return_emit(template,selector,bindings));
		};
		obj.rerender=function(item,template,selector,bindings){
			$(frappe.render_template(template, item )).appendTo(selector);
			bindings(item.name,obj);
		};

		obj.derender=function(item){
			$("#" + item.name).remove();
		};
		obj.get_index_of_item= function(item_name){
			for (var i = 0; i < obj.items.length; i++){
				if (item_name==obj.items[i].name){
					return i;
				}
			}
		};

		obj.get_item = function(item_name){
			for (var i = 0; i < obj.items.length; i++){
				if (item_name==obj.items[i].name){
					return obj.items[i];
				}
			}
		};
		obj.sort=function(){
			if(typeof(obj.items)!="undefined" ){
				if(typeof(obj.items[0])!='undefined'){
					if (typeof(obj.items[0].priority)=="undefined"){

					}
					else{obj.items.sort(function(a, b){return a.priority-b.priority;});}
				}
			}
		};
		function return_emit(template,selector,bindings){
			return function(item_pushed) {
				var index=obj.get_index_of_item(item_pushed.name);
				obj.items[index]=item_pushed;
				if(obj.rendermode){
					obj.derender(item_pushed);
					obj.rerender(item_pushed,template,selector,bindings);
				}
				console.log("render hook");
				obj.renderHook();
			};
		}
		function return_react_emit(){
			return function(item_pushed) {
				var index=obj.get_index_of_item(item_pushed.name);
				obj.items[index]=item_pushed;
				obj.renderHook();
			};
		}

		function get_from_server(args,callback){
			ps.call(obj.args,function(data){
				set_items(obj.args,data.message);
				console.log(obj.args,data.message);
				if(typeof(callback)!='undefined'){callback();}
			});
		}

		function set_items(args,items){
			obj.items=items;
			obj.sort();
			ps.storage.store(args,items);
		}
		function updateStorage(){
			ps.storage.store(obj.args,obj.items);
		}

		function get_from_local(args,callback){
			var item_from_storage=ps.storage.get(obj.args);
			if( typeof(item_from_storage)=="undefined"){
				//failed to get items
				console.log("Get local failed");
			}
			else{set_items(args,item_from_storage);}
			if (typeof(callback)!="undefined"){callback();}
		}

		ps.socket.socket.on("reconnect",function(){
			location.reload();
		});

		return obj;
	};

})();

// DEFINE THE OBJECTS 

frappe.provide("ps");
ps.initWorkorder=function(){
	var workorders=ps.obj.init();
	workorders.doctype="work_orders";
	workorders.get_function="process_success.time_tracking.doctype.work_order.work_order.get_workorders";
	workorders.update_function="process_success.time_tracking.doctype.work_order.work_order.update_workorder";
	return workorders;
};

ps.initCurrentUser=function(){
	var userinfo=ps.obj.init();
	userinfo.doctype="Employee";
	userinfo.get_function="process_success.ps_core.api.get_current_users_info";
	userinfo.update_function="";
	return userinfo;
};


//can we make a general tool 
//that takes in a predefined doctype 
//but defaults to a general getdoc call
//the update function would need a legend to write
ps.initGeneral=function(){

};