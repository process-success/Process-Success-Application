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
				var optinal=["value","lable","options","className","readonly","disabled","require"];
				var props=ps.initProps(optinal,item);
				return (
					<Select
						key={this.props.id+index}
						value={props.value}
						className={props.className}
						lable={props.lable}
						options={props.options}
						readonly={props.readonly}
						disabled={props.disabled}
						required={props.required}
						inputChanged={function(e){item.onChange(e);}}
					/>
				);
			}.bind(this),
			check : function(item,index){
				var props=["value","lable","className","readonly","disabled","require","value"];
				props=ps.initProps(props,item);

				return (
					<Check
						key={this.props.id+index}
						value={props.value}
						className={props.className}
						lable={props.lable}
						readOnly={props.readonly}
						disabled={props.disabled}
						required={props.required}
						inputChanged={function(e){item.onChange(e);}}
					/>
				);
			}.bind(this),

			textarea : function(item,index){
				var props=["value","lable","className","readonly","disabled","require","value","rows"];
				props=ps.initProps(props,item);

				return (
					<Textarea
						key={this.props.id+index}
						value={props.value}
						className={props.className}
						lable={props.lable}
						readOnly={props.readonly}
						disabled={props.disabled}
						required={props.required}
						rows={props.rows}
						inputChanged={function(e){item.onChange(e);}}
					/>
				);
			}.bind(this),
			input 	: function(item,index){
				var props=["type","value","placeholder","lable","className","readonly","disabled","required","error"];
				props=ps.initProps(props,item);
				if(props.type==""){
					props.type="text";
				}

				return (
					<Input
						key={this.props.id+index}
						type={props.type}
						value={props.value}
						placeholder={props.placeholder}
						lable={props.lable}
						className={props.className}
						readonly={props.readonly}
						disabled={props.disabled}
						required={props.required}
						error={props.error}
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
				var optinal=["value","className","disabled","icon"];
				var props=ps.initProps(optinal,item);
				return(
					<Button
						key={this.props.id+index}
						value={props.value}
						className={props.className}
						disabled={props.disabled}
						icon={props.icon}
						onClick={function(e){item.onClick(e)}}
					/>
				);
			}.bind(this)
		}
		this.props.fields.map(function(item, index){
			if($.isEmptyObject(item)){

			}else{
				if(this.props.type=="inline"){
					var rowClass=12/this.props.rows;
					rowClass="col-xs-"+rowClass;
					form.push(<div className={rowClass}>{formTypes[item.field](item,index)}</div>);
				}
				else{form.push(<div className={rowClass}>{formTypes[item.field](item,index)}</div>);}
			}
		}.bind(this));
		//for(var x=0; x < this.props.feilds.length x++; )
		var className = (this.props.className === undefined) ? "react-form": "react-form "+this.props.className;
		return(
			<form className={className}>
				<fieldset>
				{this.props.before}
				{form}
				{ this.props.children}
				</fieldset>
			</form>
		);
	}
}



export class Select extends React.Component{
	constructor(props){
		super(props);
		this.inputChange=this.inputChange.bind(this);
		this.value = (this.props.value === undefined) ? "": this.props.value;

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
					group.push( <option key={item.group+index} value={innerItem}> {innerItem} </option>)
				})
				options.push(<optgroup key={item.group} label={item.group}> {group}</optgroup>);

			}
			else{
				options.push( <option key={index} value={item}> {item} </option>)
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

		var lable="";
		if (this.props.lable !== undefined && this.props.lable !== ""){
			lable=(<label className="control-label">{this.props.lable}</label>);
		}
		output = (<div className="form-group">{lable}{select}</div>);
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
		var wrapperClass="form-group";
		if(this.props.error){
				wrapperClass+= " "+"has-error";
		}
		var lable="";
		if (this.props.lable !== undefined && this.props.lable !== ""){
			lable=(<label className="control-label">{this.props.lable}</label>);
		}
		output = (<div className={wrapperClass}>{lable}{input}</div>);
		return(
			<div>
				{output}
			</div>
		);
	}
}

export class Check extends React.Component{
	constructor(props){
		super(props);
		this.inputChange=this.inputChange.bind(this);


	}
	inputChange(e){

		this.props.inputChanged(e);
	}
	render(){
		this.value = (this.props.value === undefined) ? 0 : this.props.value;
		this.placeholder = (this.props.placeholder === undefined) ? "": this.props.placeholder;
		this.lable = (this.props.lable === undefined) ? "": this.props.lable;
		this.className= (this.props.className === undefined) ? "form-check-input": "form-check-input " +this.props.className;
		this.disabled = (this.props.disabled === undefined||this.props.disabled==false||this.props.disabled=="") ? false: true;
		this.required = (this.props.required === undefined||this.props.required==false||this.props.required=="") ? false: true;
		this.readonly = (this.props.readonly === undefined||this.props.readonly==false||this.props.readonly=="") ? false: true;

		var output="";
		var input=(
			<input
				type="checkbox"
				className={this.className}
				checked={this.value}

				onChange={this.props.inputChanged}
				disabled={this.disabled}
	          	readOnly={this.readonly}
	          	required={this.required}
			/>
		);

		if (this.props.lable !== undefined || this.props.lable ==""){
			output = (
				<div className="checkbox">
		    		<label className="control-label">
		      			{input}{this.props.lable}
		      		</label>
		  		</div>
		  	);
		}
		else{
			output = (
				<div className="checkbox">
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
export class Textarea extends React.Component{
	constructor(props){
		super(props);
		this.inputChange=this.inputChange.bind(this);

	}
	inputChange(e){
		this.props.inputChanged(e);
	}
	render(){
		this.value = (this.props.value === undefined) ? 0 : this.props.value;
		this.placeholder = (this.props.placeholder === undefined) ? "": this.props.placeholder;
		this.lable = (this.props.lable === undefined) ? "": this.props.lable;
		this.className= (this.props.className === undefined) ? "form-control": "form-control " +this.props.className;
		this.disabled = (this.props.disabled === undefined||this.props.disabled==false||this.props.disabled=="") ? false: true;
		this.required = (this.props.required === undefined||this.props.required==false||this.props.required=="") ? false: true;
		this.readonly = (this.props.readonly === undefined||this.props.readonly==false||this.props.readonly=="") ? false: true;
		this.rows = (this.props.rows === undefined||this.props.rows=="") ? 3: this.props.rows;
		var output="";
		var input=(
			<textarea
				className={this.className}
				value={this.value}
				onChange={this.props.inputChanged}
				rows={this.rows}
				disabled={this.disabled}
	          	readOnly={this.readonly}
	          	required={this.required}
			/>
		);
		var lable="";
		if (this.props.lable !== undefined && this.props.lable !== ""){
			lable=(<label className="control-label">{this.props.lable}</label>);
		}
		output = (<div className="form-group">{lable}{input}</div>);
		return(
			<div>{output}</div>
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
		this.componentWillUnmount=this.componentWillUnmount.bind(this);
		this.refCall=this.refCall.bind(this);

		//this.workorderObj=this.onStatusChanged.bind(this);
		/*          end          */
		this.itemlist=[];
		this.state={itemlist:[]};
		this._isMounted=false;
		var args={};
		var options={doctype:this.props.doctype};
		var filter={};
		if (this.props.filter==undefined || this.props.filter==null){

		}else{
			filter= this.props.filter;
		}
		this.listTool = new ps.apiTool(filter, options ,this.docChanged);
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
		this.autocomplete();

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
	componentWillUnmount(){
		// console.log("HELLO");
		// this.aw.destroy();
		// delete this.aw;
		// console.log("TEST");
	}
	refCall(input){
		this.input=input;
	}
	autocomplete(input){
		input=this.input;
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
		$(input).click( function() {
			if (this.aw.ul.childNodes.length === 0) {
				this.aw.minChars = 0;
				this.aw.evaluate();
			}
			else if (this.aw.ul.hasAttribute('hidden')) {
				this.aw.open();
			}
			else {
				this.aw.close();
			}
		}.bind(this));
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
					ref={this.refCall}
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
		var icon="";
		if(this.props.icon!== undefined && this.props.icon!==""){
			var iconClass="glyphicon " +this.props.icon;
			icon=(<span className={iconClass} aria-hidden="true"></span>);
		}
		var input=(
			<button
				type={this.type}
				className={this.className}
				value={this.value}
				onClick={this.props.onClick}
				disabled={this.disabled}
			>{icon} {this.value}</button>
		);
		return(
			<div className="form-group">
	  		{input}
	  	</div>
		);
	}
}
