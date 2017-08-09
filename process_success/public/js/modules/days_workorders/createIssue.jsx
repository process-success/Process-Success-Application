/*jshint ignore:start */


export default class CreateIssue extends React.Component{
	constructor(props){
		super(props)
		this.modalNewIssue=this.modalNewIssue.bind(this);
		this.modalEditIssue=this.modalEditIssue.bind(this);
	}
	toolTip(){
		$(function () {
		 	$('[data-toggle="tooltip"]').tooltip();
		})
	}
	modalNewIssue(e){
		e.preventDefault();
		this.props.activateModalNew();
	}
	modalEditIssue(item,e){
		e.preventDefault();
		console.log(item)
		this.props.activateModalEdit(item);
	}
	render(){
		var dropdownItems=[];
		if(this.props.issues!==null){
			this.props.issues.map(function(item, index){
				if (item.status =='Open'){
					dropdownItems.push(
						<li key={index}> 
							<a className="dropdown-item" 
								href="#" 
								onClick={this.modalEditIssue.bind(this,item)} 
							>{item.issue_title}</a>
						</li>);
				}
			}.bind(this));
		}
		var issueCount=" ";
		if(this.props.issues!==null && this.props.issues.length!==null){
			var count = 0;
			for(var x=0; x < this.props.issues.length;x++){
				if(this.props.issues[x].status=="Open"){
					count++;
				}
			}
			issueCount=(count===0)?"":count+" ";
		}
		return(
			<div className="dropdown dropdown-panel-right">

				<button
					className="btn btn-default btn-xs dropdown-toggle full-header-button corner" 
					type="button" 
					data-toggle="dropdown" 
					aria-haspopup="true" 
					aria-expanded="false" >

				 	{issueCount}<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
				</button>
				<ul className="dropdown-menu">
				    <li className="dropdown-header">Issues</li>
				    {dropdownItems}
				    <li role="separator" className="divider"></li>
				    <li><a 
				    	className="dropdown-item"
				    	onClick={this.modalNewIssue}
				    	href="#" > + New Issue</a></li>
				</ul>

			</div>
		);
	}
}


