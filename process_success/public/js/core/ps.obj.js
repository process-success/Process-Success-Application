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
		if(this.api.get==this.default.get){
			getArgs.doctype=this.doctype;
		}

		this.items=this.storage.get(this.doctype, filters);
		//if online make a call to the server
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
		args.doctype=this.doctype;
		if (ps.online){
			ps.call(args,function(data){
				ps.socket.socket.emit('update_doc', {doctype:this.doctype, item:data.message});
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
		args.doctype=this.doctype;
		args.item=item;
		if (ps.online){
			ps.call(args,function(data){
				data.message.tempid=item.tempid;
				this.filterItem(data.message);
				if (typeof(callback)!= "undefined"){
					callback(data.message);
				}
				ps.socket.socket.emit('create_doc', {doctype:this.doctype, item:data.message});
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
	this.remove=function(name,callback){
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
		args.doctype=this.doctype;
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

