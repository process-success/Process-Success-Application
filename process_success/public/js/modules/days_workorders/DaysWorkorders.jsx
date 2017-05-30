/*jshint ignore:start */
import WorkorderTask from './workorderTask';


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
		//this.workorderObj=this.onStatusChanged.bind(this);
		/*          end          */

		this.state={workorders:[]};

		var args={};
		 args.crew=this.props.crew;
		args.date=this.props.date;
		this.workorderTool = new ps.apiTool(args,ps.apiSetup.workOrders,this.workOrderChanged);

		if (this.workorderTool.items===undefined ||this.workorderTool.items=== 0 ||this.workorderTool.items===null ){

		}else{this.state.workorders=this.workorderTool.items;}
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
		return(
			<div className="workorder_container">
				<div><br/>
					{todo}
				</div>
				<div className="clearfix"></div>
				<div><h3>Complete Workorders</h3>
					{complete}
				</div>
			</div>
		);

	};	
}
