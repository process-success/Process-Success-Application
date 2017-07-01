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

		console.log(this.props.item);
		console.log(copy);
		var formElements={
			date:[{},
			{
					field:"date",
					required:true,
					onChange: function(e){
						copy.date=e.target.value;
						this.props.itemChange(copy);
					}.bind(this),
					value:copy.date,
					lable:"Date"
			}],
			vineyard:[{},{
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
			}],
			field:[{},{
				field:"autoComplete",
				onChange: function(e){
					copy.field=e.target.value;
					this.props.itemChange(copy);
				}.bind(this),
				value:copy.field,
				required:true,
				lable:"Vineyard",
				doctype:"Vineyard Field",
				filter:{vineyard:copy.vineyard},
				docvalue:"name"
			}],
			workorder:[{},{
				field:"autoComplete",
				onChange: function(e){
					copy.work_order=e.target.value;
					this.props.itemChange(copy);
				}.bind(this),
				value:copy.work_order,
				required:true,
				lable:"Vineyard",
				doctype:"work_order",
				docvalue:"name"
			}]
		}

		var fields=[
			formElements.vineyard[this.props.vineyard],
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
			formElements.date[this.props.vineyard],
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
			// {
			// 	field:"select",
			// 	onChange: function(e){ 
			// 		copy.type=e.target.value;
			// 		this.props.itemChange(copy);
			// 	}.bind(this),
			// 	lable:"Style",
			// 	options:[
			// 		"Cane",
			// 		"Hybrid",
			// 		"Head Train",
			// 		"Bilateral Train",
			// 		"Two Bud",
			// 		"Spur",
			// 		"Trunk"
			// 	]
			// },
			// {
			// 	field:"check",
			// 	className:"big-checkbox",
			// 	onChange: function(e){ 
			// 		copy.b_lock=e.target.value;
			// 		this.props.itemChange(copy);
			// 	}.bind(this),
			// 	lable:"B-Lock"
			// },
			// {
			// 	field:"check",
			// 	className:"big-checkbox",
			// 	onChange: function(e){ 
			// 		copy.removed=e.target.value;
			// 		this.props.itemChange(copy);
			// 	}.bind(this),
			// 	lable:"Pruning Removed"
			// },
			// {
			// 	field:"check",
			// 	className:"big-checkbox",
			// 	onChange: function(e){ 
			// 		copy.tap_removed=e.target.value;
			// 		this.props.itemChange(copy);
			// 	}.bind(this),
			// 	lable:"Tap Removed"
			// },
			// {
			// 	field:"check",
			// 	className:"big-checkbox",
			// 	onChange: function(e){ 
			// 		copy.pre_prune=e.target.value;
			// 		this.props.itemChange(copy);
			// 	}.bind(this),
			// 	lable:"Pre Prune"
			// },






