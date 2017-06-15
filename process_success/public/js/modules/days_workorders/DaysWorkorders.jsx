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
		this.createWorkorder=this.createWorkorder.bind(this);
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
	createWorkorder(item){
		item.date=moment(item.date,"MM/DD/YYYY").format('YYYY-MM-DD');
		this.workorderTool.create(item,function(item){
			ps.successAlert("Workorder " +item.name+ " created.")
		});

	}
	workorderObj(item,index){
		return(
			<WorkorderTask 
				key={index + this.props.crew} 
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
				if(todo.length+1%4===0){

					todo.push(<div className='clearfix spacer'></div>)
				}
			}else{
				complete.push(this.workorderObj(item,index));
				if(complete.length%3===0){complete.push(<div className='clearfix spacer'></div>)}
			}
		}.bind(this));
		var completeHeader=(<h3>Complete Work Orders</h3>);
		if(complete.length==0){
			completeHeader="";
		}

		// var date=this.props.date;
		// date=moment(date,'YYYY-MM-DD').format("MM/DD/YYYY");
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
					date={moment(this.props.date,'YYYY-MM-DD').format("MM/DD/YYYY")}
					createWorkorder={this.createWorkorder}
				/>

			</div>
		);

	};	
}

export class WorkorderFormModal extends React.Component{
	constructor(props){
		super(props);

		this.submit=this.submit.bind(this);
		this.state={
			location:"",
			priority:1,
			type:"Pruning",
			status:"Pending",
			date:this.props.date,
			crew:this.props.crew
		}
	}

	submit(e){
		if(this.state.location=="" ||this.state.crew=="" || (moment(this.state.date,"MM/DD/YYYY").isValid())!==true){
			console.log("not valid");
		}else{
			var copy=ps.clone(this.state);
			$('#'+ this.props.id).modal('hide')
			this.setState({location:""})
			this.props.createWorkorder(copy);
		}
	}
	render(){
		var fields=[		
			{
				field:"autoComplete",
				onChange: function(e){
					this.setState({location:e.target.value})
				}.bind(this),
				value:this.state.location,
				required:true,
				lable:"Vineyard",
				doctype:"Vineyard",
				docvalue:"name"
			},
			{
				field:"input",
				className:"vineyard-input",
				type:"number",
				onChange: function(e){
					this.setState({priority:e.target.value})
				}.bind(this),
				value:this.state.priority,
				lable:"Priority"
			},
			{
				field:"date",
				required:true,
				onChange: function(e){
					this.setState({date:e.target.value});
				}.bind(this),
				value:this.state.date,
				lable:"Date"
			},
			{
				field:"select",
				onChange: function(e){
					this.setState({type:e.target.value})
				}.bind(this),
				value:this.state.type,
				lable:"Type",
				options:[
					"Watering",
					"Pruning",
					"Repair",
					"Spraying"
				]
			},
			{
				field:"select",
				onChange: function(e){
					this.setState({status:e.target.value})
				}.bind(this),
				value:this.state.status,
				lable:"Status",
				disabled:true,
				options:[
					"Pending"
				]
			},
			{
				field:"autoComplete",
				onChange: this.someFunction,
				lable:"Crew",
				required:true,
				readonly:"ture",
				doctype:"Crew",
				docvalue:"name",
				doclable:"crew_lead_full_name",
				onChange: function(e){
					this.setState({crew:e.target.value})
				}.bind(this),
				value:this.state.crew,
			},
			{
				field:"button",
				type:"submit",
				value:"Create Work Order",
				className:"btn-primary pull-right",
				onClick:this.submit
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
					submit={false}
					>

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
