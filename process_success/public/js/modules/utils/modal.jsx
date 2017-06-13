/*jshint ignore:start */


export default class Modal extends React.Component{
	constructor(props){
		super(props);
		this.submit=this.submit.bind(this);
	}
	submit(e){
		e.preventDefault();
		this.props.submit(e);
	}
	render(){
		return(
			<div className="modal fade text-left panel-default" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title" id="exampleModalLabel">{this.props.title}</h4>
							<button type="button" display="none" className="close hide" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>

							<div className="modal-body">
								{ this.props.children }
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button 
									type="submit" 
									onClick={this.submit} 
									className="btn btn-primary" >
										{this.props.submitText}
								</button>
							</div>
					</div>
				</div>
			</div>
		);
	}
}


