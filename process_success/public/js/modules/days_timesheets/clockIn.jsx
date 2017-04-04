/*jshint ignore:start */
export default class ClockIn extends React.Component{
	constructor(props){
		super(props);
		this.toggleTimeInput=this.toggleTimeInput.bind(this);
		this.clockIn=this.clockIn.bind(this);
		this.clockOut=this.clockOut.bind(this);
		this.onChange=this.onChange.bind(this);

		this.state={
			date:new Date(),
			specifyTime:false
		};
		var d = new Date();

		console.log("STATE_______",this.state.specifyTime);
	}
	clockIn(e){
		e.preventDefault();
		if(this.state.specifyTime==false){
			var time=this.state.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',hour12: false})
			console.log(time);
			ps.successAlert("Clocked in at " + this.state.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
			this.props.clockIn(time, this.props.crew)
		}else{
			console.log(this.state.time)
			if(this.state.time!=undefined){
				this.props.clockIn(this.state.time, this.props.crew);
				ps.successAlert("Clocked in");
			}else{
				//invalid time error
				ps.failAlert("Invalid time.")
			}
		}
	}
	clockOut(e){
		e.preventDefault();
		if(this.state.specifyTime==false){
			var time=this.state.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',hour12: false})
			console.log(time);
			ps.successAlert("Clocked out at " + this.state.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})+" Have a great night!")
			this.props.clockOut(time, this.props.crew)
		}else{
			console.log(this.state.time)
			if(this.state.time!=undefined){
				this.props.clockOut(this.state.time, this.props.crew);
				ps.successAlert("Clocked Out!  Have a great night!");
			}else{
				//invalid time error
				ps.failAlert("Invalid time.")
			}
		}
	}
	toggleTimeInput(e){
		console.log(this.state.specifyTime);
		if(this.state.specifyTime){
			this.setState({specifyTime:false});
		}
		else{this.setState({specifyTime:true});}
	}
	onChange(e){
		this.setState({time:e.target.value});
	}
	componentDidMount() {
		this.timerID = setInterval(() => this.tick(),10000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
			date: new Date()
		});
	}
	render(){

	
		var values={
			'Created':[this.clockIn,'Clock In','btn btn-lg btn-success btn-block'],
			'Clocked In':[this.clockOut, 'Clock Out', 'btn btn-lg btn-success btn-block' ],
			'Clocked Out':[this.clockOut, 'Change Clockout Time','btn btn-lg btn-success btn-block'],
			'Subminted':['','Already Subminted','btn btn-lg btn-success btn-block'],
			'Aproved':['','Already Subminted','btn btn-lg btn-success btn-block']
		}[this.props.status];
		var input = ( <input type="button" className={values[2]} onClick={values[0]} value={values[1]} />);

		return(
			<div>
				<h3 className="text-center">
					Welcome <span className="username">{this.props.full_name}</span><br/> It is <span className="today">{this.state.date.toDateString()}</span>
				</h3>
				<h3 className="text-center">{this.state.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h3>
				<div className='clockIn'>
					<form className="form-checkin" role="form">
						{input}
						<br/>
						<div className='text-center'>
							<div className="text-center">
								<input 
									type="time" 
									className={this.state.specifyTime ? 'form-control small-time':'hidden'} 
									onChange={this.onChange}
								/>
							</div>
							<br/>
							<a className="btn btn-default" onClick={this.toggleTimeInput}>{this.state.specifyTime?' - Use Current Time':' + Specify a Clock In Time'}</a>
						</div>
					</form>
				</div>
			</div>
		);
	}
}