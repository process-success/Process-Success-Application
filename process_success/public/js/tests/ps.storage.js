
(function(){
var expect = chai.expect;
var assert = chai.assert;

//Storage tests

var testdoc1= {name:"derek", last:"brenner", team:"red", class:"novice"};
var testdocChanged= {name:"derek", last:"brenner", team:"blue", class:"novice"};
var testdoc2= {name:"ted", last:"worker",team:"red", class:"expert"};
var testdoc3= {name:"billy", last:"breaker",team:"red", class:"expert"};
var testdoc4= {name:"jim", last:"joe",team:"blue", class:"expert"};
var testdoc5= {name:"randy", last:"recked",team:"blue", class:"novice"};
var allDoc = [testdoc1, testdoc2,testdoc3,testdoc4,testdoc5];
var doctype= "testing";
var storage= ps.storage2;



describe('ps.storage', function() {
	describe('Mocha and Chia Are working.', function() {
		it('Tests are working', function() {
			var x=1;
			expect(x).to.equal(1);
		});
	});
	describe("Create and get a new ps.storage doctype",function(){

		var itemkey=storage.ident+"?"+ doctype;
		beforeEach(function() {
			var itemkey=storage.ident+"?"+ doctype;
			localStorage.removeItem(itemkey);
		});
		afterEach(function() {
			var itemkey=storage.ident+"?"+ doctype;
			localStorage.removeItem(itemkey);
		});


		it("ps.storage is an object",function(){
			expect(storage).to.be.a("object");
		});
		it("should start empty", function(){
			var empty = localStorage.getItem(itemkey);
			expect(empty).to.equal(null);
			console.log(itemkey)
			
		});
		it("storage.store",function(){
			storage.store(doctype,testdoc1,1);
			var item=JSON.parse(localStorage.getItem(itemkey));
			expect(item[0].data.name).to.equal(testdoc1.name);
			expect(item[0].data.last).to.equal(testdoc1.last);
		});
		it("storage.store call twice: 2 seperate elements should be saved in local.",function(){
			storage.store(doctype,testdoc1,1);
			storage.store(doctype,testdoc2,1);
			var items=JSON.parse(localStorage.getItem(itemkey));
			expect(items).to.have.lengthOf(2);
			for (var i = 0; i < items.length; i++){
				item=items[i];
				expect(item.data.name==testdoc1.name||item.data.name==testdoc2.name).to.equal(true);
			}
			//expect(item.data.name).to.equal(testdoc1.name);
			//expect(item.data.last).to.equal(testdoc1.last);
		});
		it("storage.store call twice with same object: should only store single.",function(){
			storage.store(doctype,testdoc1,1);
			storage.store(doctype,testdoc1,1);
			var items=JSON.parse(localStorage.getItem(itemkey));
			expect(items).to.have.lengthOf(1);
		});
		it("storage.store (Update) call twice with same name but difrent value: should only store single with updated feilds.",function(){
			storage.store(doctype,testdoc1,1);
			var items=JSON.parse(localStorage.getItem(itemkey));
			expect(items[0].data.team).to.equal("red");
			storage.store(doctype,testdocChanged,1);
			items=JSON.parse(localStorage.getItem(itemkey));
			expect(items).to.have.lengthOf(1);
			expect(items[0].data.team).to.equal("blue");
		});
		it("storage.store store multiple objects with single call",function(){
			storage.store(doctype,[testdoc1, testdoc2],1);
			var items=JSON.parse(localStorage.getItem(itemkey));
			expect(items).to.have.lengthOf(2);
			for (var i = 0; i < items.length; i++){
				item=items[i];
				expect(item.data.name==testdoc1.name||item.data.name==testdoc2.name).to.equal(true);
			}
			expect(items[0].data.name).to.not.equal(items[1].data.name);

		});
		it("storage.store duplicate objects with single call: should only store one",function(){
			storage.store(doctype,[testdoc1, testdoc1],1);
			var items=JSON.parse(localStorage.getItem(itemkey));
			expect(items).to.have.lengthOf(1);
		});
		it("Garbage collect: making an item with -1 time should be anavalible after the storage is touched",function(){
			storage.store(doctype,testdoc1,-1);
			storage.store(doctype,testdoc2,1);
			var items=JSON.parse(localStorage.getItem(itemkey));
			console.log(items);
			expect(items).to.have.lengthOf(1);
			expect(items[0].data.name).to.equal(testdoc2.name);
		});
	});
		
	describe("storage.get ",function(){
		var itemkey=storage.ident+"?"+ doctype;
		beforeEach(function() {
			localStorage.removeItem(itemkey);
			storage.store(doctype,allDoc,1);
		});
		afterEach(function() {
			localStorage.removeItem(itemkey);
		});

		
		var itemkey=storage.ident+"?"+ doctype;

		it("storage.get an object that does not exist returns null",function(){
			var item=storage.get(doctype,{name:"nobody"});
			expect(item).to.equal(null);
			console.log( "storage :"+ storage.lastCallSpeed + " Milliseconds");
		});
		it("storage.get just doctype, return all items",function(){
			var item=storage.get(doctype);
			expect(item).to.have.lengthOf(5);
			console.log( "storage :"+ storage.lastCallSpeed + " Milliseconds");
		});
		it("storage.get an object with one instance returns array with single object",function(){
			var item=storage.get(doctype,{name:"derek"});
			expect(item).to.have.lengthOf(1);
			expect(item[0].name).to.equal("derek");
			console.log( "storage :"+ storage.lastCallSpeed + " Milliseconds");
		});
		it("storage.get when called expired object is deleted",function(){
			storage.store(doctype,testdoc1,-1);
			var item=storage.get(doctype,{name:"derek"});
			expect(item).to.equal(null);
			console.log( "storage :"+ storage.lastCallSpeed + " Milliseconds");
		});

		it("get multiple objects with a filter",function(){
			var items=storage.get(doctype,{team:"red"});
			expect(items).to.have.lengthOf(3);
			expect(items[0].team).to.equal("red");
			for (var i = 0; i < items.length; i++){
				item=items[i];
				expect(item.team).to.equal("red");
			}
			console.log( "storage :"+ storage.lastCallSpeed + " Milliseconds");
		});
		it("get multiple objects with multiple filters",function(){
			var items=storage.get(doctype,{team:"red", class:"expert"});
			expect(items).to.have.lengthOf(2);
			console.log( "storage :"+ storage.lastCallSpeed + " Milliseconds");
			for (var i = 0; i < items.length; i++){
				item=items[i];
				expect(item.team).to.equal("red");
				expect(item.class).to.equal("expert");
			}

		});
		it("get single object with multiple filters",function(){
			var items=storage.get(doctype,{team:"red", class:"novice"});
			expect(items).to.have.lengthOf(1);
			expect(items[0].name).to.equal("derek");
			console.log( "storage :"+ storage.lastCallSpeed + " Milliseconds");
		});

		it("delete an object",function(){
			storage.clear(doctype);
			var item=storage.get(doctype);
			expect(item).to.equal(null);
		});

	});

});

})();



