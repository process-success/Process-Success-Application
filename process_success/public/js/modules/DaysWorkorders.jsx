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
		this.updateFromServer=this.updateFromServer.bind(this);
		this.socketUpdate=this.socketUpdate.bind(this);
		//this.workorderObj=this.onStatusChanged.bind(this);
		/*          end          */

		this.state={workorders:[]};
		this.workorderTool=ps.initWorkorder();
		this.workorderTool.get(args,function(){
			this.updateFromServer();
			this.workorderTool.reactSetup(this.updateFromServer);
		}.bind(this));
		if (this.workorderTool.items===undefined ||this.workorderTool.items=== 0 ){

		}else{this.state.workorders=this.workorderTool.items;}
	}
	socketUpdate(){

	}
	onTaskChecked(wo_index,index,check){
		this.workorderTool.items[wo_index].subtask[index].status=check?0:1;
		this.setState({workorders:this.workorderTool.items});
		this.workorderTool.update(this.workorderTool.items[wo_index]);
	}
	onStatusChanged(status, index){
		this.workorderTool.items[index].status=status;
		this.setState({workorders:this.workorderTool.items});
		this.workorderTool.update(this.workorderTool.items[index]);
	}
	updateFromServer(){
		console.log("UPDATE FROM SERVER CALLED");
		this.setState({workorders:this.workorderTool.items});
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
		if (this.state.workorders===0||this.state.workorders==0){
			return (<div>No Workorders</div>);
		}
		var todo=[];
		var complete=[];
		this.state.workorders.map(function(item, index){
			if (item.status!='Complete'||item.status!='Incomplete'){
				todo.push(this.workorderObj(item,index));
			}else{
				complete.push(this.workorderObj(item,index));
			}
		}.bind(this));
		return(
			<div className="workorder_container">
				<div><h1>Workorders</h1>
					{todo}
				</div>
				<div><h1>Complete</h1>
					{complete}
				</div>
			</div>
		);

	};	
}
