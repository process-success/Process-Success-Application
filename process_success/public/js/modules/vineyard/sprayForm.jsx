import Form from '../utils/forms'


export class SprayForm extends React.Component{
	constructor(props){
		super(props);

		this.submit=this.submit.bind(this);
		this.state={
			vineyard:"",
			season:"",
			date:moment().format("MM/DD/YYYY"),
			sprayType:"",
			quantity:0
		}
	}

	submit(e){
		if(this.state.vineyard=="" ||this.state.spray_type=="" || (moment(this.state.date,"MM/DD/YYYY").isValid())!==true){
			console.log("not valid");
		}else{
			var copy=ps.clone(this.state);
			$('#'+ this.props.id).modal('hide')
			this.state={
				vineyard:"",
				season:"",
				date:moment().format("MM/DD/YYYY"),
				spray_type:"",
				quantity:0
			}
			this.setState(this.state);
			console.log("IN SUBMIT");
			this.props.createSprayEntry(copy);
		}
	}
	render(){
		var fields=[		
			{
				field:"autoComplete",
				onChange: function(e){
					this.setState({vineyard:e.target.value})
				}.bind(this),
				value:this.state.vineyard,
				required:true,
				lable:"Vineyard",
				doctype:"Vineyard",
				docvalue:"name"
			},
			{
				field:"autoComplete",
				onChange: function(e){
					this.setState({season:e.target.value})
				}.bind(this),
				value:this.state.season,
				required:true,
				lable:"Season",
				doctype:"Season",
				docvalue:"name"
			},
			{
				field:"date",
				required:true,
				onChange: function(e){
					this.setState({date:e.target.value});
				}.bind(this),
				value:this.state.date,
				lable:"Date"
			},
			{
				field:"autoComplete",
				onChange: function(e){ 
					this.setState({spray_type:e.target.value})
				}.bind(this),
				value:this.state.spray_type,
				required:true,
				lable:"Spray Type",
				doctype:"Spray Type",
				docvalue:"name"
			},
			{
				field:"input",
				className:"vineyard-input",
				type:"number",
				onChange: function(e){
					this.setState({quantity:e.target.value})
				}.bind(this),
				value:this.state.quantity,
				lable:"quantity"
			},
			{
				field:"button",
				type:"submit",
				value:"Create Spraying Entry",
				className:"btn-primary pull-right",
				onClick:this.submit
			}


		]
		return (
			<div>		
				NEW SPRAY
				<Form
					id={this.props.id}
					type="horizontal"
					fields={fields}

				/>
			</div>
		);
	}
}


export class PruningForm extends React.Component{
	constructor(props){
		super(props);

		this.submit=this.submit.bind(this);
		this.state={
			vineyard:"",
			season:"",
			date:moment().format("MM/DD/YYYY"),
			sprayType:"",
			quantity:0
		}
	}

	submit(e){
		if(this.state.vineyard=="" ||this.state.spray_type=="" || (moment(this.state.date,"MM/DD/YYYY").isValid())!==true){
			console.log("not valid");
		}else{
			var copy=ps.clone(this.state);
			$('#'+ this.props.id).modal('hide')
			this.state={
				vineyard:"",
				season:"",
				date:moment().format("MM/DD/YYYY"),
				spray_type:"",
				quantity:0
			}
			this.setState(this.state);
			console.log("IN SUBMIT");
			this.props.createSprayEntry(copy);
		}
	}
	render(){
		var fields=[		
			{
				field:"date",
				required:true,
				onChange: function(e){
					this.setState({date:e.target.value});
				}.bind(this),
				value:this.state.date,
				lable:"Date"
			},
			{
				field:"input",
				className:"vineyard-input",
				type:"number",
				onChange: function(e){
					this.setState({quantity:e.target.value})
				}.bind(this),
				value:this.state.quantity,
				lable:"quantity"
			},
			{
				field:"button",
				type:"submit",
				value:"Create Spraying Entry",
				className:"btn-primary pull-right",
				onClick:this.submit
			}


		]
		return (
			<div>		
				NEW PRUNNING
				<Form
					id="CreateSprayingEntryForm"
					type="horizontal"
					fields={fields}

				/>
			</div>
		);
	}
}