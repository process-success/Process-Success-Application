import Form from '../utils/forms'


export default class DoctypeForm extends React.Component{
	constructor(props){
		super(props);
		this.componentWillUpdate=this.componentWillUpdate.bind(this);
		this.doctypeToolUpdate=this.doctypeToolUpdate.bind(this);

		this.submit=this.submit.bind(this);
		this.save=this.save.bind(this);
		this.delete=this.delete.bind(this);
		this.doctypeTool = new ps.apiTool({name:this.props.doctype},{doctype:'DocType'},this.doctypeToolUpdate,this.forceUpdate);
		this.state={items:this.doctypeTool.items};
		//this.doctypeTool = new ps.apiTool({name:this.props.doctype},{doctype:'DocType'},this.doctypeToolUpdate);
	}
	componentWillUpdate(nextProps, nextState){
		if(this.props.doctype != nextProps.doctype){
			this.doctypeTool = new ps.apiTool({name:nextProps.doctype},{doctype:'DocType'},this.doctypeToolUpdate,this.forceUpdate);
		}
	}
	doctypeToolUpdate(){
		this.setState({items:this.doctypeTool.items})
	}
	submit(e){
		//FORM VALIDATION
		//if(this.props.item.vineyard=="" ||this.props.item.spray_type=="" || (moment(this.props.item.date,"MM/DD/YYYY").isValid())!==true){
		//	console.log("not valid");
		//}else{
			e.preventDefault();
			this.props.create(this.props.item,this.props.doctype);
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
	createFormJson(){
		var createHidden=(this.props.mode!="create")?" hidden":" nope";
		var editHidden=(this.props.mode!="edit")?" hidden":" nope";
		var fieldsJson=this.state.items[0].fields;
		var fields=[];
		var fieldObject={
			Link: function(item){
				return {
					field:"autoComplete",
					onChange: function(e){
						copy[item.fieldname]=e.target.value;
						this.props.itemChange(copy);
					}.bind(this),
					lable:item.label,
					value:copy[item.fieldname],
					doctype:item.options,
					docvalue:"name"
				}
			}.bind(this),
			Check: function(item){
				return {
					field:"check",
					onChange: function(e){
						copy[item.fieldname]=e.target.checked;
						this.props.itemChange(copy);
					}.bind(this),
					lable:item.label,
					value:copy[item.fieldname],
					className: "big-checkbox"
				}
			}.bind(this),
			Int: function(item){
				return {
					field:"input",
					type:"number",
					onChange: function(e){
						copy[item.fieldname]=e.target.value;
						this.props.itemChange(copy);
					}.bind(this),
					value:copy[item.fieldname],
					lable:item.label
				};
			}.bind(this),
			Select: function(item){
				var options=item.options.split( "\n" );
				// if(copy[item.fieldname]!=""){
				// 	copy[item.fieldname]=options[0];
				// 	this.props.itemChange(copy);
				// }
				return {
					field:"select",
					type:"number",
					onChange: function(e){
						copy[item.fieldname]=e.target.value;
						this.props.itemChange(copy);
					}.bind(this),
					lable:item.label,
					value:copy[item.fieldname],
					options:options
				};
			}.bind(this),
			Data: function(item,propOptions){
				if(propOptions.type=="textarea"){
					return {
						field:"textarea",
						onChange: function(e){
							copy[item.fieldname]=e.target.value;
							this.props.itemChange(copy);
						}.bind(this),
						value:copy[item.fieldname],
						lable:item.label
					};
				}
				else{
					return {
						field:"input",
						onChange: function(e){
							copy[item.fieldname]=e.target.value;
							this.props.itemChange(copy);
						}.bind(this),
						value:copy[item.fieldname],
						lable:item.label
					};
				}
			}.bind(this),
			Date: function(item){
				return {
					field:"date",
					onChange: function(e){
						copy[item.fieldname]=e.target.value;
						this.props.itemChange(copy);
					}.bind(this),
					lable:item.label
				}
			}.bind(this),
		}

		if(this.props.item==null){
			var copy={}
		}else{
			var copy=ps.clone(this.props.item);
		}

		//loop the json object
		//probably change this to willMount
		console.log(fieldsJson);

		for(var x = 0; x < fieldsJson.length; x++){
			var currentField=fieldsJson[x];
			console.log(currentField.fieldname);
			// check if this field was enabled

			if (this.props[currentField.fieldname]){
				//there is a props for this field

				if(this.props[currentField.fieldname].active === 1){
					//and the field is set to active

					if(fieldObject[currentField.fieldtype]){
						//Feild type can be handled?
						//handle the creation of copy and the default values

						if(this.props.mode=="create"){
							if(copy[currentField.fieldname]){
								//the field already exists
							}
							else if(this.props[currentField.fieldname].default){
								//set to default value
								copy[currentField.fieldname]=this.props[currentField.fieldname].default;
							}
							else{
								copy[currentField.fieldname]="";
							}
						}
						//console.log(currentField.fieldname);
						fields.push(fieldObject[currentField.fieldtype](currentField,this.props[currentField.fieldname]));
					}
				}
			}
		}
		if(!("doctype" in copy)){
			copy.doctype=this.props.doctype;
		}
		//adding button feilds
		if(this.props.close){
			fields.push({
				field:"button",
				type:"submit",
				value:"Create " + this.props.doctype + " Entry",
				className:"btn-primary pull-right " + createHidden,
				onClick:this.submit
			});
		}
		if(this.props.create){
			fields.push({
					field:"button",
					value:"Close",
					className:"pull-right "+ editHidden,
					onClick:function(e){ e.preventDefault();this.props.close();}.bind(this)
			});
		}
		if(this.props.delete){
			fields.push({
					field:"button",
					type:"submit",
					value:"Delete",
					className:"btn-danger pull-right "+ editHidden,
					onClick:this.delete
			});
		}
		fields.push(
			{
				field:"button",
				type:"submit",
				value:"Save",
				className:"btn-success pull-right "+ editHidden,
				onClick:this.save
			});
		return fields;
	}
	render(){
		console.log("render area");
		var output={};
		if(this.state.items!==null){
			var fields=this.createFormJson();
			console.log(fields);
			var output = (
				<Form
					id={this.props.id}
					type="horizontal"
					fields={fields}
				/>);
		}else{
			output = (<div> Loading... </div>);
		}

		return (
			<div>{"HORE"}
				{output}
			</div>
		);
	}
}
