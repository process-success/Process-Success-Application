/*jshint ignore:start */
import Form from '../../public/js/modules/utils/forms'
import Acordian from '../../public/js/modules/utils/acordian'
import AcordianContent from '../../public/js/modules/utils/acordianContent'
import DoctypeForm from '../../public/js/modules/utils/doctypeForm'
import SprayTable from '../../public/js/modules/vineyard/sprayTable'



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
				lable:"test"
			},
			{
				field:"lable",
				lable:"TESXSDF"
			},
			{
				field:"input",
				onChange: this.someFunction,
				lable:"test2"
			},
			{
				field:"date",
				onChange: this.someFunction,
				lable:"Date"
			},
			{
				field:"select",
				onChange: this.someFunction,
				lable:"test2",
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
				value:"two",
				options:[
					"one",
					"two",
					"three"
				]
			},
			{
				field:"check",
				className:"big-checkbox",
				onChange: function(e){console.log(e.target.checked)},
				lable:"this is a test"
			},
			{
				lable:"Test Text Area",
				field:"textarea",
				className:"",
				onChange: this.someFunction
			},
			{
				field:"autoComplete",
				onChange: this.someFunction,
				lable:"Vineyard",
				doctype:"Vineyard",
				docvalue:"name"
			},
			{
				field:"autoComplete",
				onChange: this.someFunction,
				lable:"Customer",
				doctype:"Customer",
				doclable:"full_name",
				docvalue:"name"
			}
		]
		return(
			<div>
			<Form
				type="horizontal"
				fields={fields}
				id="thing"
			>

			</Form>
			</div>
		);
	}
}

class TestBro extends React.Component{
	constructor(props){
		super(props);
		this.taskChanged=this.taskChanged.bind(this);
		this.sprayingFeilds = new ps.apiTool({name:'Spraying'},{doctype:'DocType'},this.taskChanged);
	}
	taskChanged(){
		console.log(this.sprayingFeilds.items);
  	}
	someFunction(){
	}
	render(){
		return(
			<div>
				test
			</div>
		);
	}
}

const app2= $('#app2')[0];
(function(){
	var filter={};
	frappe.ready(function(){
		ReactDOM.render( 
			<div><DoctypeForm 
				id="createPrunEntry" 
				doctype="Pruning"
				season={{active:1}}
				note={{
					active:1,
					type:"textarea" 
				}}
				type={{active:1}}
				b_lock={{active:1}}
				removed={{active:1}}
				pre_prune={{active:1}}
				tap_removed={{active:1}}
			/> <CreateWorkorder /></div>	, app2 );
	})

})();

// const app2= $('#app2')[0];
// (function(){
// 	var filter={};
// 	frappe.ready(function(){
// 		ReactDOM.render( <SprayTable filter={filter} /> , app2 );
// 	})

// })();



