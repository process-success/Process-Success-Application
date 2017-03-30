frappe.provide("ps.storage");

/*
	LOCAL STORAGE TOOL
	takes a object/JSON and turns it to a ID
	uses that json as a key
	adds an expiration to the item
	garbageCollect : garbage collects
*/
ps.storage = {
	ident: "pstimed",
	generateKey: function (args, time) {
		var expire = new Date().getTime() + time * 60 * 60 * 1000;
		var key = this.ident + "?" + expire + "?" + md5(JSON.stringify(args));
		return key;
	},
	garbageCollect: function () {
		var removeKeys = [];
		if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
				var key = localStorage.key(i);
				var keyarray = key.split("?");
				if (keyarray.length == 3) {
					var time = keyarray[1];
					if (time < new Date().getTime()) {
						removeKeys.push(key);
					}
				}
			}
		}
		if (removeKeys.length > 0) {
			for (var y = 0; y < removeKeys.length; y++) {
				localStorage.removeItem(removeKeys[y]);
			}
		}
	},
	store: function (args, value, time) {
		if (typeof time == "undefined") {
			time = 30;
		}
		var saveKey = this.generateKey(args, time);
		var checkhash = md5(JSON.stringify(args));
		var remove = [];
		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			var hash = key.split("?");
			if (hash.length == 3) {
				var thehash = hash[2];
				if (hash[0] == this.ident && thehash == checkhash) {
					remove.push(key);
				}
			}
		}
		if (remove.length > 0) {
			for (var y = 0; y < remove.length; y++) {
				localStorage.removeItem(remove[y]);
			}
		}
		this.garbageCollect();
		localStorage.setItem(saveKey, JSON.stringify(value));
	},
	get: function (args) {
		var searchfor = md5(JSON.stringify(args));
		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			var hash = key.split("?");
			if (hash.length == 3) {
				var thehash = hash[2];
				if (hash[0] == this.ident && thehash == searchfor) {
					return JSON.parse(localStorage.getItem(key));
				}
			}
		}
	},
	remove: function (args) {
		var searchfor = md5(JSON.stringify(args));
		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			var hash = key.split("?");
			if (hash.length == 3) {
				var thehash = hash[2];
				if (hash[0] == this.ident && thehash == searchfor) {
					localStorage.removeItem(key);
				}
			}
		}
	}
};
//# sourceMappingURL=ps.storage.js.map
