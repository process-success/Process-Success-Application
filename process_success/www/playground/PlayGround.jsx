/*jshint ignore:start */
import Form from '../../public/js/modules/utils/forms'
import Acordian from '../../public/js/modules/utils/acordian'
import AcordianContent from '../../public/js/modules/utils/acordianContent'


//const app= document.getElementById('app');
const app= $('#app')[0];

class CreateWorkorder extends React.Component{
	constructor(props){
		super(props);
	}
	//<AffixWrapper className="sticky_subnav text-center"  offset={140} height="40px"></AffixWrapper>
	someFunction(){

	}
	render(){
		var fields=[
			{
				field:"header",
				lable:"TESTING"
			},

			{
				field:"input",
				onChange: this.someFunction,
				lable:"test",
				key:"type"
			},
			{
				field:"lable",
				lable:"TESXSDF"
			},
			{
				field:"input",
				onChange: this.someFunction,
				lable:"test2",
				key:"other"
			},
			{
				field:"date",
				onChange: this.someFunction,
				lable:"Date",
				key:"other3"
			},
			{
				field:"select",
				onChange: this.someFunction,
				lable:"test2",
				key:"groupsSelect",
				options:[
					{ 
						group: "thing",
						options: [
							"one",
							"two",
							"three"
						]
					},
					{
						group: "thing2",
						options: [
							"one",
							"two",
							"three"
						]
					}
				]
			},
			{
				field:"select",
				onChange: this.someFunction,
				lable:"test2",
				key:"normalSelect",
				options:[
					"one",
					"two",
					"three"
				]
			},
			{
				field:"autoComplete",
				onChange: this.someFunction,
				lable:"Vineyard",
				doctype:"Vineyard",
				docvalue:"name",
				key:"autoComplete"
			},
			{
				field:"autoComplete",
				onChange: this.someFunction,
				lable:"Customer",
				doctype:"Customer",
				doclable:"full_name",
				docvalue:"name",
				key:"customer"
			}
		]
		return(
			<div>
			<Form
				type="horizontal"
				fields={fields}
			>

			</Form>
			</div>
		);
	}
}



(function(){
	frappe.ready(function(){
		ReactDOM.render( 
		<CreateWorkorder />,app );
	})

})();

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
					active={(index===1)?true:false}
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


const app2= $('#app2')[0];
(function(){
	frappe.ready(function(){
		ReactDOM.render( 
		<CrewDash />,app2 );
	})

})();
// (function(){
// 	frappe.ready(function(){
// 		ReactDOM.render( 
// 		<Acordian id="testacordian">				
// 			<AcordianContent
// 				key="1"
// 				id="1"
// 				title="test1"
// 				active="true"
// 				parentId="testacordian" >
// 				TESTING 123

// 			</AcordianContent>
// 			<AcordianContent
// 				key="2"
// 				id="2"
// 				title="test2"
// 				parentId="testacordian" >

// 				TESTING 123q3245234562345

// 			</AcordianContent>
// 			<AcordianContent
// 				key="3"
// 				id="3"
// 				title="test3"
// 				parentId="testacordian" >

// 				TESTING 123q3245234562345

// 			</AcordianContent>
// 		</Acordian>,app2 );
// 	})

// })();


