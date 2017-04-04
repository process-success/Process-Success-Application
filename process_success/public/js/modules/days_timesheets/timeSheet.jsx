/*jshint ignore:start */

export default class TimeSheet extends React.Component{
	constructor(props){
		super(props);
		/*     Do the bind thing      */
		this.autocomplete=this.autocomplete.bind(this);
		this.addChanged=this.addChanged.bind(this);
		this.addClicked=this.addClicked.bind(this);

	}

	autocomplete(input){
		var config = {
			minChars: 0,
			maxItems: 99,
			autoFirst: true,
			filter: function(item, input) {
				var value = item.value.toLowerCase();
				if(value.indexOf('is_action') !== -1 ||
					value.indexOf(input) !== -1) {
					return true;
				}
			},
			item: function(item, input) {
				var d = item;
				var html = "<span>" + __(item.label || item.value) + "</span>";
				return $('<li></li>')
					.data('item.autocomplete', item)
					.html('<a><p>' + html + '</p></a>')
					.get(0);
			}
		};
		var aw = new Awesomplete(input,config);
		input.addEventListener(
			'awesomplete-selectcomplete',
				this.addChanged
		);
		aw.list=ps.employee_lables;
	}
	addChanged(e){
		this.add=e.target.value;
	};
	addClicked(e){
		e.preventDefault();
		var wo_name=this.props.name;
		var employee_name=this.add;
		//Call back for binding?
		var updateCallback=function(index){
			return function(data){			
				this.updateFromServerParam(data,index);
			}.bind(this);
		}.bind(this);
		this.props.addEmployee(wo_name, employee_name);
	};
	render(){
		return(
			<div className="panel panel-default row">

				<div className="panel-heading">
					<h4 className="text-center"> Time Sheet {this.props.date} for {this.props.crew} </h4>
				</div>

				<ul className="list-group" >
					<div id='forms'>
						{this.props.employees}
					</div>
				</ul>
			  
				<div className="panel-footer col-md-12 text-left list-group-item">
					<form className="form-inline row ">
						<div className="text-center col-md-3 col-sm-2 col-xs-12 update_div_element">
							<button type="button" className="btn btn-success">Update</button>
						</div>
						<div className="text-right col-md-6 col-sm-6 col-xs-4 ">
							<button 
								type="submit" 
								className="btn btn-default"
								onClick={this.addClicked}
								>+ Add</button>
						</div>
						<div className="form-group text-left col-md-3 col-sm-4 col-xs-6 "><div className="input-group">
							<input type="text" 
								ref={this.autocomplete}
          						onChange={this.addChanged} 
          						className="new_employees form-control awesomplete" 
          						placeholder="employee" />
						</div></div>
					</form>
					
				</div>
			</div>
		);
	}
}

