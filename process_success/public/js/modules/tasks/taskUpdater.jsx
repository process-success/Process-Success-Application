import Form from '../utils/forms'
import {Check,Button} from '../utils/forms'


export default class DoctypeUpdater extends React.Component{
	constructor(props) {
		super(props);

		this.addFieldForm=this.addFieldForm.bind(this);

		this.state={
			active:0,
			addedFields:[]
		};

		this.fields=[
			{
				label:"Active",
				field:"check",
				onChange: this.someFunction,
			}
		];
	}
	addFieldForm(){
		this.props.addFieldForm();
	}
	render(){
		//console.log("ITEM",this.props.doctypeItem);
		//console.log("FIELDS",this.props.doctypeItem.fields);
    //console.log("rerender",this.props.doctypeItem.fields);
		var fieldForms=[];
		if(this.props.doctypeItem.fields!==undefined){
			this.props.doctypeItem.fields.map(function(item) {
				//check if its a default field
				if(!(this.props.hiddenFields.includes(item.fieldname))){
          var disabled=true;
          if(item.creation == undefined){
            disabled=false;
          }
					fieldForms.push(
						<FieldForm
              disabled={disabled}
              removeFieldForm={function(){
                this.props.removeFieldForm(item.idx)
              }.bind(this)}
              fieldSelect={function(e){
                this.props.fieldSelect(e.target.value,item.idx);
              }.bind(this)}
              nameChanged={function(e){
                this.props.nameChanged(e.target.value,item.idx);
              }.bind(this)}
              optionsChanged={function(e){
                this.props.optionsChanged(e.target.value,item.idx);
              }.bind(this)}
							type={item.fieldtype}
							name={item.fieldname}
							options={item.options}
							/>
					);
				}
			}.bind(this));
		}

		//map extra Fields
		// if(this.state.addedFields!== undefined && this.state.addedFields!== null){
		// 	this.state.addedFields.map(function(item) {
		// 		fieldForms.push(
		// 			<FieldForm
		// 				type=""
		// 				name=""
		// 				options=""
		// 				/>
		// 		);
		// 	}.bind(this));
		// }
		var fieldFormHeader=(<p>{"No Fields yet.  Add One!"}</p>);
		if(fieldForms.length>=1){
			fieldFormHeader=(
				<div className="row inline-form-header">
					<div className="col-xs-3">Type</div>
					<div className="col-xs-3">Name</div>
					<div className="col-xs-6">Options</div>
				</div>
			);
		}
		return(
			<div>
				<Check
					lable="Active"
					value={this.state.active}
					inputChanged={function(){
						var stateChange=this.state.active;
						if(stateChange==1){
							stateChange=0;
						}else{stateChange=1;}
						this.setState({active:stateChange});
					}.bind(this)}
					/>
				{fieldFormHeader}
				{fieldForms}
				<Button
					className="btn-primary"
					value="Add Field"
					onClick={this.addFieldForm}
					icon="glyphicon-align-left"
					/>
				<Button
					className="btn-success"
					value="Update"
          onClick={function(e){
            console.log("ON CLICK" ,this.props.doctypeItem);
            e.preventDefault();
            this.props.update(this.props.doctypeItem);
          }.bind(this)}
					icon="glyphicon-refresh"
					/>
			</div>

		);
	}
}

class FieldForm extends React.Component{
	constructor(props) {
		super(props);

	}
	render(){
    this.feilds=[
      {

        field:"select",
        onChange: this.props.fieldSelect,
        value:this.props.type,
        readonly:this.props.disabled,
        disabled:this.props.disabled,
        options:[
          "Input",
          "Select",
          "Number",
          "Date",
          "Check",
          "Textarea"
        ]
      },
      {
        field:"input",
        readonly:this.props.disabled,
        value:this.props.name,
        onChange: this.props.nameChanged,
      },
      {
        field:"textarea",
        className:"",
        readonly:this.props.disabled,
        disabled:this.props.disabled,
        rows:"1",
        value:this.props.options,
        onChange: this.props.optionsChanged
      },
      {
        field:"button",
        value:"Remove",
        disabled:this.props.disabled,
        className:"btn-danger",
        onClick: function(e){
          e.preventDefault();
          this.props.removeFieldForm();
        }.bind(this)
      }
    ]
		return(
			<div>
				<div className="row">
					<Form
						type="inline"
						className="inline"
						rows="4"
						fields={this.feilds}
						id="thing"
					/>
				</div>
			</div>

		);
	}
}
