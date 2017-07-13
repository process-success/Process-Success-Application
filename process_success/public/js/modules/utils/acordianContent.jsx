export default class AcordianContent extends React.Component{
	constructor(props){
		super(props);
		this.renderHead = this.renderHead.bind(this);
		console.log(this.props.toggleAll);
	}
	renderHead(id){

		return(
			<div className="panel-heading"
				role="tab" 
				onClick={
					function(){
						console.log(this.props.toggleAll);
						console.log(this.props.toggleAll==false);
						if(this.props.toggleAll==false){
							$('#'+id).collapse('toggle');
						}
						else{
						console.log(id);
							$('#'+this.props.parentId+' .acordian-content.in').not('#'+id).collapse('hide');
							$('#'+id).collapse('toggle');
						}
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
		var className=(this.props.active)? "acordian-content panel-collapse collapse in":"acordian-content panel-collapse collapse";
		if(this.props.className){
			className=className+" "+this.props.className;
		}
		var id =this.props.id;
		return (
			<div className="panel panel-default acordian-panel">
				{this.renderHead(id)}
				<div id={id} 
					className={className} 
					role="tabpanel">
					<div className="panel-body">
						{ this.props.children }
					</div>
				</div>
			</div>
  		);
	}
}
