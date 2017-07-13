import DoctypeForm from '../utils/doctypeForm'
import Table from '../utils/table'
import Modal from '../utils/modal'

export default class DocTable extends React.Component{
	constructor(props){
		super(props);
		this.returnColumns=this.returnColumns.bind(this);
		this.tableChange=this.tableChange.bind(this);
		this.returnContent=this.returnContent.bind(this);
		this.editableContent=this.editableContent.bind(this);
		console.log(this.props.filter);
		this.tableTool = new ps.apiTool(this.props.filter,{doctype:this.props.doctype},this.tableChange);
		this.state={
			items:this.tableTool.items,
			currentItem:{},
			formMode:"create"

		};
		this.modalID=this.props.id+"_form_modal";
	}
  	tableChange(){
		this.setState({items:this.tableTool.items});
	}
	returnColumns(){
		var columns =[];
		for(var x=0; x < this.props.config.length; x++){
			var item=this.props.config[x];
			columns.push({title:item.lable});
		}
		if(this.props.editable){
			columns.push({title:"Edit"});
		}

		return columns;
	}
	returnContent(){
		var content=[];
		if(this.state.items!==null){
			this.state.items.map(function(item, index){
				var tdcontent=[];
				for(var x=0; x < this.props.config.length; x++){
					var config=this.props.config[x];
					if(config.href){
						tdcontent.push(<td key={this.props.id + index + "_" + x} ><a href={item[config.href]} >{item[config.value]}</a></td>)
					}else{
						tdcontent.push(<td>{item[config.value]}</td>)
					}
				}
				if(this.props.editable){
					tdcontent.push(
						<td key={this.props.id + index + "_" + x} >
							<button 
								type="button" 
								className="btn btn-default inline-task"
								onClick={
									function(){
										this.setState({
											formMode:"edit",
											currentItem:item
										});
										$("#"+this.modalID).modal();
									}.bind(this)
								}

							>
								Edit <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
							</button>

						</td>
					);
				}
				content.push((
					<tr key={this.props.id + index}>
						{tdcontent}
					</tr>
				));	
			}.bind(this));
		}
		return (<tbody>{content}</tbody>);
	}
	editableContent(){
		var formProps={};
		formProps.doctype=this.props.doctype;
		for(var x=0; x < this.props.config.length; x++){
			var config=this.props.config[x];
			formProps[config.value]=config;
		}
		var form=(

				<DoctypeForm 
					close={function(){$("#"+this.modalID).modal('hide');}.bind(this)}
					itemChange={
						function(item){
							this.setState({currentItem:item})}.bind(this)
						}
					create={
						function(item,doctype){
							for(var x=0; x < this.props.config.length; x++){
								var config=this.props.config[x];
								if(config.default){
									item[config.value] = config.default;
								}
							}
							item.doctype=doctype;
							this.tableTool.create(item);
							$('#'+this.modalID).modal('toggle');
						}.bind(this)
					}
					edit={function(item){
						this.tableTool.update(item);
						$('#'+this.modalID).modal('toggle');
					}.bind(this)}
					delete={function(item){
						  this.tableTool.delete(item);
						$('#'+this.modalID).modal('toggle');
					}.bind(this)}
					mode={this.state.formMode}
					item={this.state.currentItem}
					id="thing"
				/>
		);
		
		//loop the config to create form items

		form=React.cloneElement(form ,formProps);
		return (
			<div>
				<button 
					type="button" 
					className="btn btn-primary" 
					onClick={function(){
						this.setState({
							formMode:"create",
							currentItem:{}
						});
						$("#"+this.modalID).modal();
					}.bind(this)}
					>
					Create {this.props.doctype} <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
				</button>
				<Modal 
					id={this.modalID}
					submitText="Submit" 
					title={"Create " + this.props.doctype}
					submit={false}
					>
					{form}
				</Modal>
			</div>
			);
	}
	someFunction(){
	}
	render(){
		var form="";
		if(this.props.editable){
			form=this.editableContent();
		}
		var columns=this.returnColumns();
		var content=this.returnContent();
		return(
			<div>
				<Table 
					id={this.props.id}
					title="Spray Table"
					content={content}
					columns={columns}
				/>
				{form}
			</div>
		);
	}
}