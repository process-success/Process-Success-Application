console.log("HELLO");

// args={};
// args.cmd="process_success.ps_core.api.get_all_full_doc";
// args.doctype="Issue";
// args.filters={title:"hello"};
// frappe.ready(function(){
// 	ps.call(args, function(data){
// 	})
// });



//pass it an onChange()

//requires doctype
//call function
ps.apiTool=function(filters, options, onChange){
	//construction
	if(typeof(options.doctype)=="undefined"){
		console.log("ps.apiTool options must have a doctype defined");
		return null;
	};

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
	this.args={};


	this.init =function(){


	};
	this.update=function(){
	};
	this.create=function(){
	};
	this.remove=function(){
	};

	//cunstructor!
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

}


ps.storage2={
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
		if(allItems != null){
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
	get:function(doctype,filter,args){
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

			if(returnItems.length == 0){
				return null;
			}
			return returnItems;

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