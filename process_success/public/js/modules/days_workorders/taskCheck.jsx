/*jshint ignore:start */
export default class TaskCheck extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props.checked);
		this.taskChecked = this.taskChecked.bind(this);
	}
	taskChecked(e){
		this.props.taskChecked(this.props.index, this.props.checked);
	}
	render(){
		const checked = this.props.checked ? "line-through" : "";
		return(
			<div className="checkbox">
				<label className={checked}>
					<input onChange={this.taskChecked} type="checkbox" checked={this.props.checked} />
					{this.props.lable}
				</label>
			</div>
		);
	}	
}