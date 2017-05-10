
(function(){
	var expect = chai.expect;
	var assert = chai.assert;
	var should = chai.should();

	describe('Cache and Offline Api Tool', function() {
		ps.store.clear("Testing");
		var setup={
			doctype:"Testing"
		};
		this.timeout(5000);
		describe('Mocha and Chia Are working.', function() {
			it('Tests are working', function() {
				var x=1;
				expect(x).to.equal(1);
			});
		});

		//returns an emmit for new items created
		describe("new apiTool(filters,options,onchange)",function(){

			//var tool = new ps.apiTool({}, setup, function(){});
			before(function(done){args={};
				args.cmd="process_success.ps_core.api.clear_test_db";
				ps.call(args, function(data){
					args2={};
					args2.cmd="process_success.ps_core.api.create_doc";
					args2.doctype="Testing";
					args2.item={
						first_name:"perm",
						last_name: "perm",
						team: "red",
						skill:"Expert"
					};
					ps.call(args2, function(data){
						done();
					});
				});
			});
			beforeEach(function() {

			});
			afterEach(function() {

			});

			it("apiTool new apiTool() requires a doctype",function(){
				// var tool = new ps.apiTool({},{doctype:"notathinglol"});
				// expect(tool.items).to.equal(null);
			});
			it("apiTool new apiTool() makes my.items avalible and servercall and triggers onchange null before cached",function(done){
				//need to use the  async
				var tool = new ps.apiTool({}, setup, onChange);
				expect(tool.items).to.equal(null);
				function onChange(){
					expect(tool.items[0].first_name).to.equal("perm");
					done();
				}

			});
			it("apiTool new apiTool() called with filters works",function(done){
				//need to use the  async
				var tool = new ps.apiTool({"first_name":"perm"}, setup, onChange);
				function onChange(){
					expect(tool.items[0].first_name).to.equal("perm");
					done();
				}

			});
			it("apiTool new apiTool() called with incorrect filters works",function(done){
				//need to use the  async
				var tool = new ps.apiTool({"first_name":"funguy"}, setup, onChange);
				function onChange(){
					expect(tool.items).to.equal(null);
					done();
				}

			});
			it("apiTool new apiTool() second call is cached", function(done){
				var tool = new ps.apiTool({}, setup, onChange);
				expect(tool.items[0].first_name).to.equal("perm");
				function onChange(){
					expect(tool.items[0].first_name).to.equal("perm");
					done();
				}
			});
			it("offline and goes online should trigger a call to server and onChange Function", function(done){
				ps.online=false;
				var tool = new ps.apiTool({}, setup, onChange);
				expect(tool.items[0].first_name).to.equal("perm");

				//Turn internet on after 500 milliseconds
				setTimeout(function(){
					ps.online=true;
					$(document).trigger("connected");
				}, 500);
				function onChange(){
					expect(tool.items[0].first_name).to.equal("perm");
					done();
				}
			});
		});
		describe("apiTool.create(item)",function(){
			

			beforeEach(function(done){
				ps.store.clear("Testing");
				ps.socket.socket.off('remove_Testing');
				ps.socket.socket.off('update_Testing');
				ps.socket.socket.off('create_Testing');
				args={};
				args.cmd="process_success.ps_core.api.clear_test_db";
				ps.call(args, function(data){
					args2={};
					args2.cmd="process_success.ps_core.api.create_doc";
					args2.doctype="Testing";
					args2.item={
						first_name:"perm",
						last_name: "perm",
						team: "red",
						skill:"Expert"
					};
					ps.call(args2, function(data){
						done();
					});
				});
			});

			it("apiTool.create(item) should be able to get the new item and on change should trigger",function(done){
				var tool = new ps.apiTool({}, setup, onChange);
				console.log("______________IN TESTS___________");
				tool.create({
					first_name:"newguy",
					last_name: "gantz",
					team: "yellow",
					skill:"Expert"
				},function(){
					try{
						expect(tool.items.length).to.equal(2);
						done();
					}catch(e){
						done(e);
					}
				});
				var timesCalled=1;
				function onChange(){
					timesCalled++;
					if (timesCalled==2){
						//done();
					}
				}

			});
			it("apiTool.create(item) 2 tools second tool should trigger onchange when first tool creates",function(done){
				var tool = new ps.apiTool({}, setup, onChange);
				var tool2 = new ps.apiTool({}, setup, onChange2);
				tool.create({
					first_name:"newguy",
					last_name: "gantz",
					team: "yellow",
					skill:"Expert"
				},function(){
					try {
						expect(tool.items.length).to.equal(2);
					}catch(e){
						done(e);
					}
				});

				var timesCalled=1;
				function onChange(){
				}
				function onChange2(){
					timesCalled++;
					//this is prone to error a promice would probably be more sturdy as on change is used liberaly
					if (timesCalled==3){
						try {
					        tool2.items.length.should.equal(2);
					        done();
					    } catch( e ) {
					        done( e ); 
					   	}
					}
				}

			});
			it("apiTool.create(item) offline, new item is avalible when online the change is made to server and on change triggerd", function(done){
				ps.online=false;
				var tool = new ps.apiTool({}, setup, onChange);
				var tool2 = new ps.apiTool({}, setup, onChange2);
				var valid = false;

				tool.create({
					first_name:"Placid",
					last_name: "Penguin",
					team: "yellow",
					skill:"Expert"
				},function(){
					try {
						expect(tool.items.length).to.equal(2);
					}catch(e){
						done(e);
					}
				});
				setTimeout(function(){
					ps.online=true;
					$(document).trigger("connected");
				}, 500);
				var timesCalled=1;
				function onChange(){
					if (ps.online){
						if(tool.items.length==3 || valid){
							done("fail");
						}
					}
				}
				function onChange2(){
					//alert(JSON.stringify(tool2.items));
					if(tool2.items.length==2){
						done();
					}
				}
			
			});
			
		});
		describe("apiTool.update(item)",function(){
			var permName="";
			beforeEach(function(done) {
				ps.store.clear("Testing");
				ps.socket.socket.off('remove_Testing');
				ps.socket.socket.off('update_Testing');
				ps.socket.socket.off('create_Testing');
				args={};
				args.cmd="process_success.ps_core.api.clear_test_db";
				ps.call(args, function(data){
					args2={};
					args2.cmd="process_success.ps_core.api.create_doc";
					args2.doctype="Testing";
					args2.item={
						first_name:"perm",
						last_name: "perm",
						team: "red",
						skill:"Expert"
					};
					ps.call(args2, function(data){
						permName=data.message.name;
						done();
					});
				});
			});
			afterEach(function() {
			});

			it("apiTool.update(item) should be able to get the new item and on change should trigger",function(done){
				var called=0;
				var tool = new ps.apiTool({}, setup, onChange);
				function onChange(){
					called++;
					if(called <= 1){
						console.log("update");
						tool.update({
							name:permName,
							first_name:"newguy",
							last_name: "gantz",
							team: "yellow",
							skill:"Expert"
						},function(){
							try{
								expect(tool.items.length).to.equal(1);
								expect(tool.items[0].first_name).to.equal("newguy");
								done();
							}catch(e){
								done(e);
							}
						});
					}
					
				}
			
			});

			it("apiTool.update(item) create 2 tools, use 1 to update, second should recive update",function(done){
				var called=0;
				var called2=0;
				var tool = new ps.apiTool({}, setup, onChange);
				var tool2 = new ps.apiTool({}, setup, onChange2);
				function onChange(){
					called++;
					if(called <= 1){
						console.log("update");
						tool.update({
							name:permName,
							first_name:"newguy",
							last_name: "gantz",
							team: "yellow",
							skill:"Expert"
						},function(){});
					}
					
				}
				function onChange2(){
					// console.log(called2+1,"------called ----------");
					// console.log(tool2.items[0].first_name);
					called2++;
					if (tool2.items!==null){
						if(tool2.items[0].first_name=="newguy"){
							done();
						}
					}
				}
			});

			it("apiTool.update(item) create 2 tools, go offline use 1 to update, second should recive update when back online",function(done){
				var called=0;
				var called2=0;
				var tool = new ps.apiTool({}, setup, onChange);
				var tool2 = new ps.apiTool({}, setup, onChange2);


				function onChange(){
					called++;
					if(called <= 1){
						ps.online=false;
						setTimeout(function(){
							ps.online=true;
							$(document).trigger("connected");
						}, 500);
						tool.update({
							name:permName,
							first_name:"newguy",
							last_name: "gantz",
							team: "yellow",
							skill:"Expert"
						},function(){});
					}	
				}
				function onChange2(){
					// console.log(called2+1,"------called ----------");
					// console.log(tool2.items[0].first_name);
					called2++;
					if (tool2.items!==null){
						if(tool2.items[0].first_name=="newguy"){
							done();
						}
					}
				}
			});
			it("apiTool.update(item), go offline use 1 to update, create a second and check is cache is good",function(done){
				var called=0;
				var called2=0;
				var tool = new ps.apiTool({}, setup, onChange);
				


				function onChange(){
					called++;
					if(called <= 1){
						function onChange2(){
							if (tool2.items!==null){
								if(tool2.items[0].first_name=="newguy"){
									done();
								}
							}
						}
						ps.online=false;
						setTimeout(function(){
							ps.online=true;
							$(document).trigger("connected");
						}, 500);
						tool.update({
							name:permName,
							first_name:"newguy",
							last_name: "gantz",
							team: "yellow",
							skill:"Expert"
						},function(){});
						var tool2 = new ps.apiTool({}, setup, onChange2);
						try{
							console.log(tool2.items);
							expect(tool2.items[0].first_name).to.equal("newguy");
						}catch(e){done(e);}
					}
				}


			});
			// it("apiTool.update(item) offline, new item is avalible when online the change is made to server and on change triggerd", function(){
			
			// });
		});
		describe("apiTool.remove(item_name)",function(){
			var permName="";
			beforeEach(function(done) {
				ps.store.clear("Testing");
				ps.socket.socket.off('remove_Testing');
				ps.socket.socket.off('update_Testing');
				ps.socket.socket.off('create_Testing');
				args={};
				args.cmd="process_success.ps_core.api.clear_test_db";
				ps.call(args, function(data){
					args2={};
					args2.cmd="process_success.ps_core.api.create_doc";
					args2.doctype="Testing";
					args2.item={
						first_name:"perm",
						last_name: "perm",
						team: "red",
						skill:"Expert"
					};
					ps.call(args2, function(data){
						permName=data.message.name;
						done();
					});
				});
			});
			afterEach(function() {
			});

			it("apiTool.remove(name) when called the items should be empty",function(done){
				var called=0;
				var tool = new ps.apiTool({}, setup, onChange);
				function onChange(){
					called++;
					if(called <= 1){
						console.log("update");
						tool.remove(permName,function(){
							console.log("------called ----------");
							console.log(tool.items);
							try{
								expect(tool.items.length).to.equal(0);
								done();
							}catch(e){
								done(e);
							}
						});
					}
					if(tool.items.length===0){
						//done();
					}
				}
			});
			it("apiTool.remove(name) create 2 tools, use 1 to remove, second should recive update",function(done){
				var called=0;
				var called2=0;
				var tool = new ps.apiTool({}, setup, onChange);
				var tool2 = new ps.apiTool({}, setup, onChange2);
				function onChange(){
					called++;
					if(called <= 1){
						console.log("update");
						tool.remove(permName,function(){
							try{
								expect(tool.items.length).to.equal(0);
							}catch(e){
								done(e);
							}
						});
					}
				}
				function onChange2(){
					console.log("------called ----------");
					console.log(tool2.items);
					if(tool2.items!==null){
						console.log(tool2.items);
						if(tool2.items.length===0){
							done();
						}
					}
				}
			});
			it("apiTool.remove(name) create 2 tools,go offline, use 1 to remove, go online, second should recive update",function(done){
				var called=0;
				var called2=0;
				var tool = new ps.apiTool({}, setup, onChange);
				var tool2 = new ps.apiTool({}, setup, onChange2);


				function onChange(){
					called++;
					if(called <= 1){
						ps.online=false;
						setTimeout(function(){
							ps.online=true;
							$(document).trigger("connected");
						}, 500);
						tool.remove(permName,function(){
							try{
								expect(tool.items.length).to.equal(0);
							}catch(e){
								done(e);
							}
						});
					}	
				}
				function onChange2(){
					console.log("------called ----------");
					console.log(tool2.items);
					if (tool2.items!==null){
						console.log(tool2.items);
						if(tool2.items.length===0){
							done();
						}
					}
				}
			});
		});



	});
})();