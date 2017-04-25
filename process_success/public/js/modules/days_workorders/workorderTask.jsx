
/*jshint ignore:start */
import TaskCheck from './TaskCheck'
import CreateIssue from './createIssue'

export default class WorkorderTask extends React.Component{
	constructor(props){
		super(props);
		this.state ={title:"derek"};
		this.taskChecked=this.taskChecked.bind(this);
		this.statusChange=this.statusChange.bind(this);
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
			<div id="" className={mainClass}>
				<div className="panel-heading">
					<div className="row">
						<h3 className="panel-title col-xs-10">
							<a className="float-left" href={this.props.location_route}>{this.props.location}</a>
						</h3>
						<div className="col-xs-2 create-issue-header-button-container" >
							<CreateIssue
								workorder={this.props.workorder}
							/>
						</div>
					</div>
						

				</div>
				<div className="panel-body">
					<label className="control-label">Status</label>
					<select className="form-control status" value={this.props.status} onChange={this.statusChange}>
						<option value="Pending">Pending</option>
						<option value="Started">Started</option>
						<option value="Complete">Complete</option>
						<option value="Incomplete">Incomplete</option>
					</select>

					<div className="check_boxes">
						{this.props.tasks.map(function(item, index){
							var checked=item.status?true:false;
							return (<TaskCheck key={index} index={index} lable={item.task} checked={checked} taskChecked={this.taskChecked}/>);
						}.bind(this))}

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



