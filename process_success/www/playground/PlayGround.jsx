/*jshint ignore:start */
import Form from '../../public/js/modules/utils/forms'
import {Check,Button} from '../../public/js/modules/utils/forms'
// import Acordian from '../../public/js/modules/utils/acordian'
// import AcordianContent from '../../public/js/modules/utils/acordianContent'
import DocTable from '../../public/js/modules/utils/docTable'
import AcordianContent from '../../public/js/modules/utils/acordianContent'
//import SprayTable from '../../public/js/modules/vineyard/sprayTable'



const app= document.getElementById('app');
class FieldForm extends React.Component{
	constructor(props) {
		super(props);
		this.feilds=[
			{
				field:"select",
				onChange: this.someFunction,
				value:"Input",
				options:[
					"Input",
					"Select",
					"Number",
					"Date",
					"Check",
					"Textarea"
				]
			},
			{
				field:"input",
				onChange: this.someFunction,
			},
			{
				field:"textarea",
				className:"",
				rows:"1",
				onChange: this.someFunction
			},
			{
				field:"button",
				value:"Remove",
				className:"btn-danger",
				onClick: this.someFunction
			}
		]
	}
	render(){
		return(
			<div>
				<div className="row">
					<Form
						type="inline"
						className="inline"
						rows="4"
						fields={this.feilds}
						id="thing"
					/>
				</div>
			</div>

		);
	}
}
class DoctypeUpdater extends React.Component{
	constructor(props) {
		super(props);
		this.state={active:0};

		this.fields=[
			{
				label:"Active",
				field:"check",
				onChange: this.someFunction,
			},
		];

	}
	render(){
		return(
			<div>
				<Check
					lable="Active"
					value={this.state.active}
					inputChanged={function(){
						console.log("hello");
						var stateChange=this.state.active;
						if(stateChange==1){
							stateChange=0;
						}else{stateChange=1;}
						this.setState({active:stateChange});
					}.bind(this)}
					/>
				<div className="row inline-form-header">
					<div className="col-xs-3">Type</div>
					<div className="col-xs-3">Name</div>
					<div className="col-xs-6">Options</div>
				</div>
				<FieldForm></FieldForm>
				<FieldForm></FieldForm>
				<Button
					className="btn-primary"
					value="Add Field"
					icon="glyphicon-align-left"
					/>
				<Button
					className="btn-success"
					value="Update"
					icon="glyphicon-refresh"
					/>
			</div>

		);
	}
}


class TaskManager extends React.Component{
	constructor(props) {
		super(props);
		this.taskUpdate=this.taskUpdate.bind(this);
		this.updateNewTaskName=this.updateNewTaskName.bind(this);
		this.createTask=this.createTask.bind(this);

		console.log("hello");
		this.doctypeTool = new ps.apiTool({module:"Tasks"},{doctype:'DocType'},this.taskUpdate);
		this.state={
			tasks:this.doctypeTool.items,
			taskNameError:0,
			newTaskName:""
		}
	}
	taskUpdate(){
		this.setState({
			tasks:this.doctypeTool.items
		})
	}
	updateNewTaskName(e){
		this.setState({
			newTaskName:e.target.value,
			taskNameError:0
		});
	}
	createTask(e){
		e.preventDefault();
		if(this.state.newTaskName==""){
			ps.failAlert("Task Name Required");
			this.setState({taskNameError:1});
		}else{
			this.doctypeTool.create(
				{
					name:this.state.newTaskName,
					module:"Tasks",
					custom:1,
					fields:[
						{
							fieldname:"active",
							fieldtype:"Check"
						}
					],
					permissions:[
						{
							docType:"DocPerm",
							role:"System Manager"
						}
					]
				}
			)
			this.setState({newTaskName:""});
		}
	}
	render(){
		console.log(this.state);
		var items=[];
		this.feilds=[
			{
				field:"input",
				value:this.state.newTaskName,
				placeholder:"Task Name",
				error:this.state.taskNameError,
				required:1,
				onChange: this.updateNewTaskName,
			},
			{
				field:"button",
				value:"Create New Task",
				className:"btn-primary",
				icon:"glyphicon-plus",
				onClick: this.createTask
			}
		]
		console.log(this.doctypeTool.items);
		this.state.tasks.map(function(item) {
			items.push(
				<AcordianContent
				title={item.name}
				active={false}
				parentId={item.name}
				id={"task_display_"+item.name.replace(/ /g,"_")} >

					<DoctypeUpdater
						hiddenFields={["Vineyard","Hours","Note","Season","Location","Default_Rate"]}
						doctypeItem={item}
						/>
				</AcordianContent>
			);
		});
		return(
			<div>{items}

					<Form
						className="inline"
						type="inline"
						rows="2"
						fields={this.feilds}
						id="thing"
					/>
		</div>
		);

	}
}

const app2= $('#app2')[0];
(function(){
	var filter={};
	frappe.ready(function(){
		ReactDOM.render(
			<TaskManager></TaskManager>
		, app2 );
	})

})();


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
