/*jshint ignore:start */
import WorkorderTask from './workorderTask';

import Form from '../utils/forms'
import Modal from '../utils/modal'



export default class DaysWorkorders extends React.Component{
	constructor(props){
		super(props);
		var args={};
		args.crew=this.props.crew;
		args.date=this.props.date;
		/*   Do the bind thing  */
		this.onTaskChecked=this.onTaskChecked.bind(this);
		this.onStatusChanged=this.onStatusChanged.bind(this);
		this.workOrderChanged=this.workOrderChanged.bind(this);
		this.socketUpdate=this.socketUpdate.bind(this);
		this.componentWillReceiveProps=this.componentWillReceiveProps.bind(this);
		//this.workorderObj=this.onStatusChanged.bind(this);
		/*          end          */

		this.state={workorders:[]};

		var args={};
		args.crew=this.props.crew;
		args.date=this.props.date;
		this.workorderTool = new ps.apiTool(args,ps.apiSetup.workOrders,this.workOrderChanged);
		if (this.workorderTool.items===undefined ||this.workorderTool.items=== 0 ||this.workorderTool.items===null ){
		}else{
			this.state.workorders=this.workorderTool.items;
		}

	}
	componentWillReceiveProps(nextProps){

		if(nextProps.crew!=this.props.crew || nextProps.date!=this.props.date ){

			var args={};
			args.crew=nextProps.crew;
			args.date=nextProps.date;
			this.workorderTool = new ps.apiTool(args,ps.apiSetup.workOrders,this.workOrderChanged);
			if (this.workorderTool.items===undefined ||this.workorderTool.items=== 0 ||this.workorderTool.items===null ){
				this.setState({workorders:[]});
			}else{
				this.setState({workorders:this.workorderTool.items});
			}
		}
	}

	socketUpdate(){

	}
	onTaskChecked(wo_index,index,check){
		this.workorderTool.items[wo_index].subtask[index].status=check?0:1;
		this.setState({workorders:this.workorderTool.items});
		this.workorderTool.update(this.workorderTool.items[wo_index]);
		var checkedText=check?"unchecked.":"checked."
		//ps.successAlert(this.workorderTool.items[wo_index].subtask[index].task +" "+ checkedText );
	}
	onStatusChanged(status, index){
		this.workorderTool.items[index].status=status;
		this.setState({workorders:this.workorderTool.items});
		this.workorderTool.update(this.workorderTool.items[index]);
		if(status=="Complete"){
			ps.successAlert("Workorder completed!");
		}
	}
	workOrderChanged(){
		if (this.workorderTool.items!==null){
			this.setState({workorders:this.workorderTool.items});
			if(this.props.statusUpdate !== undefined){
				this.props.statusUpdate(this.workorderTool.items);
			}
		}else{
			this.setState({workorders:[]});
		}

	}
	workorderObj(item,index){
		return(
			<WorkorderTask 
				key={index} 
				index={index} 
				location_route={item.location_route}
				location={item.location}
				tasks={item.subtask}
				status={item.status}
				type={item.type}
				workorder={item.name}
				onTaskChecked={this.onTaskChecked}
				onStatusChanged={this.onStatusChanged}
				route={item.route}
			/>
		);
	}

	//-----------------------
	//        Render
	//-----------------------
	render(){
		if (this.state.workorders===0||this.state.workorders===undefined){
			return (<div className="text-center"><h3>No Workorders</h3></div>);
		}
		var todo=[];
		var complete=[];
		this.state.workorders.map(function(item, index){
			if (item.status!='Complete'&&item.status!='Incomplete'){
				todo.push(this.workorderObj(item,index));
				if(todo.length%3===0){todo.push(<div className='clearfix'></div>)}
			}else{
				complete.push(this.workorderObj(item,index));
				if(complete.length%3===0){complete.push(<div className='clearfix'></div>)}
			}
		}.bind(this));
		var completeHeader=(<h3>Complete Work Orders</h3>);
		if(complete.length==0){
			completeHeader="";
		}


		return(
			<div className="workorder_container">
				<div><br/>
					{todo}
				</div>
				<div className="clearfix"></div>
				<div>
					{completeHeader}
					{complete}
				</div>
				<div className="clearfix"></div>
				<br/>
				<WorkorderFormModal
					id={"create-wo-"+this.props.crew.replace(" ","-")}
					crew={this.props.crew}
					date={this.props.date}
				/>

			</div>
		);

	};	
}

export class WorkorderFormModal extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var fields=[		
			{
				field:"autoComplete",
				onChange: this.someFunction,
				lable:"Vineyard",
				doctype:"Vineyard",
				docvalue:"name"
			},
			{
				field:"input",
				type:"number",
				onChange: this.someFunction,
				lable:"Priority"
			},
			{
				field:"date",
				onChange: this.someFunction,
				lable:"Date"
			},
			{
				field:"select",
				onChange: this.someFunction,
				lable:"Type",
				options:[
					"Watering",
					"Prunning",
					"Repair",
					"Spraying"
				]
			},
			{
				field:"autoComplete",
				onChange: this.someFunction,
				lable:"Crew",
				doctype:"Crew",
				docvalue:"name",
				doclable:"crew_lead_full_name"
			}

		]
		return (
			<div>				
				<a 
					href="#" 
					className="btn btn-primary"
					onClick={function(){$('#'+ this.props.id).modal()}.bind(this)}
					>
					<span className="glyphicon glyphicon-plus"></span> New Work Order</a>
				<Modal 
					id={this.props.id} 
					submitText="Submit" 
					title="Create New Workorder"
					submit={this.onStatusChanged}>

					<Form
						id="CreateWorkorderForm"
						type="horizontal"
						fields={fields}
					/>

				</Modal>
			</div>
		);
	}
}
