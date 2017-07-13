/*jshint ignore:start */
// import Form from '../../public/js/modules/utils/forms'
// import Acordian from '../../public/js/modules/utils/acordian'
// import AcordianContent from '../../public/js/modules/utils/acordianContent'
import DoctypeForm from '../../public/js/modules/utils/doctypeForm'

import Table from '../../public/js/modules/utils/table'
import Modal from '../../public/js/modules/utils/modal'
//import SprayTable from '../../public/js/modules/vineyard/sprayTable'



//const app= document.getElementById('app');
const app= $('#app')[0];

// class CreateWorkorder extends React.Component{
// 	constructor(props){
// 		super(props);
// 	}
// 	//<AffixWrapper className="sticky_subnav text-center"  offset={140} height="40px"></AffixWrapper>
// 	someFunction(){

// 	}
// 	render(){
// 		var fields=[
// 			{
// 				field:"header",
// 				lable:"TESTING"
// 			},

// 			{
// 				field:"input",
// 				onChange: this.someFunction,
// 				lable:"test"
// 			},
// 			{
// 				field:"lable",
// 				lable:"TESXSDF"
// 			},
// 			{
// 				field:"input",
// 				onChange: this.someFunction,
// 				lable:"test2"
// 			},
// 			{
// 				field:"date",
// 				onChange: this.someFunction,
// 				lable:"Date"
// 			},
// 			{
// 				field:"select",
// 				onChange: this.someFunction,
// 				lable:"test2",
// 				options:[
// 					{ 
// 						group: "thing",
// 						options: [
// 							"one",
// 							"two",
// 							"three"
// 						]
// 					},
// 					{
// 						group: "thing2",
// 						options: [
// 							"one",
// 							"two",
// 							"three"
// 						]
// 					}
// 				]
// 			},
// 			{
// 				field:"select",
// 				onChange: this.someFunction,
// 				lable:"test2",
// 				value:"two",
// 				options:[
// 					"one",
// 					"two",
// 					"three"
// 				]
// 			},
// 			{
// 				field:"check",
// 				className:"big-checkbox",
// 				onChange: function(e){console.log(e.target.checked)},
// 				lable:"this is a test"
// 			},
// 			{
// 				lable:"Test Text Area",
// 				field:"textarea",
// 				className:"",
// 				onChange: this.someFunction
// 			},
// 			{
// 				field:"autoComplete",
// 				onChange: this.someFunction,
// 				lable:"Vineyard",
// 				doctype:"Vineyard",
// 				docvalue:"name"
// 			},
// 			{
// 				field:"autoComplete",
// 				onChange: this.someFunction,
// 				lable:"Customer",
// 				doctype:"Customer",
// 				doclable:"full_name",
// 				docvalue:"name"
// 			}
// 		]
// 		return(
// 			<div>
// 			<Form
// 				type="horizontal"
// 				fields={fields}
// 				id="thing"
// 			>

// 			</Form>
// 			</div>
// 		);
// 	}
// }

class DocTable extends React.Component{
	constructor(props){
		super(props);
		this.returnColumns=this.returnColumns.bind(this);
		this.tableChange=this.tableChange.bind(this);
		this.returnContent=this.returnContent.bind(this);
		this.editableContent=this.editableContent.bind(this);
		this.tableTool = new ps.apiTool(this.props.filter,{doctype:this.props.doctype},this.tableChange);
		this.state={
			items:this.tableTool.items,
			currentItem:{},
			formMode:"create"

		};
		this.modalID=this.props.id+"_form_modal";
	}
  	tableChange(){
		this.setState({items:this.tableTool.items});
	}
	returnColumns(){
		var columns =[];
		for(var x=0; x < this.props.config.length; x++){
			var item=this.props.config[x];
			columns.push({title:item.lable});
		}
		if(this.props.editable){
			columns.push({title:"Edit"});
		}

		return columns;
	}
	returnContent(){
		var content=[];
		if(this.state.items!==null){
			this.state.items.map(function(item, index){
				var tdcontent=[];
				for(var x=0; x < this.props.config.length; x++){
					var config=this.props.config[x];
					if(config.href){
						tdcontent.push(<td key={this.props.id + index + "_" + x} ><a href={item[config.href]} >{item[config.value]}</a></td>)
					}else{
						tdcontent.push(<td>{item[config.value]}</td>)
					}
				}
				if(this.props.editable){
					tdcontent.push(
						<td key={this.props.id + index + "_" + x} >
							<button 
								type="button" 
								className="btn btn-default inline-task"
								onClick={
									function(){
										this.setState({
											formMode:"edit",
											currentItem:item
										});
										$("#"+this.modalID).modal();
									}.bind(this)
								}

							>
								Edit <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
							</button>

						</td>
					);
				}
				content.push((
					<tr key={this.props.id + index}>
						{tdcontent}
					</tr>
				));	
			}.bind(this));
		}
		return (<tbody>{content}</tbody>);
	}
	editableContent(){
		var formProps={};
		formProps.doctype=this.props.doctype;
		for(var x=0; x < this.props.config.length; x++){
			var config=this.props.config[x];
			formProps[config.value]=config;
		}
		var form=(

				<DoctypeForm 
					close={function(){$("#"+this.modalID).modal('hide');}.bind(this)}
					itemChange={
						function(item){
							this.setState({currentItem:item})}.bind(this)
						}
					create={
						function(item,doctype){
							for(var x=0; x < this.props.config.length; x++){
								var config=this.props.config[x];
								if(config.default){
									item[config.value] = config.default;
								}
							}
							item.doctype=doctype;
							this.tableTool.create(item);
							$('#'+this.modalID).modal('toggle');
						}.bind(this)
					}
					edit={function(item){
						this.tableTool.update(item);
						$('#'+this.modalID).modal('toggle');
					}.bind(this)}
					delete={function(item){
						  this.tableTool.delete(item);
						$('#'+this.modalID).modal('toggle');
					}.bind(this)}
					mode={this.state.formMode}
					item={this.state.currentItem}
					id="thing"
				/>
		);
		
		//loop the config to create form items

		form=React.cloneElement(form ,formProps);
		return (
			<div>
				<button 
					type="button" 
					className="btn btn-primary" 
					onClick={function(){
						this.setState({
							formMode:"create",
							currentItem:{}
						});
						$("#"+this.modalID).modal();
					}.bind(this)}
					>
					Create {this.props.doctype} <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
				</button>
				<Modal 
					id={this.modalID}
					submitText="Submit" 
					title={"Create " + this.props.doctype}
					submit={false}
					>
					{form}
				</Modal>
			</div>
			);
	}
	someFunction(){
	}
	render(){
		var form="";
		if(this.props.editable){
			form=this.editableContent();
		}
		var columns=this.returnColumns();
		var content=this.returnContent();
		return(
			<div>
				<Table 
					id="sprayTable"
					title="Spray Table"
					content={content}
					columns={columns}
				/>
				{form}
			</div>
		);
	}
}
/*			<DoctypeForm 
				close={this.close}
				itemChange={this.onChange}
				create={this.create}
				edit={this.update}
				delete={this.delete}
				mode={this.state.formMode}
				item={item}
				id={this.props.workorder}

				doctype="Spraying"
				season={ {active:1}}
				note={ {
					active:1,
					type:"textarea" 
				}} 
				spray_type={ {active:1}}
			/> 	*/

const app2= $('#app2')[0];
(function(){
	var filter={};
	frappe.ready(function(){
		ReactDOM.render( 
			<DocTable 
				doctype="Spraying"
				id="doctable"
				filter={ {} }
				config={[
					{
						lable:"Vineyard",
						value:"vineyard",
						href:"vineyard_route",
						active:0,
						default:"CRV Vines"
					},
					{
						lable:"Season",
						value:"season",
						active:1
					},
					{
						lable:"Note",
						value:"note",
						active:1,
						type:"textarea"
					},
					{
						lable:"Spray Type",
						value:"spray_type",
						active:1
					}
				]}
				editable={1}
			/> 
		, app2 );
	})

})();


// const app2= $('#app2')[0];
// (function(){
// 	var filter={};
// 	frappe.ready(function(){
// 		ReactDOM.render( 
// 			<div><DoctypeForm 
// 				id="createPrunEntry" 
// 				doctype="Pruning"
// 				season={  {active:1}  }
// 				note={ {
// 					active:1,
// 					type:"textarea" 
// 				}}
// 				type={ {active:1} }
// 				b_lock={ {active:1}}
// 				removed={ {active:1}}
// 				pre_prune={ {active:1}}
// 				tap_removed={ {active:1}}
// 			/> <CreateWorkorder /></div>	, app2 );
// 	})

// })();

// const app2= $('#app2')[0];
// (function(){
// 	var filter={};
// 	frappe.ready(function(){
// 		ReactDOM.render( <SprayTable filter={filter} /> , app2 );
// 	})

// })();



