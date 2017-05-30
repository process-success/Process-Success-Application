//--------------------------------------
//       offline and live sync 
//            OBJECT TOOL 
//
// Hooks up to a doctyp with a getfunction, 
// and update function
// update function should take a json 
// representation of the returned get
//______________________________________

(function () {
	frappe.provide("ps.obj");

	ps.obj.init = function () {
		//object tool.
		//in Template all html should be wrapped in element with id of item.name
		//run a init and save the returned object::  var myWorkorders=ps.obj.init();
		//run a get with args to populate the obj::  myWorkorders.get(args,callback);
		//  myWorkorders.workorders={**your workorders**}
		//  Do manipulations directly on this object  myWorkorders.workorders[0].start=new Date......
		//  pass obj from itself to itself is the best use case
		var obj = {};
		obj.get_function = "";
		obj.update_function = "";
		obj.doctype = "";
		obj.items = [];
		obj.id = "";
		obj.args = {};
		obj.hasUpdates = 0;
		obj.rerenderHook = function () {};

		obj.get = function (args, callback) {

			//CHECK THE QUE FIRST
			if (typeof args == "undefined") {
				args = {};
			}
			obj.args = args;
			obj.args.cmd = obj.get_function;
			console.log(obj.args);
			obj.id = md5(JSON.stringify(obj.args));
			get_from_local(obj.args);
			console.log("ONLINE" + ps.online);
			if (ps.online) {
				obj.updateQue(function () {
					get_from_server(obj.args, callback);
				});
			} else {
				get_from_local(obj.args, callback);
			}
		};

		obj.update = function (item, success) {
			updateStorage();
			var args = {};
			args.cmd = obj.update_function;
			args.item = item;
			if (ps.online) {
				ps.call(args, function (data) {
					ps.socket.socket.emit('update_item', { doctype: obj.doctype, item: item });
					if (typeof success != "undefined") {
						success();
					}
				});
			} else {
				var previousItems = ps.storage.get(obj.id + "que");
				if (typeof previousItems != "undefined") {
					var insert = 1;
					for (var i = 0; i < previousItems.length; i++) {
						if (previousItems[i] == item.name) {
							insert = 0;
						}
					}
					if (insert) {
						previousItems.push(item.name);
					}
				} else {
					previousItems = [item.name];
				}
				ps.storage.store(obj.id + "que", previousItems);
				obj.hasUpdates = 1;
			}
		};

		obj.updateQue = function (callback) {
			var updateItems = ps.storage.get(obj.id + "que");
			function sucCallback(itemName, last) {
				return function () {
					var updateItemsCB = ps.storage.get(obj.id + "que");
					var i = updateItemsCB.indexOf(itemName);
					updateItemsCB.splice(i, 1);
					if (updateItemsCB.length === 0) {
						ps.storage.remove(obj.id + "que");
					} else {
						ps.storage.store(obj.id + "que", updateItemsCB);
					}
					if (last) {
						callback();
					}
				};
			}
			if (ps.online) {
				if (typeof updateItems != "undefined") {
					for (var i = 0; i < updateItems.length; i++) {
						var updateItem = updateItems[i];
						var last = 0;
						if (i == updateItems.length - 1) {
							last = 1;
						}
						obj.update(obj.get_item(updateItem), sucCallback(updateItem, last));
					}
				} else {
					callback();
				}
			}
		};

		obj.render = function (item, template, selector, bindings) {
			$(frappe.render_template(template, item)).appendTo(selector);
			bindings(item.name);
			ps.socket.socket.on('update_' + obj.doctype + '_' + item.name, return_emit(template, selector, bindings));
		};
		obj.rerender = function (item, template, selector, bindings) {
			$(frappe.render_template(template, item)).appendTo(selector);
			bindings(item.name, obj);
			obj.rerenderHook();
		};

		obj.derender = function (item) {
			$("#" + item.name).remove();
		};
		obj.get_index_of_item = function (item_name) {
			for (var i = 0; i < obj.items.length; i++) {
				if (item_name == obj.items[i].name) {
					return i;
				}
			}
		};

		obj.get_item = function (item_name) {
			for (var i = 0; i < obj.items.length; i++) {
				if (item_name == obj.items[i].name) {
					return obj.items[i];
				}
			}
		};
		obj.sort = function () {
			if (typeof obj.items != "undefined") {
				if (typeof obj.items[0] != 'undefined') {
					if (typeof obj.items[0].priority == "undefined") {} else {
						obj.items.sort(function (a, b) {
							return a.priority - b.priority;
						});
					}
				}
			}
		};
		function return_emit(template, selector, bindings) {
			return function (item_pushed) {
				console.log("Emit caught for " + item_pushed.name);
				var index = obj.get_index_of_item(item_pushed.name);
				obj.items[index] = item_pushed;
				obj.derender(item_pushed);
				obj.rerender(item_pushed, template, selector, bindings);
			};
		}

		function get_from_server(args, callback) {
			console.log(obj.args);
			ps.call(obj.args, function (data) {
				set_items(obj.args, data.message);
				console.log(data.message);
				if (typeof callback != 'undefined') {
					callback();
				}
			});
		}

		function set_items(args, items) {
			obj.items = items;
			obj.sort();
			ps.storage.store(args, items);
		}
		function updateStorage() {
			ps.storage.store(obj.args, obj.items);
		}

		function get_from_local(args, callback) {
			var item_from_storage = ps.storage.get(args);
			if (typeof item_from_storage == "undefined") {
				//failed to get items
				console.log("Get local failed");
			} else {
				set_items(args, item_from_storage);
			}
			if (typeof callback != "undefined") {
				callback();
			}
		}

		ps.socket.socket.on("reconnect", function () {
			//obj.updateQue();
		});

		return obj;
	};
})();
//# sourceMappingURL=ps.obj.js.map
