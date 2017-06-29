
/*jshint ignore:start */
import TaskCheck from './taskCheck'
import CreateIssue from './createIssue'
import Modal from '../utils/modal'
import {Form, Select} from '../utils/forms'
import {SprayForm,PruningForm} from '../vineyard/sprayForm'


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
		
		this.submitIssue=this.submitIssue.bind(this);
		this.modalTitleChange=this.modalTitleChange.bind(this);
		this.modalDescriptionChange=this.modalDescriptionChange.bind(this);
		this.modalPriorityChange=this.modalPriorityChange.bind(this);
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
  	modalTitleChange(e){
		this.setState({modalTitle:e.target.value});
  	}
	modalPriorityChange(e){
		this.setState({modalPriority:e.target.value});
	}
	modalDescriptionChange(e){
		this.setState({modalDescription:e.target.value});
	}
  	activateModalNew(){
  		this.setState({modal:"new"});
		this.setState({modalPriority:''});
		this.setState({modalDescription:''});
		this.setState({modalTitle:''});
  		$('#'+this.modalId).modal();
  	}
  	activateModalEdit(issue){
		this.setState({modal:issue});
		this.setState({modalPriority:issue.priority});
		this.setState({modalDescription:issue.issue});
		this.setState({modalTitle:issue.title});
		this.setState({modalName:issue.name});
  		$('#'+this.modalId).modal();
  	}
  	issueChanged(){

		this.setState({issues:this.issueTool.items});
	}
  	submitIssue(e){
  		e.preventDefault();

		var newItem={
			title:this.state.modalTitle,
			issue:this.state.modalDescription,
			priority:this.state.modalPriority,
			vineyard:this.props.location,
			work_order:this.props.workorder
		}
		if(this.state.modal=="new"){
			this.issueTool.create(newItem,function(item){
				ps.successAlert("Issue " +item.title+ " created.")
			});
		}else{
			newItem.name=this.state.modalName;
			this.issueTool.update(newItem,function(item){
				ps.successAlert("Issue " +item.title+" updated.")
			});
		}
		//close modal
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
		return(
			<div className='col-md-4 col-sm-4'>
				<Modal 
					id={this.modalId} 
					submitText="Submit" 
					title="Create Issue For"
					submit={this.submitIssue}>

						<fieldset>
							<div className="form-group">
								<label>Issue Title</label>
								<input 
									type="text" 
									className="form-control" 
									placeholder="Issue Title" 
									value={this.state.modalTitle} 
									onChange={this.modalTitleChange}
								/>
							</div>
							<div className="form-group">
								<label>Priority</label>
								<select className="form-control" value={this.state.modalPriority} onChange={this.modalPriorityChange.bind(this)}>
									<option>Low</option>
									<option>Medium</option>
									<option>High</option>
									<option>Critical</option>
								</select>
							</div>
							<div className="form-group">
							  	<label>Issue Details:</label>
							  	<textarea 
							  		className="form-control" 
							  		rows="3" 
							  		placeholder="Issue Details" 
							  		value={this.state.modalDescription}
							  		onChange={this.modalDescriptionChange}
							  	></textarea>
							</div>
						</fieldset>
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
						<VineyardTasks workorder={this.props.workorder} />
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
		this.modalId="task-form"+this.props.workorder;

		this.tasksTool = new ps.apiTool({"work_order":this.props.workorder},ps.apiSetup.vineyardTasks,this.taskChanged);
		this.state={
			tasks:this.tasksTool.items,
			formState: "taskType"
		};
	}
	modalNewTask(){
		this.setState({formState: "taskType"});
		$('#'+this.modalId).modal();
	}
	isChecked(value){
    	//return ((value===this.state.selected) ?'checked line-through':'default');
  	}
  	taskChanged(){
  		this.setState({tasks:this.tasksTool.items});
  	}
  	taskChecked(index,checked){
  		//var wo_index=this.props.index;
  		//this.props.onTaskChecked(wo_index,index,checked);
  	}
  	editTask(){

  	}

  	renderTasks(){
  		var tasks=[];
  		if(this.state.tasks!==undefined&&this.state.tasks!==null){
			tasks=[];
			console.log(this.state.tasks);
			this.state.tasks.map(function(item, index){
				var checked=item.status?true:false;
				tasks.push(
					<TaskCheck 
						key={index} 
						index={index} 
						lable={item.doctype} 
						checked={item.complete} 
						taskChecked={this.taskChecked}
						editTask={function(e){ editTask(item.name)}}
					/>);
			}.bind(this))
		}
		return tasks;
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


		var form={};
		var formsObj={
			taskType:function(){
				return(	
				<Select
					className=""
					lable="Task Type"
					options={[" "].concat(ps.apiSetup.vineyardTasks.doctype)}
					inputChanged={
						function(e){this.setState({formState:e.target.value})}.bind(this)
					}
				/>
			)}.bind(this),
			Spraying:function(item){
				if(item==undefined){
					return (						
						<SprayForm
							id={this.props.workorder}
							createSprayEntry={function(){}}
						/>
					);
				}

			}.bind(this),
			Pruning:function(item){

				if(item===undefined){
					return (						
						<PruningForm
							id="createSprayEntry"
							createSprayEntry={function(){}}
						/>
					);
				}

			}.bind(this)
		};

		form=formsObj[this.state.formState]();
		// console.log(formsObj[this.state.formState]);
		// console.log(form);
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





