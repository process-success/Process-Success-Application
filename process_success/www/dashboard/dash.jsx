
import Acordian from '../../public/js/modules/utils/acordian'
import AcordianContent from '../../public/js/modules/utils/acordianContent'

export default class CrewDash extends React.Component{
	constructor(props){
		super(props);
		this.state={
			crew:[],
			title:''
		};
		this.crewChanged=this.crewChanged.bind(this);
		this.crewsAcordion=this.crewsAcordion.bind(this);
		this.crewTool = new ps.apiTool({},{doctype:'Crew'},this.crewChanged);
		this.acordianId="crew-dash-acordian";
	}

  	crewChanged(){
  		console.log(this.crewTool.items);
		this.setState({crew:this.crewTool.items});
	}
	crewsAcordion(){
		var output=[];
		this.state.crew.map(function(item, index){
			output.push((
				<AcordianContent
					key={this.acordianId+index}
					id={this.acordianId+index}
					title={item.crew_name}
					active={(index===0)?true:false}
					parentId={this.acordianId}
				>
				TESTING {index}

				</AcordianContent>));	
		}.bind(this));
		return (
			<Acordian id={this.acordianId}>
				{output}
			</Acordian>
		);
	}
	render(){
		return(<div>{this.crewsAcordion()}</div>);
	}
}


const app= $('#app')[0];
(function(){
	frappe.ready(function(){
		ReactDOM.render( 
		<CrewDash />,app );
	})

})();