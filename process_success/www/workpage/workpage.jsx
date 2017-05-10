/*jshint ignore:start */
import DaysWorkorders from '../../public/js/modules/days_workorders/DaysWorkorders'
import DaysTimesheets from '../../public/js/modules/days_timesheets/DaysTimeSheets'

//const app= document.getElementById('app');
const app= $('#app')[0];
const timesheets= $('#time')[0];

class WorkPage extends React.Component{
	constructor(props){
		super(props);

		/* bind ding ding */
		this.mainClicked=this.mainClicked.bind(this);
		this.workordersClicked=this.workordersClicked.bind(this);
		this.timesheetClicked=this.timesheetClicked.bind(this);
		this.handelClockIn=this.handelClockIn.bind(this);
		this.handelRoute=this.handelRoute.bind(this);
		this.stateUpdate=this.stateUpdate.bind(this);
		

		//Handel User lOad
		this.currentUser=ps.initCurrentUser();
		this.currentUser.get({},function(items){
			if(this.currentUser.items.username=="Guest"){
				window.location = "/login";
			}else{
				$(document).trigger("userLoaded");
				//console.log("after Load",this.currentUser.items);
			}
		}.bind(this));
		this.state={items:this.currentUser.items};
		$(document).bind('userLoaded',this.stateUpdate);


		//Routing
		$(window).on("hashchange", function() {
			this.handelRoute();
		}.bind(this));
		var route = window.location.hash.slice(1);
		if(!route) route = "#main";
		this.state.page=route;
		if (!window.location.hash) {
			window.location.hash = "#main";
		}
		$(window).trigger("hashchange");

	}
	componentDidMount(){
		
	}
	stateUpdate(){
		//alert("update");
		this.state.items=this.currentUser.items;
		this.setState(this.state);

	}
	handelRoute(){
		var route = window.location.hash.slice(1);
		var pages={
			main:this.mainClicked,
			workorders:this.workordersClicked,
			timesheet:this.timesheetClicked
		}[route]();
	}
	handelClockIn(){

	}
	mainClicked(){
		this.setState({page:'main'});
	}
	workordersClicked(){

		this.setState({page:'workorders'});

	}
	timesheetClicked(){
		this.setState({page:'timesheet'});

	}
	//<AffixWrapper className="sticky_subnav text-center"  offset={140} height="40px"></AffixWrapper>
	render(){
		var output='';
		if (this.state.items.username=="Guest"||this.state.items.username=="Administrator"){
			output=(<h3>Guest Or Admin</h3>);
		}
		else if(this.state.items.length===0){
			output=(<h3>No User Data</h3>);
		}
		else{
			output=(
				<div>
					<ul className="nav nav-pills center-pills">
						<li onClick={this.mainClicked} role="presentation" className={this.state.page=='main'?'active':''}><a href="#main">Main</a></li>
						<li onClick={this.workordersClicked} role="presentation" className={this.state.page=='workorders'?'active':''}><a href="#workorders">Workorders</a></li>
						<li onClick={this.timesheetClicked} role="presentation" className={this.state.page=='timesheet'?'active':''}><a href="#timesheet">Time Sheets</a></li>
					</ul>
					<br/>
					<div className={this.state.page=='timesheet' || this.state.page=='main'?'':'hidden'}>
						<DaysTimesheets 
							date={this.state.items.today}
							full_name={this.state.items.current_user.full_name}
							page={this.state.page}
							crew={this.state.items.crew}
						/>
					</div>
					<div className={this.state.page=='workorders'?'':'hidden'}>
						<DaysWorkorders 
							crew={this.state.items.crew} 
							date={this.state.items.today}
							//completed={this.state.completed}
							//inprogress={this.state.inprogress}
						/>
					</div>
				</div>
			);
		}

		return(<div>
			{output}
			</div>
		);
	}
}

(function(){
	frappe.ready(function(){
		ReactDOM.render( 
		<WorkPage />
	, timesheets );
	})

})();





