console.log("HELLO");

args={};
args.cmd="process_success.ps_core.api.get_all_full_doc";
args.doctype="Testing";
args.filters={};
frappe.ready(function(){
	ps.call(args, function(data){
		//alert(JSON.stringify(data.message));
	})
});




/*----------------------------
	UPDATER FOR ACTION QUE
-----------------------------*/

//offlineActionQue   :  {key:"" , type:create, doctype:doctype, args }
$(document).bind('connected',function(){


	function sucCallback(item,last){
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
					emitObj.item=requestObject.item;
					ps.socket.socket.emit("create_doc",emitObj);
				},
				update:function(){
					emitObj.item=requestObject.item;
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
				ps.call(args,sucCallback(item));
			}
		}
	}
});

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
		update:"process_success.ps_core.api.get_all_full_doc",
		create:"create_doc",
		remove:"remove_doc",
		call:ps.call,
		offline:false
	};
	this.call=(typeof(options.call)=="undefined")? this.default.call:options.call;
	this.api={
		get: (typeof(options.get)=="undefined")? this.default.get:options.get,
		update:(typeof(options.update)=="undefined")? this.default.update:options.update,
		create:(typeof(options.get)=="undefined")? this.default.create:options.create,
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
	this.update=function(item){
		//match the item with items
		this.filterItem(item);
		var args={};
		args.cmd=this.api.update;
		args.item=item;
		if (ps.online){
			ps.call(args,function(data){
				ps.socket.socket.emit('update_doc', {doctype:this.doctype, item:item});
			});
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
			if (filters.hasOwnProperty(property) || item.hasOwnProperty(property)) {
				if (item[property]!=filter[property]){
					valid=false;
				}
			}
		}
		var index=this.get_index_of_item(item.name);
		if (valid === false){
			if(index!=-1){
				this.items.splice(index,1);
			}
		}else if(index >= 0){
			this.items[index]=item;
		}else{ this.items.push(item);}
		this.setItems(this.items);
	};

	ps.socket.socket.on('update_'+this.doctype,function(item){
		this.filterItem(item);
	});

	/* ---------------------------------
		CREATE FUNCTION
		with emit for catching changes
	*/

	this.create=function(item){
		//check if its already been added
		this.filterItem(item);
		var args={};
		args.cmd=this.api.create;
		args.item=item;
		if (ps.online){
			ps.call(args,function(data){
				ps.socket.socket.emit('create_doc', {doctype:this.doctype, item:item});
			});
		}
		else{
			this.addToQue("create",args);
		}
	};
	//  Catch Creates!
	ps.socket.socket.on('create_'+ this.doctype,function(item){
		this.filterItem(item);
	});
	/* -------------------------------
		REMOVE FUNCTION
		with emit for catching changes
	*/
	this.remove=function(name){
		//check if its already been removed
		var index=this.get_index_of_item(item.name);
		//remove it if not
		if(index!=-1){
			this.items.splice(index,1);
		}
		this.setItems(this.items);

		var args={};
		args.cmd=this.api.remove;
		args.name=name;
		if (ps.online){
			ps.call(args,function(data){
				ps.socket.socket.emit('remove_doc', {doctype:this.doctype, name:name});
			});
		}
		else{
			this.addToQue("remove", args);
		}
	};
	ps.socket.socket.on('remove_'+this.doctype,function(name){
		var index=this.get_index_of_item(item.name);
		if(index!=-1){
			this.items.splice(index,1);
		}
		this.setItems(this.items);
	});



	this.addToQue=function(action,args){
		//add action to que
		//create the object
		//actionQue   :  {key:"" , type:create, doctype:doctype, args }
		var allItems = JSON.parse(localStorage.getItem("actionQue"));
		var actionItem={};
		actionItem.doctype=this.doctype;
		actionItem.args=args;
		actionItem.type=action;
		actionItem.key=md5(JSON.stringify([actionItem, allItems]));

		//get que and add new item
		if (allItems===null){
			allItems=[];
		}
		allItems.push(actionItem);
		localStorage.setItem("actionQue", JSON.stringify(allItems));
	};
	this.get_from_server=function(args){
		ps.call(args,function(data){
			this.setItems(data.message);
		}.bind(this),function(){ 
			console.log("call fail callback");
		});
	};
	this.setItems=function(items){
		this.items=items;
		this.storage.store(this.doctype,items);
		if(typeof(this.onChange)!='undefined'){this.onChange();}
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

	this.init();
};





ps.setup={};
ps.setup.issue={
	get:"",
	update:"",
	create:"",
	remove:"",
};

// var issueTool = new ps.apiTool({}, onChange);

// var a= new ps.apiTool("one");
// var b= new ps.apiTool("two");




//pstimed?[doctype]    :    [ {expire:[], data:[data] } ]}

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
	clear:function(doctype){
		var storageKey =this.ident+"?"+doctype;
		localStorage.removeItem(storageKey);
	}
};