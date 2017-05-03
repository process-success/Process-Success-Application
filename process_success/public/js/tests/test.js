
(function(){
	var expect = chai.expect;
	var assert = chai.assert;

	describe('Cache and Offline Api Tool', function() {
		describe('Mocha and Chia Are working.', function() {
			it('Tests are working', function() {
				var x=1;
				expect(x).to.equal(1);
			});
		});

		//returns an emmit for new items created
		describe("new apiTool(filters,options,onchange)",function(){
			var filters={name:"derek"};
			// var setup={
			// 	doctype:"Testing",
			// 	get:"process_success.ps_core.api.get_all_full_doc",
			// 	update:"process_success.ps_core.api.get_all_full_doc",
			// 	create:"create_doc",
			// 	remove:"remove_doc",
			// };
			ps.store.clear("Testing");
			var setup={
				doctype:"Testing"
			};
			beforeEach(function() {

			});
			afterEach(function() {
			});

			it("apiTool new apiTool() requires a doctype",function(){
				var tool = new ps.apiTool({},{doctype:"notathinglol"});
				expect(tool.items).to.equal(null);
			});
			it("apiTool new apiTool() makes my.items avalible and servercall and triggers onchange null before cached",function(done){
				//need to use the  async
				var tool = new ps.apiTool({}, setup, onChange);
				expect(tool.items).to.equal(null);
				function onChange(){
					expect(tool.items[0].name).to.equal("perm");
					done();
				}

			});
			it("apiTool new apiTool() second call is cached", function(done){
				var tool = new ps.apiTool({}, setup, onChange);
				expect(tool.items[0].name).to.equal("perm");
				function onChange(){
					expect(tool.items[0].name).to.equal("perm");
					done();
				}
			});
			it("offline and goes online should trigger a call to server and onChange Function", function(done){
				ps.online=false;
				var tool = new ps.apiTool({}, setup, onChange);
				expect(tool.items[0].name).to.equal("perm");

				//Turn internet on after 500 milliseconds
				setTimeout(function(){
					ps.online=true;
					$(document).trigger("connected");
				}, 500);
				function onChange(){
					expect(tool.items[0].name).to.equal("perm");
					done();
				}
				//wait
				//
			});
		});
		describe("apiTool.create(item)",function(){
			beforeEach(function() {

			});
			afterEach(function() {
			});

			it("apiTool.create(item) should be able to get the new item and on change should trigger",function(){

			});

			it("apiTool.create(item) offline, new item is avalible when online the change is made to server and on change triggerd", function(){
			
			});
			
		});
		describe("apiTool.update(item)",function(){
			beforeEach(function() {

			});
			afterEach(function() {
			});

			it("apiTool.update(item) should be able to get the new item and on change should trigger",function(){
			
			});
			it("apiTool.update(item) offline, new item is avalible when online the change is made to server and on change triggerd", function(){
			
			});
		});
		describe("apiTool.remove(item_name)",function(){
			beforeEach(function() {

			});
			afterEach(function() {
			});

			it("apiTool.update(item) should be able to get the new item and on change should trigger",function(){
			
			});
			it("apiTool.update(item) offline, new item is avalible when online the change is made to server and on change triggerd", function(){
			
			});
			
		});



	});
})();