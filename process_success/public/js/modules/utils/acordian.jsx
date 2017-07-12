import AcordianContent from './acordianContent'

export default class Acordian extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="panel-group" id={this.props.id} role="tablist" aria-multiselectable="true">
				{this.props.children}
			</div>
		);
	}
}

//{React.cloneElement(this.props.children, { toggleAll: this.props.toggleAll })}