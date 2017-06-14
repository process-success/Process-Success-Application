
/*jshint ignore:start */
import TaskCheck from './taskCheck'
import CreateIssue from './createIssue'
import Modal from '../utils/modal'


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
		mainClass = mainClass + " panel workorder";
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
					<div>{this.props.type}</div>
					<label className="control-label">Status</label>
					<select className="form-control status" value={this.props.status} onChange={this.statusChange}>
						<option value="Pending">Pending</option>
						<option value="Started">Started</option>
						<option value="Complete">Complete</option>
						<option value="Incomplete">Incomplete</option>
					</select>

					<div className="check_boxes">
						{
							this.props.tasks.map(function(item, index){
								var checked=item.status?true:false;
								return (<TaskCheck key={index} index={index} lable={item.task} checked={checked} taskChecked={this.taskChecked}/>);
							}.bind(this))
						}

					</div>
					<div>
						<a className="" href={this.props.route}>More Information</a>
					</div>
				</div>
			</div>
			</div>
		);
	}
}



