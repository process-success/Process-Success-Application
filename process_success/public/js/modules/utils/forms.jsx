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
				return (
					<Select
						key={this.props.id+index} 
						className={className}
						lable={lable}
						options={options}
					/>
				);
			}.bind(this),
			input 	: function(item,index){
				var type = (item.type === undefined) ? "text": item.type;
				var value = (item.value === undefined) ? "": item.value;
				var placeholder = (item.placeholder === undefined) ? "": item.placeholder;
				var lable = (item.lable === undefined) ? "": item.lable;
				var className = (item.className === undefined) ? "": item.className;
				return (
					<Input
						key={this.props.id+index} 
						type={type}
						value={value}
						placeholder={placeholder}
						lable={lable}
						className={className}
						inputChanged={function(e){var test;}}
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
				return(
					<DateInput
						key={this.props.id+index} 
						value={value}
						placeholder={placeholder}
						lable={lable}
						className={className}
						inputChanged={function(e){item.onChange(e)}}
					/>
				);
			}.bind(this),
			autoComplete: function(item,index){
				var value = (item.value === undefined) ? "": item.value;
				var lable = (item.lable === undefined) ? "": item.lable;
				var placeholder = (item.placeholder === undefined) ? "": item.placeholder;
				var className = (item.className === undefined) ? "": item.className;
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
						inputChanged={function(e){item.onChange(e)}}
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
export class DateInput extends React.Component{
	constructor(props){
		super(props);
		this.inputChange=this.inputChange.bind(this);
		this.dateInit=this.dateInit.bind(this);

	}
	inputChange(e){
		this.props.inputChanged();
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
		if (this.props.doclable !== undefined && this.listTool.items !== undefined){
			for(let item of this.listTool.items){
				var temp =[item[this.props.doclable],item[this.props.docvalue]];
				this.itemlist.push(temp);
			}
		}
		else if(this.listTool.items !== undefined){
			for(let item of this.listTool.items){
				this.itemlist.push(item[this.props.docvalue]);
			}
		}
		if(this._isMounted){
			//this.setState({itemlist:this.state.itemlist});
		}
		$(document).trigger('listLoad' + this.props.doctype);
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
		// $('#poo').focus(function(){
		// 		this.aw.open();
		// }.bind(this));
		//console.log()
		// input.target.onfocus( function() {
		// 	console.log(focus);
		// 	if (aw.ul.hasAttribute('hidden')) {
		// 		aw.open();
		// 	}
		// 	else {
		// 		aw.close();
		// 	}
		// });
		// input.addEventListener("onblur", function() {
		// 	if (aw.ul.childNodes.length === 0) {
		// 		aw.minChars = 0;
		// 		aw.evaluate();
		// 	}
		// 	else {
		// 		aw.close();
		// 	}
		// });

		this.aw.list=this.itemList;
		$(document).bind('listLoad' + this.props.doctype,function(){
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
		var output="";
		this.className= (this.props.className === undefined) ? "form-control awesomplete": "form-control awesomplete " +this.props.className;
		var input=( <input 
					type={this.type} 
					className={this.className} 
					placeholder={this.placeholder} 
					ref={this.autocomplete}
		          	onChange={this.inputChange} 
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


