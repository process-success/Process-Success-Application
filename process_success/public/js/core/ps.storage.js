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