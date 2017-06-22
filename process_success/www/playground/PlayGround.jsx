/*jshint ignore:start */
import Form from '../../public/js/modules/utils/forms'
import Acordian from '../../public/js/modules/utils/acordian'
import AcordianContent from '../../public/js/modules/utils/acordianContent'
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



const app2= $('#app2')[0];
(function(){
	var filter={};
	frappe.ready(function(){
		ReactDOM.render( <SprayTable filter={filter} /> , app2 );
	})

})();



