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

		this.state={page:this.props.defaultPage};

		$(window).on("hashchange", function() {
			this.handelRoute();
		}.bind(this));

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
		console.log(this.state.page);
		return(
			<div>
				
					<ul className="nav nav-pills center-pills">
						<li onClick={this.mainClicked} role="presentation" className={this.state.page=='main'?'active':''}><a href="#main">Main</a></li>
						<li onClick={this.workordersClicked} role="presentation" className={this.state.page=='workorders'?'active':''}><a href="#workorders">Workorders</a></li>
						<li onClick={this.timesheetClicked} role="presentation" className={this.state.page=='timesheet'?'active':''}><a href="#timesheet">Time Sheets</a></li>
					</ul>
					<br/>
				<div className={this.state.page=='timesheet' || this.state.page=='main'?'':'hidden'}>
					<DaysTimesheets 
						date={this.props.date}
						full_name={this.props.full_name}
						page={this.state.page}
						crew={this.props.crew} 
					/>
				</div>
				<div className={this.state.page=='workorders'?'':'hidden'}>
					<DaysWorkorders 
						crew={this.props.crew} 
						date={this.props.date}
						//completed={this.state.completed}
						//inprogress={this.state.inprogress}
					/>
				</div>
			</div>
		);
	}
}
class AffixWrapper extends React.Component{

	constructor() {
		super();
		this.handleScroll=this.handleScroll.bind(this);
		this.state = {affix: false,};
	}

	handleScroll() {
		var affix = this.state.affix;
		var offset = this.props.offset;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (!affix && scrollTop >= offset) {
			this.setState({affix: true});
		}
		if (affix && scrollTop < offset) {
			this.setState({affix: false});
		}
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	render() {
		const affix = this.state.affix ? 'affix' : '';
		const className = this.props.className + ' ' + affix;
		const placeholder= this.state.affix ? (<div className={this.props.className}></div>):'';

		return (
			<div>
				{placeholder}
				<div className={className} height={this.props.height}>
					{this.props.children}
				</div>
			</div>
		);
	}
}



(function(){
	var currentUser=ps.initCurrentUser();
	currentUser.get({},function(){
		if(currentUser.items.username=="Guest"){
			window.location = "/login";
		}
	});
	currentUser.items;
	var tool=ps.initEmployeeList();
	
	tool.get({},function(){
		var lables = tool.items.map(function(obj) { 
			var rObj = {};
			rObj.label=obj.full_name;
			rObj.value=obj.name;
			return rObj;
		});
		ps.employee_lables=lables;
		var route = window.location.hash.slice(1);
		if(!route) route = "main";
		if (!window.location.hash) {
			window.location.hash = "#main";
		}
		$(window).trigger("hashchange");
		ReactDOM.render( 
			<WorkPage
				full_name={currentUser.items.current_user.full_name}
				crew={currentUser.items.crew}
				date={currentUser.items.today}
				defaultPage={route}
			/>
		, timesheets );
	});
	
	


})();




frappe.ready(function(){
	// var currentUser=ps.initCurrentUser();
	// currentUser.get({},function(){});
	//if(frappe.user_id=="Guest"){window.location = "/login";}
	// var args={};
	// args.date='2017-03-30';
	// var timesheetTool=ps.initTimeSheets()
	// timesheetTool.get({date:'2017-03-30'},function(){

	// });

});
