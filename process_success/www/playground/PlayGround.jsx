/*jshint ignore:start */
import Form from '../../public/js/modules/utils/forms'


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


$(document).ready(function() {
    $(".table").DataTable({
        "scrollY": 300,
        "data": dataSet,
        "scrollX": true,
        "paging":   false,
        "stateSave": true,
        "info":     false,
              columns: [
            { title: "Name" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            { title: "Salary" }
        ]
    });
} );





