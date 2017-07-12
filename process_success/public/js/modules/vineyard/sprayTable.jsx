import Table from '../utils/table'
import Form from '../utils/forms'
import Modal from '../utils/modal'
import DoctypeForm from '../utils/doctypeForm'






export default class SprayTable extends React.Component{
	constructor(props){
		super(props);
		this.state={
			spraying:[]
		};
		this.sprayChange=this.sprayChange.bind(this);
		this.returnContent=this.returnContent.bind(this);
		this.createSprayEntry=this.createSprayEntry.bind(this);
		
		this.sprayTool = new ps.apiTool(this.props.filter,{doctype:'Spraying'},this.sprayChange);
	}

  	sprayChange(){
  		console.log(this.sprayTool.items);
		this.setState({spraying:this.sprayTool.items});
	}
	returnColumns(){
		return [
			{title:"Vineyard"},
			{title:"Season"},
			{title:"Date"},
			{title:"Spray Type"},
			{title:"Quantity"}
		];
	}
	returnContent(){
		var content=[];
		if(this.state.spraying!==null){
			this.state.spraying.map(function(item, index){
				content.push(
					(<tr key={index}>
						<td>{item.vineyard}</td>
						<td>{item.season}</td>
						<td>{item.date}</td>
						<td>{item.spray_type}</td>
						<td>{item.quantity}</td>
					</tr>)
				);	
			}.bind(this));
		}


		return (<tbody>{content}</tbody>);
	}
	createSprayEntry(item){
		console.log("Creating");
		item.date=moment(item.date,"MM/DD/YYYY").format('YYYY-MM-DD');
		this.sprayTool.create(item,function(item){
			ps.successAlert("Spreying Entry " +item.name+ " created.")
		});
	}
	//* *//
  	editTask(item){
  		console.log("edit task called");
  		this.setState(
  			{
  				formState:item.doctype.replace(/\s/g, ''),
  				editItem:item,
  				formMode:"edit"
  			});
  		$('#'+this.modalId).modal();
  	}
	delete(copy){
  		this.tasksTool.delete(copy);
		$('#'+this.modalId).modal('toggle');
	}
  	close(e){
  		console.log("close");
  		e.preventDefault();
  		$('#'+this.modalId).modal('toggle');
  	}
  	update(copy){
  		this.tasksTool.update(copy);
		$('#'+this.modalId).modal('toggle');
  	}
  	create(item,doctype){
		item.work_order=this.props.workorder;
		item.vineyard=this.props.vineyard;
		item.doctype=doctype;
		this.tasksTool.create(item);
		$('#'+this.modalId).modal('toggle');
  	}
  	onChange(copy){
  		this.setState({editItem:copy})
  	}

	render(){
		var columns=this.returnColumns();
		var content=this.returnContent();
		console.log(columns);
		return(
			<div>
			<Table 
				id="sprayTable"
				title="Spray Table"
				content={content}
				columns={columns}
			/>
			<DoctypeForm 
				close={this.close}
				itemChange={this.onChange}
				create={this.create}
				edit={this.update}
				delete={this.delete}
				mode={this.state.formMode}
				item={item}
				id={this.props.workorder}

				doctype="Spraying"
				season={{active:1}}
				note={{
					active:1,
					type:"textarea" 
				}}
				spray_type={{active:1}}
			/> 	
			</div>
			
		);
	}
}

export class SprayFormModal extends React.Component{
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
				<br />				
				<a 
					href="#" 
					className="btn btn-primary"
					onClick={function(){$('#'+ this.props.id).modal()}.bind(this)}
					>
					<span className="glyphicon glyphicon-plus"></span> Create Spraying Entry</a>
				<Modal 
					id={this.props.id} 
					submitText="Submit" 
					title="Create New Spraying Entry"
					submit={false}
					>

					<Form
						id="CreateSprayingEntryForm"
						type="horizontal"
						fields={fields}

					/>

				</Modal>
			</div>
		);
	}
}