/*jshint ignore:start */
import EmployeeTime from './employeeTime';
import TimeSheet from './timeSheet';
import ClockIn from './clockin';

export default class DaysTimeSheets extends React.Component{
	constructor(props){
		super(props);
		this.state={items:[]};
		this.state.time='';
		this.add={};

		/*     Do the bind thing      */

		//Time employee line item
		this.timeChanged=this.timeChanged.bind(this);
		this.updateTime=this.updateTime.bind(this);
		this.deleteEmployee=this.deleteEmployee.bind(this);

		this.updateFromServer=this.updateFromServer.bind(this);
		this.timeSheetWrapper=this.timeSheetWrapper.bind(this);

		this.addEmployee=this.addEmployee.bind(this)
		this.updateFromServerParam=this.updateFromServerParam.bind(this);

		this.clockIn=this.clockIn.bind(this);
		this.clockOut=this.clockOut.bind(this);
		/*    end Bind ding ding         */

		this.autocompleteArr=[];
		var args={};
		this.objTool=ps.initTimeSheets()
		this.objTool.get({date:props.date},function(){
			this.updateFromServer();
			this.objTool.reactSetup(this.updateFromServer);
		}.bind(this));

		if (this.objTool.items===undefined ||this.objTool.items=== 0 ){
		}else{this.state.items=this.objTool.items;}
		

		

	}


	//------------------
	// helper Function
	//------------------
	updateFromServer(){
		console.log("UPDATE");
		this.setState({items:this.objTool.items});
	}
	updateFromServerParam(data,index){
		this.objTool.items[index]=data;
		this.setState({items:this.objTool.items});
	}
	crewsTimesheetIndex(crew){
		for (var i=0; i < this.objTool.items.length; i++){
			var item=this.objTool.items[i];
			if(item.crew==crew){
				return i;
			}
		}
	}
	getIndexTimesheet(timesheet){
		return this.objTool.get_index_of_item(timesheet);
	}
	getIndexEmployee(timesheetIndex,employeeName){
		var employees=this.objTool.items[timesheetIndex].employees;
		for (var i = 0; i < employees.length; i++){
			if (employeeName==employees[i].employee){
				return i;
			}
		}

	}


	//------------------------------------------
	//       Timesheet Wrapper Functions
	//------------------------------------------	

	clockIn(time,crew){

		var ts_index=this.crewsTimesheetIndex(crew);

		this.objTool.items[ts_index].employees;
		for (var i=0; i < this.objTool.items[ts_index].employees.length; i++){
			this.objTool.items[ts_index].employees[i].start=time;
		}
		this.objTool.items[ts_index].status="Clocked In";
		this.objTool.update(this.objTool.items[ts_index]);
		this.setState({items:this.objTool.items});
	}
	clockOut(time,crew){

		var ts_index=this.crewsTimesheetIndex(crew);

		this.objTool.items[ts_index].employees;
		for (var i=0; i < this.objTool.items[ts_index].employees.length; i++){
			this.objTool.items[ts_index].employees[i].end=time;
		}
		this.objTool.items[ts_index].status="Clocked Out";
		this.objTool.update(this.objTool.items[ts_index]);
		this.setState({items:this.objTool.items});
	}
	addEmployee(ts_name, employee_name){
		var ts_index = this.getIndexTimesheet(ts_name);
		var employeeIndex = this.getIndexEmployee(ts_index,employee_name);

		var updateCallback=function(index){
			return function(data){			
				this.updateFromServerParam(data,index);
			}.bind(this);
		}.bind(this);

		for (var i=0; i < this.objTool.items.length; i++){
			var item = this.objTool.items[i];
			if(item.name==ts_name){
				for (var x=0; x < item.employees.length; x++){
					var container = item.employees[x];
					if (container.employee==employee_name){
						return "duplicate";
					}
				}
				this.objTool.items[i].employees.push({ employee : employee_name, new:'1'});
				this.objTool.update(this.objTool.items[i],updateCallback(i),1);
			}else{
				var done=1;
				if(item.employees.length>0){
					for (var x=0; x < item.employees.length && done; x++){
						var container = item.employees[x];
						if (container.employee==employee_name){
							this.objTool.items[i].employees.splice(x, 1);
							this.objTool.changed(this.objTool.items[i]);
							done=0;
						}
					}
				}
			}
		}

	};
	//------------------------------------------
	//           Timesheet Wrapper
	//------------------------------------------	
	timeSheetWrapper(item,index){
		var employee_output=[];
		if(item.employees===undefined){

		}
		else{
			var employeeOutput=item.employees.map(function(item_employee,index_employee){
			 	employee_output.push(this.employeeLineItem(item_employee,item.name,index_employee));
			}.bind(this));
		}

		return(

			<TimeSheet 
				name={item.name}
				date={item.date}
				crew={item.crew}
				employees={employee_output}
				addEmployee={this.addEmployee}
				onUpdate={this.update}
			/>

		);
	}



	//------------------------------------------
	//       Employee Time Form Lineitem
	//------------------------------------------
	deleteEmployee(employee,timesheet){
		var ts_index = this.getIndexTimesheet(timesheet);
		var done=1;
		var item=this.objTool.items[ts_index];
		if(item.employees.length>0){
			for (var x=0; x < item.employees.length && done; x++){
				var container = item.employees[x];
				if (container.employee==employee){
					this.objTool.items[ts_index].employees.splice(x, 1);
					console.log(this.objTool.items[ts_index]);
					this.objTool.update(this.objTool.items[ts_index]);
					this.setState({items:this.objTool.items});
					done=0;
				}
			}
		}
	}

	timeChanged(position,employee,timesheet,value){
		var ts_index = this.getIndexTimesheet(timesheet);
		var employeeIndex = this.getIndexEmployee(ts_index,employee);
		this.stat
		if(position=='end'){
			this.state.items[ts_index].employees[employeeIndex].end=value;
		}
		else{this.state.items[ts_index].employees[employeeIndex].start=value}
	    this.setState({items:this.state.items});
	}
	updateTime(position,employee,timesheet,value){
		var ts_index = this.getIndexTimesheet(timesheet);
		var employeeIndex = this.getIndexEmployee(ts_index,employee);
		var save=0;
		value=ps.time_add_digits(value)
		if(position=='end' && ps.time_add_front_zero(this.objTool.items[ts_index].employees[employeeIndex].end) != ps.time_add_digits(value)){ 
			this.objTool.items[ts_index].employees[employeeIndex].end=ps.time_add_digits(value);
			save=1;
		}
	    if(position=='start' && ps.time_add_front_zero(this.objTool.items[ts_index].employees[employeeIndex].start) != ps.time_add_digits(value)){
	    	this.objTool.items[ts_index].employees[employeeIndex].start=ps.time_add_digits(value);
	    	save=1;
	    }
	    if(save){
		    this.setState({items:this.objTool.items});
		    this.objTool.update(this.objTool.items[ts_index],function(){
		    	ps.successAlert(this.objTool.items[ts_index].employees[employeeIndex].employee_name+" time updated!");
		    }.bind(this));
		}
	}
	employeeLineItem(employee_container,time_sheet,employee_index){
		return(
			<EmployeeTime
				key={employee_index}
				timesheet={time_sheet}
				employee_name={employee_container.employee_name}
				employee={employee_container.employee}
				start={ps.time_add_front_zero(employee_container.start)}
				end={ps.time_add_front_zero(employee_container.end)}
				updateTime={this.updateTime}
				timeChanged={this.timeChanged}
				deleteEmployee={this.deleteEmployee}
			/>
		);
	}



	//-----------------------
	//        Render
	//-----------------------
	render(){
		//handel empty return
		if (this.state.items===0||this.state.items===undefined){
			return (<div>No Time Sheets, start by <a href="/desk">creating some crews!</a></div>);
		}
		var output=[]
		this.state.items.map(function(item, index){
			if(item.crew==this.props.crew){
				output.unshift(this.timeSheetWrapper(item,index));
			}else{
				output.push(this.timeSheetWrapper(item,index));
			}
		}.bind(this));

		var ts_index=this.crewsTimesheetIndex(this.props.crew);

		//MAIN RENDER
		return(
			<div>
				<div className={this.props.page=='main'?'':'hidden'}>
					<ClockIn
						clockIn={this.clockIn}
						clockOut={this.clockOut}
						status={this.state.items[ts_index].status}
						full_name={this.props.full_name}
						date={this.props.date}
						crew={this.props.crew}
					/>
				</div>
				<div className={this.props.page=='timesheet'?'':'hidden'}>
					<br/>
					{output}
				</div>
			</div>

		);

	};	
}





