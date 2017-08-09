
/*jshint ignore:start */
import TaskCheck from './taskCheck'
import CreateIssue from './createIssue'
import Modal from '../utils/modal'
import {Form, Select} from '../utils/forms'
import {SprayForm,PruningForm} from '../vineyard/sprayForm'
import DoctypeForm from '../utils/doctypeForm'


export default class WorkorderTask extends React.Component{
	constructor(props){
		super(props);
		this.state={
			issues:[],
			title:'',
			modal:'new',
			modalPriority:'low',
			modalTitle:'',
			modalDescription:'',
			modalName:''
		};
		this.taskChecked=this.taskChecked.bind(this);
		this.statusChange=this.statusChange.bind(this);
		this.activateModalNew=this.activateModalNew.bind(this);
		this.activateModalEdit=this.activateModalEdit.bind(this);

		this.issueFormChange=this.issueFormChange.bind(this);
		this.createIssue=this.createIssue.bind(this);
		this.editIssue=this.editIssue.bind(this);
		this.deleteIssue=this.deleteIssue.bind(this);
		this.close=this.close.bind(this);

		this.issueChanged=this.issueChanged.bind(this);


		this.modalId="issue-form-"+this.props.workorder;

		
		this.issueTool = new ps.apiTool({"work_order":this.props.workorder},{doctype:'Issue'},this.issueChanged);


	}
	taskChecked(e){
		this.setState({title:"CHECKED"});
	}
	isChecked(value){
    	return ((value===this.state.selected) ?'checked line-through':'default');
  	}
  	taskChecked(index,checked){
  		var wo_index=this.props.index;
  		this.props.onTaskChecked(wo_index,index,checked);
  	}
  	statusChange(e){
  		this.props.onStatusChanged(e.target.value,this.props.index);

  	}
  	/*---------------------------------------
				ISSUE FUNCTIONS
  	-----------------------------------------*/

  	activateModalNew(){
  		this.setState({issueMode:"create"});
  		this.setState({issue:{}});
  		$('#'+this.modalId).modal();
  	}
  	activateModalEdit(issue){
  		this.setState({issueMode:"edit"});
		this.setState({issue:issue});
  		$('#'+this.modalId).modal();
  	}
  	issueFormChange(issue){
  		this.setState({issue:issue});
  	}
  	issueChanged(){
		this.setState({issues:this.issueTool.items});
	}
  	createIssue(item){
  		//console.log(this.state.issue);
		item.vineyard=this.props.location;
		item.work_order=this.props.workorder;
		this.issueTool.create(item,function(item){
			ps.successAlert("Issue " +item.title+ " created.")
		});
		$('#'+this.modalId).modal('toggle');
	}
	deleteIssue(item){
  		this.issueTool.delete(item);
		$('#'+this.modalId).modal('toggle');
	}
	editIssue(item){
		this.issueTool.update(item,function(item){
			ps.successAlert("Issue " +item.title+" updated.")
		});
		$('#'+this.modalId).modal('toggle');
	}
	close(){
		$('#'+this.modalId).modal('toggle');
	}


	render(){
		const title="welcome";
		var mainClass={
			'Complete':'panel-success',
			'Incomplete':'panel-danger',
			'Pending':'panel-default',
			'Started':'panel-warning'
		}[this.props.status];
		mainClass = mainClass + " panel workorder ps-panel";
		var route=(this.props.route===undefined)?"Not Created":(<a className="" href={this.props.route}>More Information</a>);
		var tasks="";
		if(this.props.tasks!==undefined){
			tasks=[];
			this.props.tasks.map(function(item, index){
				var checked=item.status?true:false;
				tasks.push(<TaskCheck key={index} index={index} lable={item.task} checked={checked} taskChecked={this.taskChecked}/>);
			}.bind(this))
		}

		var modalTitle = "";
		if(this.state.issueMode){
			modalTitle = "Create Issue";
		}else{
			modalTitle = "Edit Issue";
		}
		return(
			<div className='col-md-4 col-sm-4'>
				<Modal 
					id={this.modalId} 
					submitText="Submit" 
					title="Create Issue For"
					submit={false}
					>

						<DoctypeForm 
							close={this.close}
							itemChange={this.issueFormChange}
							create={this.createIssue}
							edit={this.editIssue}
							delete={this.deleteIssue}
							mode={this.state.issueMode}
							item={this.state.issue}
							id={this.props.workorder}

							doctype="Issue"
							issue_title={{active:1}}
							issue={{
								active:1,
								type:"textarea" 
							}}
							priority={{
								active:1,
								default:"Low"
							}}
							status={{
								active:1,
								default:"Open"
							}}
						/> 	
				</Modal>
			<div id="" className={mainClass}>
				<div className="panel-heading">
					<div className="row">
						<h3 className="panel-title col-xs-8">
							<a className="float-left" href={this.props.location_route}>{this.props.location}</a>
						</h3>



							<CreateIssue
								issues={this.state.issues}
								activateModalNew={this.activateModalNew}
								activateModalEdit={this.activateModalEdit}
								workorder={this.props.workorder}

							/>
							<div className="clearfix"></div>

					</div>
						

				</div>
				<div className="panel-body">
					<select className="form-control status" value={this.props.status} onChange={this.statusChange}>
						<option value="Pending">Pending</option>
						<option value="Started">Started</option>
						<option value="Complete">Complete</option>
						<option value="Incomplete">Incomplete</option>
					</select>

					<div className="check_boxes">

						{tasks}
						<VineyardTasks workorder={this.props.workorder} vineyard={this.props.location}/>
					</div>
					<div>
						{route}
					</div>
				</div>
			</div>
			</div>
		);
	}
}




export class VineyardTasks extends React.Component{
	constructor(props){
		super(props);

		this.modalNewTask=this.modalNewTask.bind(this);
		this.taskChecked=this.taskChecked.bind(this);
		this.taskChanged=this.taskChanged.bind(this);
		this.editTask=this.editTask.bind(this);
		this.getForm=this.getForm.bind(this);

		this.delete=this.delete.bind(this);
		this.close=this.close.bind(this);
		this.update=this.update.bind(this);
		this.create=this.create.bind(this);
		this.onChange=this.onChange.bind(this);
		

		this.modalId="task-form"+this.props.workorder;
		
		this.tasksTool = new ps.apiTool({"work_order":this.props.workorder},ps.apiSetup.vineyardTasks,this.taskChanged);
		this.state={
			tasks:this.tasksTool.items,
			formState: "taskType",
			formMode:"create",
			editItem:null
		};
	}
	modalNewTask(){
		this.setState({
			formState:"taskType",
			editItem:null,
			formMode:"create"
		});
		$('#'+this.modalId).modal();
	}
	isChecked(value){
    	//return ((value===this.state.selected) ?'checked line-through':'default');
  	}
  	taskChanged(){
  		this.setState({tasks:this.tasksTool.items});
  	}
  	taskChecked(item){
  		item.complete=item.complete?0:1;
  		this.tasksTool.update(item);
  	}
  	editTask(item){
  		console.log("edit task called");
  		console.log(item);
  		this.setState(
  			{
  				formState:item.doctype.replace(/\s/g, ''),
  				editItem:item,
  				formMode:"edit"
  			});
  		$('#'+this.modalId).modal();
  	}
  	renderTasks(){
  		var tasks=[];
  		if(this.state.tasks!==undefined&&this.state.tasks!==null){
			tasks=[];
			this.state.tasks.map(function(item, index){
				//var checked=item.status?true:false;
				tasks.push(
					<TaskCheck 
						key={index}
						index={index}
						item={item}
						lable={item.doctype}
						checked={item.complete}
						taskChecked={this.taskChecked}
						editTask={function(e){this.editTask(item);}.bind(this)}
					/>);
			}.bind(this))
		}
		return tasks;
  	}
  	delete(copy){
  		this.tasksTool.delete(copy);
		$('#'+this.modalId).modal('toggle');
	}
  	close(e){
  		console.log("close");
  		$('#'+this.modalId).modal('toggle');
  	}
  	update(copy){
  		this.tasksTool.update(copy);
		$('#'+this.modalId).modal('toggle');
  	}
  	create(item,doctype){
		item.work_order=this.props.workorder;
		item.vineyard=this.props.vineyard;
		item.doctype=doctype;
		this.tasksTool.create(item);
		$('#'+this.modalId).modal('toggle');
  	}
  	onChange(copy){
  		this.setState({editItem:copy})
  	}
  	getForm(){
  		var formsObj={
			taskType:function(){
				return(	
				<Select
					className=""
					lable="Task Type"
					options={[" "].concat(ps.apiSetup.vineyardTasks.doctype)}
					inputChanged={
						function(e){this.setState({formState:  e.target.value.replace(/\s/g, '')  })}.bind(this)
					}
				/>
			)}.bind(this),
			Spraying:function(item){
				return (					
					<DoctypeForm 
						close={this.close}
						itemChange={this.onChange}
						create={this.create}
						edit={this.update}
						delete={this.delete}
						mode={this.state.formMode}
						item={item}
						id={this.props.workorder}

						doctype="Spraying"
						season={{active:1}}
						note={{
							active:1,
							type:"textarea" 
						}}
						spray_type={{active:1}}

					/> 		
				);

			}.bind(this),
			Harvest:function(item){
				return (					
					<DoctypeForm 
						close={this.close}
						itemChange={this.onChange}
						create={this.create}
						edit={this.update}
						delete={this.delete}
						mode={this.state.formMode}
						item={item}
						id={this.props.workorder}

						doctype="Harvest"
						season={{active:1}}
						note={{
							active:1,
							type:"textarea" 
						}}
						pounds={{active:1}}
						post_harvest_water={{active:1}}

					/> 		
				);

			}.bind(this),
			BirdNets:function(item){
				return (					
					<DoctypeForm 
						close={this.close}
						itemChange={this.onChange}
						create={this.create}
						edit={this.update}
						delete={this.delete}
						mode={this.state.formMode}
						item={item}
						id={this.props.workorder}

						doctype="Bird Nets"
						season={{active:1}}
						note={{
							active:1,
							type:"textarea" 
						}}

					/> 		
				);

			}.bind(this),
			Watering:function(item){
				return (					
					<DoctypeForm 
						close={this.close}
						itemChange={this.onChange}
						create={this.create}
						edit={this.update}
						delete={this.delete}
						mode={this.state.formMode}
						item={item}
						id={this.props.workorder}

						doctype="Watering"
						season={{active:1}}
						note={{
							active:1,
							type:"textarea" 
						}}
						duration={{active:1}}

					/> 		
				);

			}.bind(this),
			Canopy:function(item){
				return (					
					<DoctypeForm 
						close={this.close}
						itemChange={this.onChange}
						create={this.create}
						edit={this.update}
						delete={this.delete}
						mode={this.state.formMode}
						item={item}
						id={this.props.workorder}

						doctype="Canopy"
						season={{active:1}}
						note={{
							active:1,
							type:"textarea" 
						}}
						type={{active:1}}

					/> 		
				);

			}.bind(this),
			Pruning:function(item){
				//console.log("MODE", this.state.formMode);
				return (
					<DoctypeForm 
						close={this.close}
						itemChange={this.onChange}
						create={this.create}
						edit={this.update}
						delete={this.delete}
						mode={this.state.formMode}
						item={item}
						id={this.props.workorder}

						doctype="Pruning"
						season={{active:1}}
						note={{
							active:1,
							type:"textarea" 
						}}
						type={{active:1}}
						b_lock={{active:1}}
						removed={{active:1}}
						pre_prune={{active:1}}
						tap_removed={{active:1}}

					/> 		
				);

			}.bind(this)
		};
		//console.log("get form called");
		return formsObj[this.state.formState](this.state.editItem);
  	}
	render(){
		var fieldsSpray=[		
			{
				field:"button",
				type:"submit",
				value:"Create Spraying Entry",
				className:"btn-primary pull-right",
				onClick:this.submit
			}
		]
		var tasks=this.renderTasks();
		var form=this.getForm();
		var lable="Create New Task";
		return(
			<div className=''>
			{tasks}
			<div className="checkbox row addbutton">
				<div className="edit"> 
					<button 
						type="button" 
						className="btn btn-default inline-task"
						onClick={this.modalNewTask}
					>
						<span className="glyphicon glyphicon-plus " aria-hidden="true"></span> Add Task
					</button>
				</div>
			</div>
				<Modal 
					id={this.modalId} 
					submitText="Submit" 
					title={lable}
					submit={false}
					>
					{form}
				</Modal>
			</div>
		);
	}
}


