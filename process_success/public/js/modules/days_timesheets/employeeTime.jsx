
/*jshint ignore:start */
export default class DaysTimeSheets extends React.Component{
	constructor(props){
		super(props);
		//Binding ding
		this.changedStart=this.changedStart.bind(this)
		this.changedEnd=this.changedEnd.bind(this);
		this.updateStart=this.updateStart.bind(this);
		this.updateEnd=this.updateEnd.bind(this);
		this.delete=this.delete.bind(this);
		this.keyPressedStart=this.keyPressedStart.bind(this);
		this.keyPressedEnd=this.keyPressedEnd.bind(this);
	}
	changedStart(e){
		this.props.timeChanged  ('start',this.props.employee,this.props.timesheet,e.target.value);
	}
	changedEnd(e){
		this.props.timeChanged('end',this.props.employee,this.props.timesheet,e.target.value);
	}
	updateStart(e){
		if(e.target.value!=''){
			this.props.updateTime('start',this.props.employee,this.props.timesheet, e.target.value);
		}
	}
	updateEnd(e){
		if(e.target.value!=''){
			this.props.updateTime('end',this.props.employee,this.props.timesheet, e.target.value);
		}
	}
	delete(e){
		e.preventDefault();
		this.props.deleteEmployee(this.props.employee,this.props.timesheet);
	}
	keyPressedStart(e) {
	    if (e.key === 'Enter') {
	    	e.preventDefault();
	    	if(this.props.start!=''){
				this.props.updateTime('start',this.props.employee,this.props.timesheet, this.props.start);
			}
	    }
	 }
	keyPressedEnd(e) {
	    if (e.key === 'Enter') {
	    	e.preventDefault();
	    	if(this.props.end!=''){
				this.props.updateTime('start',this.props.employee,this.props.timesheet, this.props.end);
			}
	    }
	 }
	render(){
		return(
			<li className="list-group-item" >
				<form  className="form-inline row day_time_form_row">
					<label className="control-label col-md-3 col-sm-3 col-xs-12 text-center day_time_form_row_element"><strong>{ this.props.employee_name}</strong></label>

					<div className="col-md-3 col-sm-3 col-xs-6 day_time_form_row_element">
						<div className="input-group">
							<div className="input-group-addon">Start</div>
							<input 
								type="time" 
								className="form-control start" 
								value={this.props.start}
								onBlur={this.updateStart}
								onChange={this.changedStart}
								onKeyPress={this.keyPressedStart}

							/>
						</div>
					</div>
					
					<div className="col-md-3 col-sm-3 col-xs-6 day_time_form_row_element">
						<div className="input-group">
							<div className="input-group-addon">End</div>
							<input 
								type="time" 
								className="form-control end" 
								value={this.props.end}
								onBlur={this.updateEnd}
								onChange={this.changedEnd}
								onKeyPress={this.keyPressedEnd}
							/>
						</div>
					</div>

					<div className="col-md-3 col-sm-3 col-xs-12 text-center day_time_form_row_element">
						<button 
							className="delete btn btn-danger"
							onClick={this.delete}
						>Delete</button>
					</div>
				</form>
			</li>
		);
	}
}