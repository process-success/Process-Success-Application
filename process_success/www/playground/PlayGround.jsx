import Acordian from '../../public/js/modules/utils/acordian'
import AcordianContent from '../../public/js/modules/utils/acordianContent'
import Form from '../../public/js/modules/utils/forms'


class DayWorkorder extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(<div>day workorder</div>);
	}
}
class TimeSheet extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(<div>Day Workorder</div>);
	}
}
class Tasks extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(<div>Tasks</div>);
	}
}
class ClockIn extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(<div>Clockin</div>);
	}
}
class PillTabs extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(<div>Clockin</div>);
	}
}
// <PillTabs
// 	content={[
// 		{"item 1":"content"},
// 		{"item 2":"content2"}
// 	]}>
// </PillTabs>
class DateSelectorContainer extends React.Component{
	constructor(props){
		super(props);
		this.dateChanged=this.dateChanged.bind(this);
		this.state={
			selectedDate:this.props.date
		};
	}
	dateChanged(e){
		this.setState({selectedDate:e.target.value});
		this.props.changeDate(e.target.value);
	}
	render(){
		return(
			<div>
			<Form
				className="center-block short"
				type="horizontal"
				fields={[{
					field:"date",
					value:this.state.selectedDate,
					onChange: this.dateChanged,
					className:"input-lg",
					key:"DateSelector"
				}]}
			/>
			</div>);
	}
}
// 1 workorder per crew per Day
// contains time sheet
//
class DaysWorkordersDash extends React.Component{
	constructor(props){
		super(props);

		this.workordersChanged=this.workordersChanged.bind(this);

		this.workorderTool = new ps.apiTool({date:ps.dateForServer(moment().format("MM/DD/YYYY"))},{doctype:"Day Work Order"},this.workordersChanged);
		this.state={
			date:moment().format("MM/DD/YYYY"),
			workorders:this.workorderTool.items
		};

	}
	workordersChanged(){
		this.setState({workorders:this.workorderTool.items});
		console.log(this.workorderTool.items);
	}
	render(){
		return(
			<div>
				<DateSelectorContainer
					date={this.state.date}
					changeDate={
						function(dateArg){
							this.workorderTool = new ps.apiTool({date:ps.dateForServer(dateArg)},{doctype:"Day Work Order"},this.workordersChanged);
							this.setState({date:dateArg})
						}.bind(this)
					}/>

			</div>
		);
	}
}


const app2= $('#app2')[0];
(function(){
	var filter={};
	frappe.ready(function(){
		ReactDOM.render(
			<div>Test<br/>
			<DaysWorkordersDash></DaysWorkordersDash>
		<br/>

				<a onClick={function(){
						console.log("createWorkorder");
					}}>Create Workorder</a>
				<a onClick={function(){
						console.log("create defaults");
						ps.apiTool
					}}>Create Default Workorders</a>
			</div>
		, app2 );
	})

})();

// export default class WorkordersDash extends React.Component{
// 	constructor(props){
// 		super(props);
// 		this.dateChanged=this.dateChanged.bind(this);
//
// 		this.state={
// 			crew:[],
// 			status:[],
// 			title:'',
// 			userinfo:this.currentUser.items,
// 			selectedDate:moment().format("MM/DD/YYYY")
// 		};
// 		console.log(this.currentUser.items.today);
// 		this.crewTool = new ps.apiTool({},{doctype:'Crew'},this.crewChanged);
// 		this.acordianId="crew-dash-acordian";
// 	}
//
// 	dateChanged(e){
// 		this.setState({selectedDate:e.target.value});
// 	}
// 	workOrderStatus(index){
// 		return function(items){
// 			var status="None";
// 			for (let item of items){
// 				if(item.status=="Started"){
// 					status="Working";
// 				}
// 				if(item.status=="Complete" && status!="Working"){
// 					status="Completed";
// 				}
// 				if(item.status=="Pending" && status=="Completed"){
// 					status="Driving";
// 				}
//
// 			}
// 			this.state.status[index]=status;
// 			this.setState({status:this.state.status});
// 		}.bind(this);
// 	}
//
// 	crewsAcordion(){
// 			//if all pending && clocked in driving
// 			//if not clocked in: not strated
// 			//clocked out: clocked out
//
//
// 		var convertedDate = moment(this.state.selectedDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
// 		var output=[];
// 		this.state.crew.map(function(item, index){
// 			if(this.state.status[index]===undefined){
// 				this.state.status[index]="No Work Orders";
// 			}
// 			output.push((
// 				<AcordianContent
// 					key={this.acordianId+index}
// 					id={this.acordianId+index}
// 					title={item.crew_name}
// 					active={(index===0)?true:false}
// 					parentId={this.acordianId}
// 				>
// 					{this.state.status[index]}
// 					<DaysWorkorders
// 						date={convertedDate}
// 						crew={item.name}
// 						statusUpdate={this.workOrderStatus(index)}
// 					/>
// 				</AcordianContent>));
// 		}.bind(this));
// 		return (<div>
// 			<Form
// 				className="center-block short"
// 				type="horizontal"
// 				id="date_select_form"
// 				fields={[{
// 					field:"date",
// 					value:this.state.selectedDate,
// 					onChange: this.dateChanged,
// 					className:"input-lg",
// 					key:"other3"
// 				}]}
// 			/>
// 			<Acordian id={this.acordianId}>
// 				{output}
// 			</Acordian>
// 			</div>
// 		);
// 	}
// 	render(){
// 		return(<div>{this.crewsAcordion()}</div>);
// 	}
// }














// class CreateWorkorder extends React.Component{
// 	constructor(props){
// 		super(props);
// 	}
// 	//<AffixWrapper className="sticky_subnav text-center"  offset={140} height="40px"></AffixWrapper>
// 	someFunction(){

// 	}
// 	render(){
// 		var fields=[
// 			{
// 				field:"header",
// 				lable:"TESTING"
// 			},

// 			{
// 				field:"input",
// 				onChange: this.someFunction,
// 				lable:"test"
// 			},
// 			{
// 				field:"lable",
// 				lable:"TESXSDF"
// 			},
// 			{
// 				field:"input",
// 				onChange: this.someFunction,
// 				lable:"test2"
// 			},
// 			{
// 				field:"date",
// 				onChange: this.someFunction,
// 				lable:"Date"
// 			},
// 			{
// 				field:"select",
// 				onChange: this.someFunction,
// 				lable:"test2",
// 				options:[
// 					{
// 						group: "thing",
// 						options: [
// 							"one",
// 							"two",
// 							"three"
// 						]
// 					},
// 					{
// 						group: "thing2",
// 						options: [
// 							"one",
// 							"two",
// 							"three"
// 						]
// 					}
// 				]
// 			},
// 			{
// 				field:"select",
// 				onChange: this.someFunction,
// 				lable:"test2",
// 				value:"two",
// 				options:[
// 					"one",
// 					"two",
// 					"three"
// 				]
// 			},
// 			{
// 				field:"check",
// 				className:"big-checkbox",
// 				onChange: function(e){console.log(e.target.checked)},
// 				lable:"this is a test"
// 			},
// 			{
// 				lable:"Test Text Area",
// 				field:"textarea",
// 				className:"",
// 				onChange: this.someFunction
// 			},
// 			{
// 				field:"autoComplete",
// 				onChange: this.someFunction,
// 				lable:"Vineyard",
// 				doctype:"Vineyard",
// 				docvalue:"name"
// 			},
// 			{
// 				field:"autoComplete",
// 				onChange: this.someFunction,
// 				lable:"Customer",
// 				doctype:"Customer",
// 				doclable:"full_name",
// 				docvalue:"name"
// 			}
// 		]
// 		return(
// 			<div>
// 			<Form
// 				type="horizontal"
// 				fields={fields}
// 				id="thing"
// 			>

// 			</Form>
// 			</div>
// 		);
// 	}
// }


/*			<DoctypeForm
				close={this.close}
				itemChange={this.onChange}
				create={this.create}
				edit={this.update}
				delete={this.delete}
				mode={this.state.formMode}
				item={item}
				id={this.props.workorder}

				doctype="Spraying"
				season={ {active:1}}
				note={ {
					active:1,
					type:"textarea"
				}}
				spray_type={ {active:1}}
			/> 	*/





// const app2= $('#app2')[0];
// (function(){
// 	var filter={};
// 	frappe.ready(function(){
// 		ReactDOM.render(
// 			<div><DoctypeForm
// 				id="createPrunEntry"
// 				doctype="Pruning"
// 				season={  {active:1}  }
// 				note={ {
// 					active:1,
// 					type:"textarea"
// 				}}
// 				type={ {active:1} }
// 				b_lock={ {active:1}}
// 				removed={ {active:1}}
// 				pre_prune={ {active:1}}
// 				tap_removed={ {active:1}}
// 			/> <CreateWorkorder /></div>	, app2 );
// 	})

// })();

// const app2= $('#app2')[0];
// (function(){
// 	var filter={};
// 	frappe.ready(function(){
// 		ReactDOM.render( <SprayTable filter={filter} /> , app2 );
// 	})

// })();
