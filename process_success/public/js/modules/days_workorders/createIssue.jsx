/*jshint ignore:start */
import Modal from '../utils/modal'

export default class CreateIssue extends React.Component{
	constructor(props){
		super(props)
		this.popUp=this.popUp.bind(this);
		this.popUpId="create-issue-form-"+this.props.workorder;
	}
	toolTip(){
		$(function () {
		 	$('[data-toggle="tooltip"]').tooltip();
		})
		
	}
	popUp(){
		$('#'+this.popUpId).modal();
	}
	submit(){
		this.objTool=ps.initIssue();
		ps.initIssue.update();
		console.log("save");
	}
	render(){
		return(
			<div className="text-right">
				<button 
					data-toggle="modal" 
					data-target={"#"+this.popUpId}
				 	type="button" 
				 	className="btn btn-default btn-xs create-issue" 
				 	aria-label="Create Issue" 
				 	data-toggle="tooltip" 
				 	data-placement="top" 
				 	title="Issue" 
					ref={this.toolTip} 
					onClick={ this.popUp} >

				 	<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				</button>
				<Modal 
					id={this.popUpId} 
					submitText="Submit" 
					title="Create Issue For Vineyard"
					submit={this.submit}>

						<fieldset>
							<div className="form-group">
								<label>Issue Title</label>
								<input type="text" className="form-control" placeholder="Issue Title" />
							</div>
							<div className="form-group">
								<label>Priority</label>
								<select className="form-control" >
									<option>Low</option>
									<option>Medium</option>
									<option>High</option>
									<option>Critical</option>
								</select>
							</div>
							<div className="form-group">
							  	<label>Issue Details:</label>
							  	<textarea className="form-control" rows="3" placeholder="Issue Details"></textarea>
							</div>
						</fieldset>

				</Modal>
			</div>
		);
	}
}


