/* forms */
/*jshint ignore:start */

export default class Form extends React.Component{
	constructor(props){
		super(props);
		this.submit=this.submit.bind(this);
	}
	submit(e){
		e.preventDefault();
		this.props.submit(e);
	}
	render(){
		var form=[];
		var formTypes={
			select	: function(item){
				var value = (item.value === undefined) ? "": item.value;
				var lable = (item.lable === undefined) ? "": item.lable;
				var options = (item.options === undefined) ? "": item.options;
				var className = (item.className === undefined) ? "": item.className;
				return (
					<Select
						key={item.key} 
						className={className}
						lable={lable}
						options={options}
					/>
				);
			},
			input 	: function(item){
				var type = (item.type === undefined) ? "text": item.type;
				var value = (item.value === undefined) ? "": item.value;
				var placeholder = (item.placeholder === undefined) ? "": item.placeholder;
				var lable = (item.lable === undefined) ? "": item.lable;
				var className = (item.className === undefined) ? "": item.className;
				return (
					<Input
						key={item.key} 
						type={type}
						value={value}
						placeholder={placeholder}
						lable={lable}
						className={className}
						inputChanged={function(e){var test;}}
					/>
				);
			},
			lable 	: function(item){
				return (  
    				<label key={item.lable} >{item.lable}</label>

    			);
			},
			radio	: function(item){
				return (<div></div>);
			},
			textarea: function(item){
				return (<div></div>);
			},
			header: function(item){
				return(<h3 key={item.lable} >{item.lable}</h3>)
			}
		}
		this.props.fields.map(function(item, index){

			form.push(formTypes[item.field](item));
		}.bind(this));
		//for(var x=0; x < this.props.feilds.length x++; )
		return(
			<form className="form-horizontal">
				<fieldset>
				{form}
				{ this.props.children }
				</fieldset>
			</form>
		);
	}
}



export class Select extends React.Component{
	constructor(props){
		super(props);
		this.inputChange=this.inputChange.bind(this);

	}
	inputChange(e){
		this.props.inputChanged();
	}
	render(){
		this.value = (this.props.value === undefined) ? "": this.props.value;
		this.lable = (this.props.lable === undefined) ? "": this.props.lable;
		this.options = (this.props.options === undefined) ? "": this.props.options;
		this.className= (this.props.className === undefined) ? "form-control": "form-control" +this.props.className;
		var options=[];
		var output="";


		this.options.map(function(item, index){
			var group=[];
			if(item.group !== undefined){
				item.options.map(function(innerItem,index){
					group.push( <option key={item.group+index}> {innerItem} </option>)
				})
				options.push(<optgroup key={item.group} label={item.group}> {group}</optgroup>);

			}
			else{
				options.push( <option key={index}> {item} </option>)
			}
			console.log(options)
			
		}.bind(this));
		

		var select=(
			<select className={this.className} value={this.value}>
				{options}
			</select>
		);

		if (this.props.lable !== undefined || this.props.lable ==""){
			output = (
				<div className="form-group ">
		    		<label className="control-label">{this.props.lable}</label>
		    		<div>
		    		{select}
		    		</div>
		  		</div>
		  	);
		}
		else{
			output = (
				<div className="form-group">
		      		{select}
		  		</div>
		  	);
		}
		return(
			<div>
				{output}
			</div>
		);
	}
}

export class Input extends React.Component{
	constructor(props){
		super(props);
		this.inputChange=this.inputChange.bind(this);

	}
	inputChange(e){
		this.props.inputChanged();
	}
	render(){
		this.type = (this.props.type === undefined) ? "text": this.props.type;
		this.value = (this.props.value === undefined) ? "": this.props.value;
		this.placeholder = (this.props.placeholder === undefined) ? "": this.props.placeholder;
		this.lable = (this.props.lable === undefined) ? "": this.props.lable;
		var output="";
		this.className= (this.props.className === undefined) ? "form-control": "form-control " +this.props.className;
		var input=( <input type={this.type} className={this.className} placeholder={this.placeholder} value={this.value} />);

		if (this.props.lable !== undefined || this.props.lable ==""){
			output = (
				<div className="form-group ">
		    		<label className="control-label">{this.props.lable}</label>
		    		<div className="">
		      			{input}
		    		</div>
		  		</div>
		  	);
		}
		else{
			output = (
				<div className="form-group">
		      		{input}
		  		</div>
		  	);
		}
		return(
			<div>
				{output}
			</div>
		);
	}
}


