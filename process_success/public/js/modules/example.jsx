/*jshint ignore:start */

//_______________________________________
//           well commented 
//           example module  
//        uses the offline tool
//________________________________________

//Good start to make a new module
//good practice to lift all state to this entry point
//https://facebook.github.io/react/docs/lifting-state-up.html
//this uses a subcompnent that is not provided but you could just as easly replace with inline react

//Import Sub Modules
import WorkorderTask from './workorderTask';

export default class DaysWorkorders extends React.Component{
	constructor(props){
		super(props);
		var args={};
		//set the get filter props for ps.obj
		args.filter1=this.props.filter1;
		args.filter2=this.props.filter2;

		//init the state object.  Its ganna be an array!
		this.state={items:[]};

		//Section for all the bindings setup.  
		//So we dont forget to  function.bind(this)!
		/*     Do the bind thing      */
		this.onStatusChanged=this.onStatusChanged.bind(this);
		this.updateFromServer=this.updateFromServer.bind(this);
		/*    end Bind ding ding         */

		//init the object
		//the object should be defined in:
		//   public/js/core/ps.init_ob.js
		this.workorderTool=ps.initWorkorder();
		
		//Call the get function 
		//populates the items
		this.workorderTool.get(args,function(){
			//call the function that updates the state 
			this.updateFromServer();
			//Setup function for react
			//takes a callback to update/renderfunction
			//callback is used when a change is emiited from elsewhere
			this.workorderTool.reactSetup(this.updateFromServer);
		}.bind(this));

		//Finaly we set the state,  this is probably from local cache 
		//when the server call is done it will be set again from the update
		if (this.workorderTool.items===undefined ||this.workorderTool.items=== 0 ){
		}else{this.state.workorders=this.workorderTool.items;}
	}

	//action function
	onStatusChanged(status, index){
		//change the thing that changed in the tool object
		this.workorderTool.items[index].status=status;
		//Set state makes the module update
		this.setState({workorders:this.workorderTool.items});
		//run an update on the object
		//changes to server
		//sends out a change emmit
		this.workorderTool.update(this.workorderTool.items[index]);
	}
	//simple updates state from what in tool object
	updateFromServer(){
		this.setState({workorders:this.workorderTool.items});
	}

	//optinal helper function to build out a compnent 
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
		//handel empty return
		if (this.state.workorders===0||this.state.workorders==0){
			return (<div>No Workorders</div>);
		}
		//store output
		var output=[]
		//do some loop
		this.state.workorders.map(function(item, index){
			//you can add logic here to sort
			//add the workorder component to the output
			output.push(this.workorderObj(item,index));
		}.bind(this));


		console.log(this.workorderTool);
		return(
			<div className="workorder_container">
				{output}
			</div>
		);

	};	
}

