import Form from '../utils/forms'


export class SprayForm extends React.Component{
	constructor(props){
		super(props);
		this.componentWillUpdate=this.componentWillUpdate.bind(this);
		this.submit=this.submit.bind(this);
		this.save=this.save.bind(this);
		this.delete=this.delete.bind(this);
	}
	componentWillUpdate(){

	}
	submit(e){
		//if(this.props.item.vineyard=="" ||this.props.item.spray_type=="" || (moment(this.props.item.date,"MM/DD/YYYY").isValid())!==true){
		//	console.log("not valid");
		//}else{
			e.preventDefault();
			this.props.create(this.props.item);
		//}
	}
	save(e){
		// if(this.props.item.vineyard=="" ||this.props.item.spray_type=="" || (moment(this.props.item.date,"MM/DD/YYYY").isValid())!==true){
		// 	console.log("not valid");
		// }else{
			e.preventDefault();
			this.props.edit(this.props.item);
		// }
	}
	delete(e){
		e.preventDefault();
		this.props.delete(this.props.item);
	}
	render(){
		var createHidden=(this.props.mode!="create")?" hidden":" nope";
		var editHidden=(this.props.mode!="edit")?" hidden":" nope";
		if(this.props.item==null){
			var copy={
				vineyard:"",
				season:"",
				date:moment().format("MM/DD/YYYY"),
				sprayType:"",
				quantity:0
			}
		}else{
			var copy=ps.clone(this.props.item);
		}
		
		var date={
				field:"date",
				required:true,
				onChange: function(e){
					copy.date=e.target.value;
					this.props.itemChange(copy);
				}.bind(this),
				value:copy.date,
				lable:"Date"
		};
		var vineyard={
			field:"autoComplete",
			onChange: function(e){
				copy.vineyard=e.target.value;
				this.props.itemChange(copy);
			}.bind(this),
			value:copy.vineyard,
			required:true,
			lable:"Vineyard",
			doctype:"Vineyard",
			docvalue:"name"
		}
		if(this.props.vineyard==false){
			vineyard={};
		}
		if(this.props.date==false){
			date={};
		}
		var fields=[
			vineyard,
			{
				field:"autoComplete",
				onChange: function(e){
					copy.season=e.target.value;
					this.props.itemChange(copy);
				}.bind(this),
				value:copy.season,
				required:true,
				lable:"Season",
				doctype:"Season",
				docvalue:"name"
			},
			date,
			{
				field:"autoComplete",
				onChange: function(e){ 
					copy.spray_type=e.target.value;
					this.props.itemChange(copy);
				}.bind(this),
				value:copy.spray_type,
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

					copy.quantity=e.target.value;
					this.props.itemChange(copy);
				}.bind(this),
				value:copy.quantity,
				lable:"quantity"
			},
			{
				field:"button",
				type:"submit",
				value:"Create Spraying Entry",
				className:"btn-primary pull-right" + createHidden,
				onClick:this.submit
			},
			{
				field:"button",
				type:"submit",
				value:"Save",
				className:"btn-success pull-right"+ editHidden,
				onClick:this.save
			},
			{
				field:"button",
				type:"submit",
				value:"Delete",
				className:"btn-danger pull-right"+ editHidden,
				onClick:this.delete
			}


		]
		return (
			<div>		
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