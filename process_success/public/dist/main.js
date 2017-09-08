
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
						try {
							return JSON.parse(v).message;
						} catch (e) {
							return v;
						}
					}) || []).join('<br>') || default_message;
				}

				//frappe.msgprint(message);
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
	// args={};
	// args.cmd="process_success.vineyards.doctype.api.get_vineyard_tasks_by_workorder";
	// args.workorder="WO-0001";
	// ps.call(args,function(){console.log("hello")});

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

	ps.clone=function(obj) {
	    if (null == obj || "object" != typeof obj) return obj;
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	};
	ps.initProps=function(props,item){
		var returnProp={};
		for(var x=0; x < props.length; x++){
			returnProp[props[x]]=(typeof(item[props[x]])=="undefined")? "" :item[props[x]];
		}
		return returnProp;
	}
	ps.dateForUi=function(date){
		return moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY')
	}
	ps.dateForServer=function(date){
		return moment(date, 'MM/DD/YYYY').format('YYYY-MM-DD')
	}
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
	var parts = host.split(":");
	var port = frappe.boot.socketio_port || '8000';		
	if(parts.length >= 2) {
		host =  parts[1];
	}
	if(window.dev_server) {
		host = host + ":" + port;
	}
	return host;
};

// ps.checkOnline= function(callback) {
// 	$.ajax({
// 		url: '/test.html',
// 		success: function(result){
// 			console.log("ONLINE CHECK");
// 			ps.online=true;
// 			callback();
// 		},     
// 		error: function(result){
// 			ps.online=false;
// 		}
// 	});
// };
// ps.checkOnline(function(){});
// var x=performance.now();
// for (var i =0; i<=99; i++){
// 	ps.checkOnline(function(){});
// }
// ps.checkOnline(function(){console.log((x-performance.now())/101);});

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

// var x=performance.now();
// for (var i =0; i<=100; i++){
// 	console.log(ps.hostReachable());
// }
// console.log((x-performance.now())/101);




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
			//frappe.msgprint("reconnected");
			ps.onlineAlert();
			ps.online=true;
			$(document).trigger("connected");
		});
		ps.socket.socket.on('connect', function(message) {
			ps.onlineAlert();
			ps.online=true;
			$(document).trigger("connected");
		});
		ps.socket.socket.on('disconnect', function(message) {
			//frappe.msgprint("disconnect");
			ps.offlineAlert();
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

	Update Idea!  
	Base all on doctype rather than call
	each entry has an expire
	run a search and return only requested items
	like frappe.getdoc
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

ps.performance={
	now:function(){
		if(typeof(performance)!="undefined"){
			return performance.now();
		}
		else{
			console.log("performance unavalible");
			return 1;
		}
	},
};


ps.store={
	ident:"pstimed",
	lastCallSpeed: 0,
	generateExpireTime:function(time){
		var expire = new Date().getTime()+(time * 60 * 60 * 1000);
		return expire;
	},
	store:function(doctype,value,time){
		//takes time in hours for expire
		var t1 = ps.performance.now();
		if(typeof(time)=="undefined"){time=30;}
		var expire = this.generateExpireTime(time);
		var storageKey =this.ident+"?"+doctype;
		//allStored=JSON.parse(allStored);


		if (Array.isArray(value)){
			for (var i = 0; i < value.length; i++){
				var item= value[i];
				this.storeSingle(storageKey,item,time);
			}

		}
		else{
		 	this.storeSingle(storageKey,value,time);
		}
		var t2= ps.performance.now();
		this.lastCallSpeed=t2 - t1;

	},
	storeSingle:function(key, value, time){
		if(typeof(time)=="undefined"){time=30;}
		var expire=this.generateExpireTime(time);
		var allItems=localStorage.getItem(key);
		if(allItems !== null){
			allItems=JSON.parse(allItems);
			for (var i = 0; i < allItems.length; i++){
				var item= allItems[i];
				//if expired delete it
				if(item.expire < new Date().getTime()){
					allItems.splice(i,1);
					i--;
				}
				else{
					if( item.data.name == value.name){
						allItems.splice(i,1);
						i--;
					}
				}
			}
		}
		else{
			allItems=[];
		}
		var toStore= {expire: expire, data:value};
		allItems.push(toStore);
		localStorage.setItem(key,JSON.stringify(allItems));
	},
	get:function(doctype,filter){
		var t1 = ps.performance.now();
		var storageKey =this.ident+"?"+doctype;
		var allItems=localStorage.getItem(storageKey);

		if(allItems !== null){
			allItems=JSON.parse(allItems);
			var currentDate=new Date().getTime();
			var returnItems=[];
			for (var i = 0; i < allItems.length; i++){
				var item= allItems[i];
				//if expired delete it
				if(item.expire < currentDate){
					allItems.splice(i,1);
					i--;
				}
				else{
					var save=true;
					for (var property in filter) {
						if (filter.hasOwnProperty(property) || item.data.hasOwnProperty(property)) {
							if (item.data[property]!=filter[property]){
								save=false;
							}
						}
					}
					if(save){
						returnItems.push(item.data);
					}
				}
			}
			var t2= ps.performance.now();
			this.lastCallSpeed=t2 - t1;

			if(returnItems.length === 0){
				return null;
			}
			return returnItems;
		}else{
			var t2= ps.performance.now();
			this.lastCallSpeed=t2 - t1;
			return null;
		}
	},
	remove:function(doctype,name){
		var t1 = ps.performance.now();
		var storageKey =this.ident+"?"+doctype;
		var allItems=localStorage.getItem(storageKey);

		if(allItems !== null){
			allItems=JSON.parse(allItems);
			var currentDate=new Date().getTime();
			var returnItems=[];
			for (var i = 0; i < allItems.length; i++){
				var item= allItems[i];
				//if expired delete it
				if(item.expire < currentDate || item.data.name==name){
					allItems.splice(i,1);
					i--;
				}
			}
			localStorage.setItem(storageKey,JSON.stringify(allItems));
			var t2= ps.performance.now();
			this.lastCallSpeed=t2 - t1;
			return null;

		}else{
			var t2= ps.performance.now();
			this.lastCallSpeed=t2 - t1;
			return null;
		}
	},
	//filter={tempId:"1000000"}
	removeWithFilter:function(doctype,key,value){
		var t1 = ps.performance.now();
		var storageKey =this.ident+"?"+doctype;
		var allItems=localStorage.getItem(storageKey);

		if(allItems !== null){
			allItems=JSON.parse(allItems);
			var currentDate=new Date().getTime();
			var returnItems=[];
			for (var i = 0; i < allItems.length; i++){
				var item= allItems[i];
				//if expired delete it
				if(item.expire < currentDate || item.data[key]==value){
					allItems.splice(i,1);
					i--;
				}
			}
			localStorage.setItem(storageKey,JSON.stringify(allItems));
			var t2= ps.performance.now();
			this.lastCallSpeed=t2 - t1;
			return null;

		}else{
			var t2= ps.performance.now();
			this.lastCallSpeed=t2 - t1;
			return null;
		}
	},
	clear:function(doctype){
		var storageKey =this.ident+"?"+doctype;
		localStorage.removeItem(storageKey);
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

		obj.get=function(args,callback,fail){
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
					obj.updateQue(function(){get_from_server(obj.args,callback,fail);});
				}
				else{
					frappe.ready(function(){
						obj.updateQue(function(){get_from_server(obj.args,callback,fail);});
					});
				}
			}
			else{
				get_from_local(obj.args,callback);
			}
			return obj.items;
		};

		obj.update=function(item,success,after){
			updateStorage();
			var args={};
			args.cmd=obj.update_function;
			args.item=item;
			if (ps.online){

				ps.call(args,function(data){
					if (typeof(after)!='undefined' && after==1){
						var index=obj.get_index_of_item(item.name);
						ps.socket.socket.emit('update_item', {doctype:obj.doctype, item:data.message});
					}else{
						ps.socket.socket.emit('update_item', {doctype:obj.doctype, item:item});
					}

					if (typeof(success)!="undefined"){
						success(data.message);
					}
				});
			}
			else{
				obj.addUpdateQue(item);
			}
		};
		// obj.create=function(item,success,after){
		// 	var args={};
		// 	args.cmd=obj.create_function;
		// 	args.item=item;
		// 	if (ps.online){
		// 		ps.call(args,function(data){
		// 			if (typeof(after)!='undefined' && after==1){
		// 				var index=obj.get_index_of_item(item.name);
		// 				console.log(data);
		// 				ps.socket.socket.emit('update_item', {doctype:obj.doctype, item:data.message});
		// 			}else{
		// 				ps.socket.socket.emit('update_item', {doctype:obj.doctype, item:item});
		// 			}

		// 			if (typeof(success)!="undefined"){
		// 				success(data.message);
		// 			}
		// 		});
		// 	}

		// };
		obj.changed=function(item){
			ps.socket.socket.emit('update_item', {doctype:obj.doctype, item:item});
		};
		obj.addUpdateQue=function(item){
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
		//This needs to be able to handel adding and removing items, currently nope
		obj.reactSetup=function(callback){
			obj.renderHook=callback;
			if (typeof(obj.items)=="undefined"){}
			else{
				for(var i = 0; i < obj.items.length; i++){ 
					var item=obj.items[i];
					ps.socket.socket.on('update_'+obj.doctype+'_'+item.name, return_react_emit());
				}
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
				//console.log("render hook");
				obj.renderHook();
			};
		}
		function return_react_emit(){
			return function(item_pushed) {
				console.log("react emmit", item_pushed);
				var index=obj.get_index_of_item(item_pushed.name);
				obj.items[index]=item_pushed;
				obj.renderHook();
			};
		}

		function get_from_server(args,callback,fail){
			ps.call(obj.args,function(data){
				set_items(obj.args,data.message);
				// console.log("_________ps.obj From Server call_______________");
				// console.log(obj.args,data.message);
				// console.log("-----------------------------------------------");
				if(typeof(callback)!='undefined'){callback(data.message);}
			},function(){ 
				console.log("call fail callback");
				if(typeof(fail)!='undefined'){fail();}
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
			//location.reload();
		});

		return obj;
	};

})();


/*----------------------------
	UPDATER FOR ACTION QUE
-----------------------------*/

//offlineActionQue   :  {key:"" , type:create, doctype:doctype, args }
$(document).bind('connected',function(){
	function sucCallback(item,tempid){
		return function(data){
			var responceItem=data.message;
			//types
			//create:  item
			//update:  item
			//remove:  name
			var actionType= item.type;
			var doctype= item.doctype;
			var requestObject= item.args;
			var key= item.key;
			var allItems=JSON.parse(localStorage.getItem("actionQue"));
			if(actionType=="create"){
				responceItem.tempid=tempid;
			}
			for(var i = 0; i < allItems.length; i++){
				var storedItem =allItems[i];
				if (key==storedItem.key){
					allItems.splice(i,1);
					localStorage.setItem("actionQue", JSON.stringify(allItems));
				}
			}
			var emitObj={};
			emitObj.doctype=doctype;
			var methods={
				create:function(){
					emitObj.item=responceItem;
					ps.socket.socket.emit("create_doc",emitObj);
				},
				update:function(){
					emitObj.item=responceItem;
					ps.socket.socket.emit("update_doc",emitObj);
				},
				remove:function(){
					emitObj.name=requestObject.name;
					ps.socket.socket.emit("remove_doc",emitObj);
				}
			}[actionType]();
		};
	}
	var allItems = localStorage.getItem("actionQue");
	allItems = JSON.parse(allItems);
	if(ps.online && allItems!==null){
		if(typeof(allItems)!="undefined"){
			for(var i = 0; i < allItems.length; i++){
				var item =allItems[i];
				if (item.action=="create"){
					var tempid=item.args.item.tempid;
					delete item.args.item.tempid;
					ps.call(item.args,sucCallback(item,tempid));
				}else{

					ps.call(item.args,sucCallback(item));
				}
			}
		}
	}
});


/* _______________________________________
			OFFLINE TOOL
			     V2

---------------------------------------------*/

/*-------------------------------
  Offline Api tool V2
-------------------------------*/

//actionQue   :  {key:"" , type:create, doctype:doctype, args }
ps.apiTool=function(filters, options, onChange){
	//construction
	if(typeof(options.doctype)=="undefined"){
		console.log("ps.apiTool options must have a doctype defined");
		return null;
	}
	this.onChange=onChange;
	this.multiDoc=false;
	if (typeof(options.doctype)=="object"){
		this.multiDoc=true;
	}
	this.doctype=options.doctype;

	this.default={
		get:"process_success.ps_core.api.get_all_full_doc",
		update:"process_success.ps_core.api.update_doc",
		create:"process_success.ps_core.api.create_doc",
		remove:"process_success.ps_core.api.remove_doc",
		call:ps.call,
		offline:false
	};
	this.call=(typeof(options.call)=="undefined")? this.default.call:options.call;
	this.api={
		get: (typeof(options.get)=="undefined")? this.default.get:options.get,
		update:(typeof(options.update)=="undefined")? this.default.update:options.update,
		create:(typeof(options.create)=="undefined")? this.default.create:options.create,
		remove:(typeof(options.remove)=="undefined")? this.default.remove:options.remove
	};

	this.offlineEnabled=(typeof(options.remove)=="undefined")? this.default.offline:options.offline;
	this.items=[];
	this.filters=filters;
	this.storage=ps.store;
	this.id="";

	this.init =function(){
		var getArgs={};
		getArgs.filters=this.filters;
		getArgs.cmd=this.api.get;
		//if(this.api.get==this.default.get){
			getArgs.doctype=this.doctype;
		//}

		if(this.multiDoc){
			for (var i = 0; i < this.doctype.length; i++) {
				this.items.push.apply(this.items, this.storage.get(this.doctype[i], filters));
			}
		}else{
			this.items=this.storage.get(this.doctype, filters);
		}

		//if online make a call to the server
		//console.log(getArgs);
		if(ps.online){
			//is frappe ready?
			if(ps.frappe.isready){
				this.get_from_server(getArgs);
			}
			else{
				frappe.ready(function(){
					this.get_from_server(getArgs);
				});
			}
		}
		else{
			$(document).bind('connected',function(){
				this.get_from_server(getArgs);
			}.bind(this));
		}
		//Handel offline
	};


	/* --------------------------------
		UPDATE FUNCTION
		with emit for catching changes
	*/
	// tool.items[a].thing=5;
	// tool.update(tool.items[a]);
	this.update=function(item,callback){
		//match the item with items
		this.filterItem(item);
		var args={};
		args.cmd=this.api.update;
		args.item=item;
		//console.log(args.doctype);
		if(!("doctype" in item)){
			args.doctype=this.doctype;
		}else{
			args.doctype=item.doctype;
		}
		if (ps.online){
			ps.call(args,function(data){
				ps.socket.socket.emit('update_doc', {doctype:item.doctype, item:data.message});
				this.filterItem(data.message);
				if (typeof(callback)!= "undefined"){
					callback(data.message);
				}
			}.bind(this));
		}
		else{
			this.addToQue("update",args);
		}
	};

	//Checks if the item meets specs for this setup
	//adds removes updates acordingly
	this.filterItem=function(item){
		var valid=true;
		for (var property in this.filters) {
			if (this.filters.hasOwnProperty(property) || item.hasOwnProperty(property)) {
				if (item[property]!=this.filters[property]){
					valid=false;
				}
			}
		}
		//If there are ITEMS
		if(this.items != null){
			var index=this.get_index_of_item(item.name);
			if (valid === false){
				if(index!=-1){
					//invalid and needs removed
					this.items.splice(index,1);
					return 0;
				}
			}else if(index >= 0){
				//valid and in array
				this.items[index]=item;
				this.setItems(this.items);
			}else{
				//valid and cant find it in array
				if(item.hasOwnProperty("tempid") && item.hasOwnProperty("name")){
					//has a temp id and a name
					var indexOfTemp=this.get_temp_id_index(item.tempid);
					//localstorage
					//delete the temp from local
					this.storage.removeWithFilter(this.doctype,"tempid",item.tempid);
					this.storage.store(this.doctype,item);
					delete item.tempid;
					if (indexOfTemp!= -1){
						this.items[indexOfTemp]=item;
					}else{
						this.items.push(item);
					}
				}else{
					this.items.push(item);
				}
				this.setItems(this.items);
			}
		}else if(valid){
			this.items=[];
			this.items.push(item);
			this.setItems(this.items);
		}
		this.setItems(this.items);
	}.bind(this);



	/* ---------------------------------
		CREATE FUNCTION
		with emit for catching changes
	*/

	this.create=function(item,callback){
		//check if its already been added
		//Create a temp ID so that when a real object is returned you replace the temp id
		item.tempid=Math.random()*(10000000000000000);
		//this.filterItem(item);
		var args={};
		args.cmd=this.api.create;
		if(item.doctype){
			args.doctype=item.doctype;
		}else{
			args.doctype=this.doctype;
		}
		args.item=item;
		if (ps.online){
			ps.call(args,function(data){
				data.message.tempid=item.tempid;
				this.filterItem(data.message);
				if (typeof(callback)!= "undefined"){
					callback(data.message);
				}
				ps.socket.socket.emit('create_doc', {doctype:args.doctype, item:data.message});
			}.bind(this));
		}
		else{
			this.addToQue("create",args);
		}
	};


	/* -------------------------------
		REMOVE FUNCTION
		with emit for catching changes
	*/
	this.remove=function(name,callback,doctype){
		//check if its already been removed
		var index=this.get_index_of_item(name);

		if(index!=-1){
			this.items.splice(index,1);
		}
		this.storage.remove(this.doctype,name);
		this.setItems(this.items);

		var args={};
		args.cmd=this.api.remove;
		args.name=name;
		if(doctype){
			args.doctype=doctype;
		}else{args.doctype=this.doctype;}
		if (ps.online){
			ps.call(args,function(data){
				ps.socket.socket.emit('remove_doc', {doctype:this.doctype, name:name});
				if (typeof(callback)!= "undefined"){
					callback(data.message);
				}
			}.bind(this));
		}
		else{
			this.addToQue("remove", args);
		}
		if(typeof(this.onChange)!='undefined'){this.onChange();}
	};
	this.delete=function(item,callback){
		//check if its already been removed
		var name=item.name
		var index=this.get_index_of_item(name);

		if(index!=-1){
			this.items.splice(index,1);
		}
		this.storage.remove(item.doctype,name);
		this.setItems(this.items);

		var args={};
		args.cmd=this.api.remove;
		args.name=name;
		args.doctype=item.doctype;

		if (ps.online){
			ps.call(args,function(data){
				ps.socket.socket.emit('remove_doc', {doctype:this.doctype, name:name});
				if (typeof(callback)!= "undefined"){
					callback(data.message);
				}
			}.bind(this));
		}
		else{
			this.addToQue("remove", args);
		}
		if(typeof(this.onChange)!='undefined'){this.onChange();}
	};

	// EMMITS
	ps.socket.socket.on('remove_'+this.doctype,function(name){
		var index=this.get_index_of_item(name);
		if(index!=-1){
			this.items.splice(index,1);
		}
		this.setItems(this.items);
	}.bind(this));
	ps.socket.socket.on('update_'+this.doctype,function(item){
		this.filterItem(item);
	}.bind(this));
		//  Catch Creates!
	//this.filterItem=this.filterItem.bind(this);
	ps.socket.socket.on('create_'+ this.doctype,function(item){
		this.filterItem(item);
	}.bind(this));


	this.removeListeners=function(){
		ps.socket.socket.off('remove_'+this.doctype,function(name){});
		ps.socket.socket.off('update_'+this.doctype,function(item){});
			//  Catch Creates!
		//this.filterItem=this.filterItem.bind(this);
		ps.socket.socket.off('create_'+ this.doctype,function(item){});
	};
	this.addToQue=function(action,args){
		//add action to que
		//create the object
		//actionQue   :  {key:"" , type:create, doctype:doctype, args }
		var allItems = JSON.parse(localStorage.getItem("actionQue"));
		var actionItem={};
		actionItem.doctype=this.doctype;
		actionItem.type=action;
		actionItem.key=md5(JSON.stringify([actionItem, allItems]));
		actionItem.args=args;
		//get que and add new item
		if (allItems===null){
			allItems=[];
		}
		allItems.push(actionItem);
		localStorage.setItem("actionQue", JSON.stringify(allItems));
	};
	this.get_from_server=function(args){
		ps.call(args,function(data){
			if (typeof(data.message)=="undefined"){
				this.items=null;
				if(typeof(this.onChange)!='undefined'){this.onChange();}
				return null;
			}
			this.setItems(data.message);
		}.bind(this),function(){ 
			console.log("call fail callback");
		});
	};
	this.setItems=function(items){
		if (items!==null){
			this.items=items;
			this.storage.store(this.doctype,items);
			if(typeof(this.onChange)!='undefined'){this.onChange();}
		}
	};
	this.get_item = function(item_name){
		for (var i = 0; i < this.items.length; i++){
			if (item_name==this.items[i].name){
				return obj.items[i];
			}
		}
	};
	this.get_index_of_item= function(item_name){
		for (var i = 0; i < this.items.length; i++){
			if (item_name==this.items[i].name){
				return i;
			}
		}
		return -1;
	};
	this.get_temp_id_index= function(tempid){
		for (var i = 0; i < this.items.length; i++){
			if(this.items[i].hasOwnProperty(tempid)){
				if (tempid==this.items[i].tempid){
					return i;
				}
			}
		}
		return -1;
	};

	this.init();
};


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

ps.initTimeSheets=function(){
	var obj=ps.obj.init();
	obj.doctype="Time_Sheet";
	obj.get_function='process_success.time_tracking.doctype.time_sheet.time_sheet.get_make_days_timesheets';
	obj.update_function="process_success.time_tracking.doctype.time_sheet.time_sheet.update_timesheet";
	obj.add_employee_to_sheet="";
	return obj;
};
ps.apiSetup={};
ps.apiSetup.workOrders={
	doctype:'work_order',
	get:'process_success.time_tracking.doctype.work_order.work_order.update_workorder'
};

ps.apiSetup.workOrders={
	doctype:'work_order',
	update:'process_success.time_tracking.doctype.work_order.work_order.update_workorder'
};
ps.apiSetup.vineyardTasks={
	doctype:['Spraying','Pruning', 'Harvest', 'Bird Nets', 'Watering','Canopy']
};
ps.apiSetup.doctype={
	doctype:'DocType',
	get:'process_success.ps_core.api.get_all_full_doc',
	update:'none'
};



	// ps.timesheet.remove_employee_from_sheet=function(time_sheet,employee){
	// 	args={};
	// 	args.cmd=remove_employee_from_sheet;
	// 	args.employee=employee;
	// 	args.time_sheet=time_sheet;
	// 	//console.log(employee);
	// 	ps.call(args,function(data){
	// 		$("#"+ ps.escapeAttr(employee)).remove();
	// 	});
	// };
	// ps.timesheet.add_employee_to_sheet=function(time_sheet,employee){
	// 	args={};
	// 	args.cmd=add_employee_to_sheet;
	// 	args.employee=employee;
	// 	args.save=1;
	// 	args.time_sheet=time_sheet;
	// 	ps.call(args,function(data){
	// 		//console.log(data);
	// 	 	$("#"+ ps.escapeAttr(employee)).remove();
	// 	 	employee_container=data.message[0];
	// 	 	employee_container.time_unit_obj=data.message[1];
	// 	 	add_employee_ui(employee_container,data.message[0].parent);
	// 	 	ps.init_ui();
	// 	});

	// }
ps.initEmployeeList=function(){
	var obj=ps.obj.init();
	obj.doctype="Employee";
	obj.get_function="process_success.ps_core.api.get_all_employees";
	obj.update_function="";
	return obj;
};


ps.initGeneral=function(){

};

frappe.provide("ps.user");
ps.user.avatar = function(user, css_class, title) {


	user_info = {
		image: frappe.get_gravatar(user.name),
		fullname: user.full_name,
		abbr: frappe.get_abbr(user.full_name),
		color: frappe.get_palette(user.full_name)
	};

	if(!title) {
		title = user_info.fullname;
	}

	if(!css_class) {
		css_class = "avatar-small";
	}

	if(user_info.image) {

		var image = (window.cordova && user_info.image.indexOf('http')===-1) ?
			frappe.base_url + user_info.image : user_info.image;

		return repl('<span class="avatar %(css_class)s" title="%(title)s">'+
			'<span class="avatar-frame" style="background-image: url(%(image)s)"'+
			 'title="%(title)s"></span></span>', {
				image: image,
				title: title,
				abbr: user_info.abbr,
				css_class: css_class
			});
	} else {
		var abbr = user_info.abbr;
		if(css_class==='avatar-small' || css_class=='avatar-xs') {
			abbr = abbr.substr(0, 1);
		}
		return repl('<span class="avatar %(css_class)s" title="%(title)s">'+
			'<div class="standard-image" style="background-color: %(color)s;">%(abbr)s</div></span>', {
				title: title,
				abbr: abbr,
				css_class: css_class,
				color: user_info.color
			});
	}
};
// this.currentUser=ps.initCurrentUser();
// this.currentUser.get({},function(items){
// 	if(this.currentUser.items.username=="Guest"){
// 		window.location = "/login";
// 	}else{
// 		$(document).trigger("userLoaded");
// 	}
// }.bind(this));
