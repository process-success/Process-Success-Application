
import Acordian from '../../public/js/modules/utils/acordian'
import AcordianContent from '../../public/js/modules/utils/acordianContent'
import DaysWorkorders from '../../public/js/modules/days_workorders/daysWorkorders'
import Form from '../../public/js/modules/utils/forms'

export default class CrewDash extends React.Component{
	constructor(props){
		super(props);

		this.crewChanged=this.crewChanged.bind(this);
		this.crewsAcordion=this.crewsAcordion.bind(this);
		this.dateChanged=this.dateChanged.bind(this);
		this.workOrderStatus=this.workOrderStatus.bind(this);


		this.currentUser=ps.initCurrentUser();
		this.currentUser.get({},function(items){
			if(this.currentUser.items.username=="Guest"){
				window.location = "/login";
			}else{
				$(document).trigger("userLoaded");
				//console.log("after Load",this.currentUser.items);
			}
		}.bind(this)); 
		//this.state={};
		this.state={
			crew:[],
			status:[],
			title:'',
			userinfo:this.currentUser.items,
			selectedDate:moment().format("MM/DD/YYYY")
		};
		console.log(this.currentUser.items.today);
		this.crewTool = new ps.apiTool({},{doctype:'Crew'},this.crewChanged);
		this.acordianId="crew-dash-acordian";
	}

  	crewChanged(){
		this.setState({crew:this.crewTool.items});
	}
	dateChanged(e){
		this.setState({selectedDate:e.target.value});
	}
	workOrderStatus(index){
		return function(items){
			var status="None";
			for (let item of items){
				if(item.status=="Started"){
					status="Working";
				}
				if(item.status=="Complete" && status!="Working"){
					status="Completed";
				}
				if(item.status=="Pending" && status=="Completed"){
					status="Driving";
				}

			}
			this.state.status[index]=status;
			this.setState({status:this.state.status});
		}.bind(this);
	}

	crewsAcordion(){
			//if all pending && clocked in driving
			//if not clocked in: not strated
			//clocked out: clocked out


		var convertedDate = moment(this.state.selectedDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
		var output=[];
		this.state.crew.map(function(item, index){
			if(this.state.status[index]===undefined){
				this.state.status[index]="No Work Orders";
			}
			output.push((
				<AcordianContent
					key={this.acordianId+index}
					id={this.acordianId+index}
					title={item.crew_name}
					active={(index===0)?true:false}
					parentId={this.acordianId}
				>
					{this.state.status[index]}
					<DaysWorkorders 
						date={convertedDate}
						crew={item.name}
						statusUpdate={this.workOrderStatus(index)}
					/>
				</AcordianContent>));	
		}.bind(this));
		return (<div>
			<Form
				className="center-block short"
				type="horizontal"
				fields={[{
					field:"date",
					value:this.state.selectedDate,
					onChange: this.dateChanged,
					className:"input-lg",
					key:"other3"
				}]}
			/>
			<Acordian id={this.acordianId}>
				{output}
			</Acordian>
			</div>
		);
	}
	render(){
		return(<div>{this.crewsAcordion()}</div>);
	}
}


const app= $('#app')[0];
(function(){
	frappe.ready(function(){
		ReactDOM.render( 
		<CrewDash />,app );
	})

})();
