/*jshint ignore:start */
export default class TaskCheck extends React.Component{
	constructor(props){
		super(props);
		this.taskChecked = this.taskChecked.bind(this);
	}
	taskChecked(e){
		this.props.taskChecked(this.props.index, this.props.checked);
	}
	render(){
		const checked = this.props.checked ? "line-through" : "";
		return(
			<div className="checkbox row">
				<div className="col-xs-8">
				<label className={checked}>
					<input 
						className="big-checkbox" 
						onChange={function(){this.props.taskChecked(this.props.item, checked);}.bind(this)} 
						type="checkbox" 
						checked={this.props.checked} />
					{this.props.lable}
				</label>
				</div>
				<div className="edit col-xs-4"> 
					<button 
						type="button" 
						className="btn btn-default inline-task"
						onClick={this.props.editTask}
						>
						<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
					</button>
				</div>
			</div>
		);
	}	
}