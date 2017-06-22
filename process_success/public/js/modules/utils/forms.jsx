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
			select	: function(item,index){
				var value = (item.value === undefined) ? "": item.value;
				var lable = (item.lable === undefined) ? "": item.lable;
				var options = (item.options === undefined) ? "": item.options;
				var className = (item.className === undefined) ? "": item.className;
				var readonly = (item.readonly === undefined) ? "": item.readonly;
				var disabled = (item.disabled === undefined) ? "": item.disabled;
				var required = (item.required === undefined) ? "": item.required;
				return (
					<Select
						key={this.props.id+index}
						value={value}
						className={className}
						lable={lable}
						options={options}
						readonly={readonly}
						disabled={disabled}
						required={required}
						inputChanged={function(e){item.onChange(e);}}
					/>
				);
			}.bind(this),
			input 	: function(item,index){
				var type = (item.type === undefined) ? "text": item.type;
				var value = (item.value === undefined) ? "": item.value;
				var placeholder = (item.placeholder === undefined) ? "": item.placeholder;
				var lable = (item.lable === undefined) ? "": item.lable;
				var className = (item.className === undefined) ? "": item.className;
				var readonly = (item.readonly === undefined) ? "": item.readonly;
				var disabled = (item.disabled === undefined) ? "": item.disabled;
				var required = (item.required === undefined) ? "": item.required;
				
				return (
					<Input
						key={this.props.id+index} 
						type={type}
						value={value}
						placeholder={placeholder}
						lable={lable}
						className={className}
						readonly={readonly}
						disabled={disabled}
						required={required}
						inputChanged={function(e){item.onChange(e)}}
					/>
				);
			}.bind(this),
			lable 	: function(item,index){
				return (  
    				<label key={this.props.id+index} >{item.lable}</label>

    			);
			}.bind(this),
			radio	: function(item,index){
				return (<div></div>);
			}.bind(this),
			textarea: function(item,index){
				return (<div></div>);
			}.bind(this),
			header: function(item,index){
				return(<h3 key={this.props.id+index} >{item.lable}</h3>)
			}.bind(this),
			date: function(item,index){
				var value = (item.value === undefined) ? "": item.value;
				var lable = (item.lable === undefined) ? "": item.lable;
				var placeholder = (item.placeholder === undefined) ? "": item.placeholder;
				var className = (item.className === undefined) ? "": item.className;
				var readonly = (item.readonly === undefined) ? "": item.readonly;
				var disabled = (item.disabled === undefined) ? "": item.disabled;
				var required = (item.required === undefined) ? "": item.required;
				return(
					<DateInput
						key={this.props.id+index} 
						value={value}
						placeholder={placeholder}
						lable={lable}
						className={className}
						inputChanged={function(e){item.onChange(e)}}
						readonly={readonly}
						disabled={disabled}
						required={required}
					/>
				);
			}.bind(this),
			autoComplete: function(item,index){
				var value = (item.value === undefined) ? "": item.value;
				var lable = (item.lable === undefined) ? "": item.lable;
				var placeholder = (item.placeholder === undefined) ? "": item.placeholder;
				var className = (item.className === undefined) ? "": item.className;
				var readonly = (item.readonly === undefined) ? "": item.readonly;
				var disabled = (item.disabled === undefined) ? "": item.disabled;
				var required = (item.required === undefined) ? "": item.required;

				return(
					<AwesompleteInput
						key={this.props.id+index}
						doctype={item.doctype}
						docvalue={item.docvalue}
						doclable={item.doclable}
						value={value}
						placeholder={placeholder}
						lable={lable}
						className={className}
						readonly={readonly}
						disabled={disabled}
						required={required}
						inputChanged={function(e){item.onChange(e)}}
					/>
				);
			}.bind(this),
			button: function(item,index){
				var value = (item.value === undefined) ? "": item.value;
				var className = (item.className === undefined) ? "": item.className;
				var disabled = (item.disabled === undefined) ? "": item.disabled;
				return(
					<Button
						key={this.props.id+index}
						value={value}
						className={className}
						disabled={disabled}
						onClick={function(e){item.onClick(e)}}
					/>
				);
			}.bind(this)
		}
		this.props.fields.map(function(item, index){

			form.push(formTypes[item.field](item,index));
		}.bind(this));
		//for(var x=0; x < this.props.feilds.length x++; )
		var className = (this.props.className === undefined) ? "react-form": "form-horizontal react-form "+this.props.className;
		return(
			<form className={className}>
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
		this.disabled = (this.props.disabled === undefined||this.props.disabled==false||this.props.disabled=="") ? false: true;
		this.required = (this.props.required === undefined||this.props.required==false||this.props.required=="") ? false: true;
		this.readonly = (this.props.readonly === undefined||this.props.readonly==false||this.props.readonly=="") ? false: true;
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

			
		}.bind(this));

		var select=(
			<select 
				className={this.className} 
				value={this.value} 
				onChange={this.props.inputChanged}
				disabled={this.disabled}
	          	readOnly={this.readonly}
	          	required={this.required}
				>
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
		this.props.inputChanged(e);
	}
	render(){
		this.type = (this.props.type === undefined) ? "text": this.props.type;
		this.value = (this.props.value === undefined) ? "": this.props.value;
		this.placeholder = (this.props.placeholder === undefined) ? "": this.props.placeholder;
		this.lable = (this.props.lable === undefined) ? "": this.props.lable;
		var output="";
		this.className= (this.props.className === undefined) ? "form-control": "form-control " +this.props.className;
		this.disabled = (this.props.disabled === undefined||this.props.disabled==false||this.props.disabled=="") ? false: true;
		this.required = (this.props.required === undefined||this.props.required==false||this.props.required=="") ? false: true;
		this.readonly = (this.props.readonly === undefined||this.props.readonly==false||this.props.readonly=="") ? false: true;
		var input=( 
			<input 
				type={this.type} 
				className={this.className} 
				placeholder={this.placeholder} 
				value={this.value}
				onChange={this.props.inputChanged}
				disabled={this.disabled}
	          	readOnly={this.readonly}
	          	required={this.required}
			/>
		);

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
export class DateInput extends React.Component{
	constructor(props){
		super(props);
		this.dateInit=this.dateInit.bind(this);
	}
	dateInit(){
		$('.input-group.date .datepick').datepicker({
		    todayBtn: "linked",
		    orientation: "bottom right",
		    autoclose: true,
		    todayHighlight: true
		}).on('changeDate', function(e) {
			var event = new Event('input', { bubbles: true });
			e.target.dispatchEvent(event);
		});
	}
	render(){
		this.value = (this.props.value === undefined) ? "": this.props.value;
		this.placeholder = (this.props.placeholder === undefined) ? "": this.props.placeholder;
		this.lable = (this.props.lable === undefined) ? "": this.props.lable;
		this.disabled = (this.props.disabled === undefined||this.props.disabled==false||this.props.disabled=="") ? false: true;
		this.required = (this.props.required === undefined||this.props.required==false||this.props.required=="") ? false: true;
		this.readonly = (this.props.readonly === undefined||this.props.readonly==false||this.props.readonly=="") ? false: true;


		var output="";
		this.className= (this.props.className === undefined) ? "form-control datepick": "form-control datepick " +this.props.className;
		var input=( 
			<input
				ref={this.dateInit} 
				type="text"
				className={this.className}
				placeholder={this.placeholder}  
				value={this.value} 
				onChange={this.props.inputChanged}
				disabled={this.disabled}
	          	readOnly={this.readonly}
	          	required={this.required}
				/>

		);

		if (this.props.lable !== undefined || this.props.lable ==""){
			output = (
		  		<div className="form-group">
		  			<label className="control-label">{this.props.lable}</label>
						
					<div className="input-group date">
						{input}
				  		<span className="input-group-addon">
				  			<i className="glyphicon glyphicon-th"></i>
				  		</span>
					</div>
				</div>
		  	);
		}
		else{
			output = (
				<div className="form-group">
				<div className="input-group date">

						{input}
				  		<span className="input-group-addon">
				  			<i className="glyphicon glyphicon-th"></i>
				  		</span>
				</div>
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
export class AwesompleteInput extends React.Component{
	constructor(props){
		super(props);

		/*   Do the bind thing  */
		this.createList=this.createList.bind(this);
		this.docChanged=this.docChanged.bind(this);
		this.componentDidMount=this.componentDidMount.bind(this);
		this.inputChange=this.inputChange.bind(this);
		this.autocomplete=this.autocomplete.bind(this);
		//this.workorderObj=this.onStatusChanged.bind(this);
		/*          end          */
		this.itemlist=[];
		this.state={itemlist:[]};
		this._isMounted=false;
		var args={};
		var options={doctype:this.props.doctype};
		this.listTool = new ps.apiTool({}, options ,this.docChanged);
		if (this.listTool.items===undefined ||this.listTool.items=== 0 ||this.listTool.items===null ){
		}else{
			this.state.list=this.listTool.items;
		}

		this.createList();
	}
	docChanged(){
		this.createList();
	}
	componentDidMount(){
		this._isMounted=true;

	}
	createList(){
		this.itemlist=[];
		//lable and value
		if (this.props.doclable !== undefined && this.listTool.items !== undefined && this.listTool.items !== null){
			for(let item of this.listTool.items){
				var temp =[item[this.props.doclable],item[this.props.docvalue]];
				this.itemlist.push(temp);
			}
			$(document).trigger('listLoad' + this.props.doctype);
		}
		//just lable
		else if(this.listTool.items !== undefined && this.listTool.items !== null){
			for(let item of this.listTool.items){
				this.itemlist.push(item[this.props.docvalue]);
			}
			$(document).trigger('listLoad' + this.props.doctype.replace(" ",""));
		}
	}

	autocomplete(input){
		var config= {
				minChars: 0,
				maxItems: 99,
				autoFirst: true,
				filter: Awesomplete.FILTER_STARTSWITH
			}
		if(this.props.doclable !== undefined ){
			config.item= function(item, input) {
				var d = item;
				var html = "<span>" + __(item.label)+ "</span><br><span><small>"+item.value+"</small></span>";
				return $('<li></li>')
					.data('item.autocomplete', item)
					.html('<a><p>' + html + '</p></a>')
					.get(0);
			}

		}else{
			config.item=function(item, input) {
				var d = item;
				var html = "<span>" + __(item)+ "</span>";
				return $('<li></li>')
					.data('item.autocomplete', item)
					.html('<a><p>' + html + '</p></a>')
					.get(0);
			}
		}
		this.aw = new Awesomplete(input,config);
		input.addEventListener(
			'awesomplete-selectcomplete',
				this.inputChange
		);

		this.aw.list=this.itemList;
		$(document).bind('listLoad' + this.props.doctype.replace(" ",""),function(){
			this.aw.list=this.itemlist;
		}.bind(this));
	}
	inputChange(e){
		this.props.inputChanged(e);
	}

	render(){
		this.type = (this.props.type === undefined) ? "text": this.props.type;
		this.value = (this.props.value === undefined) ? "": this.props.value;
		this.placeholder = (this.props.placeholder === undefined) ? "": this.props.placeholder;
		this.lable = (this.props.lable === undefined) ? "": this.props.lable;
		this.disabled = (this.props.disabled === undefined||this.props.disabled==false||this.props.disabled=="") ? false: true;
		this.required = (this.props.required === undefined||this.props.required==false||this.props.required=="") ? false: true;
		this.readonly = (this.props.readonly === undefined||this.props.readonly==false||this.props.readonly=="") ? false: true;

		var output="";
		this.className= (this.props.className === undefined) ? "form-control awesomplete": "form-control awesomplete " +this.props.className;
		var input=( <input
					value={this.value}

					type={this.type} 
					className={this.className} 
					placeholder={this.placeholder} 
					ref={this.autocomplete}
		          	onChange={this.inputChange}
		          	disabled={this.disabled}
		          	readOnly={this.readonly}
		          	required={this.required}
		          />);

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
export class Button extends React.Component{
	constructor(props){
		super(props);

	}

	render(){
		this.type = (this.props.type === undefined) ? "text": this.props.type;
		this.value = (this.props.value === undefined) ? "": this.props.value;
		this.disabled = (this.props.disabled === undefined||this.props.disabled==false||this.props.disabled=="") ? false: true;
		var output="";
		this.className= (this.props.className === undefined) ? "btn": "btn " +this.props.className;
		var input=( 
			<button 
				type={this.type}
				className={this.className} 
				value={this.value}
				onClick={this.props.onClick}
				disabled={this.disabled}
			>{this.value}</button>
		);


		output = (
			<div className="form-group">
	      		{input}
	  		</div>
	  	);

		return(
			<div>
				{output}
			</div>
		);
	}
}

