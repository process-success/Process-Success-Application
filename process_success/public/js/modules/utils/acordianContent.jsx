export default class AcordianContent extends React.Component{
	constructor(props){
		super(props);
		this.renderHead = this.renderHead.bind(this);
	}
	renderHead(id){

		return(
			<div className="panel-heading" 
				role="tab" 
				onClick={
					function(){
						console.log(id);
						$('#'+this.props.parentId+' .acordian-content.in').not('#'+id).collapse('hide');
						$('#'+id).collapse('toggle');
					}.bind(this)
				}
				>
				<h4 className="panel-title">
					<a role="button" data-toggle="collapse" data-parent={'#'+this.props.parentId} aria-expanded={(this.props.active)? true:false}  >
			  			{this.props.title}
					</a>
				</h4>
				{this.props.extraHead}
			</div>
		);
	}
	render(){
		var id =this.props.id;
		return (
			<div className="panel panel-default">
				{this.renderHead(id)}
				<div id={id} 
					className={(this.props.active)? "acordian-content panel-collapse collapse in":"acordian-content panel-collapse collapse"} 
					role="tabpanel">
					<div className="panel-body">
						{ this.props.children }
					</div>
				</div>
			</div>
  		);
	}
}
