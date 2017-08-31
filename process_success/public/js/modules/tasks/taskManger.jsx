import AcordianContent from '../utils/acordianContent'
import DoctypeUpdater from '../tasks/taskUpdater'
import Form from '../utils/forms'
import {Check,Button} from '../utils/forms'
import DoctypeForm from '../utils/doctypeForm'

export default class TaskManager extends React.Component{
  constructor(props) {
  	super(props);
  	this.taskUpdate=this.taskUpdate.bind(this);
  	this.updateNewTaskName=this.updateNewTaskName.bind(this);
  	this.createTask=this.createTask.bind(this);

  	this.doctypeTool = new ps.apiTool(
  		{module:"Tasks"},
  		{doctype:'DocType'},
  		this.taskUpdate
  	);
  	this.taskOptionTool = new ps.apiTool(
  		{},
  		{doctype:'task_options'},
  		this.taskUpdate
  	);
  	this.state={
  		tasks:this.doctypeTool.items,
  		taskNameError:0,
  		newTaskName:""
  	}
  }

  taskUpdate(){
  	this.setState({
  		tasks:this.doctypeTool.items
  	})
  }
  taskOptionsUpdate(){
    this.setState({
      tasks:this.taskOptionTool.items
    })
  }

  updateNewTaskName(e){
  	this.setState({
  		newTaskName:e.target.value,
  		taskNameError:0
  	});
  }

  createTask(e){
  	e.preventDefault();
  	if(this.state.newTaskName==""){
  		ps.failAlert("Task Name Required");
  		this.setState({taskNameError:1});
  	}else{
  		//"complete","vineyard","hours","note","season","location","date"

  		this.doctypeTool.create(
  			{
  				name:this.state.newTaskName,
  				module:"Tasks",
  				custom:1,
  				fields:[
  					{
  						fieldname:"Season",
  						label:"Season",
  						fieldtype:"Link",
  						options:"Season"
  					},
  					{
  						fieldname:"Vineyard",
  						label:"Vineyard",
  						fieldtype:"Link",
  						options:"Vineyard"
  					},
  					{
  						fieldname:"Hours",
  						label:"Hours",
  						fieldtype:"Time"
  					},
  					{
  						fieldname:"Date",
  						label:"Date",
  						fieldtype:"Date"
  					},
  					{
  						fieldname:"Complete",
  						label:"Complete",
  						fieldtype:"Date"
  					},
  					{
  						fieldname:"Note",
  						label:"Note",
  						fieldtype:"Data"
  					},
  					{
  						fieldname:"Location",
  						label:"Location",
  						fieldtype:"Link",
  						options:"Location"
  					}
  				],
  				permissions:[
  					{
  						docType:"DocPerm",
  						role:"System Manager"
  					}
  				]
  			}
  		, this.taskOptionTool.create({
          task_name:this.state.newTaskName,
        })
      )
  		this.setState({newTaskName:""});
  	}
  }


  render(){
  	//console.log("inrender");
  	var items=[];

    //Create New Task Fields
  	this.feilds=[
  		{
  			field:"input",
  			value:this.state.newTaskName,
  			placeholder:"Task Name",
  			error:this.state.taskNameError,
  			required:1,
  			onChange: this.updateNewTaskName,
  		},
  		{
  			field:"button",
  			value:"Create New Task",
  			className:"btn-primary",
  			icon:"glyphicon-plus",
  			onClick: this.createTask
  		}
  	]

    // Map all Tasks
  	if (this.state.tasks!==null){
  		this.state.tasks.map(function(item) {
        //get the options
        var currentOptionsIndex="";
        this.taskOptionTool.items.forEach(function(options,optionsIndex){
          if(options.name == item.name){
            currentOptionsIndex=optionsIndex;
            console.log("options",this.taskOptionTool.items[currentOptionsIndex]);
            console.log("item",item);
          }
        }.bind(this));
  			items.push(
  				<AcordianContent
  				title={item.name}
  				active={false}
  				parentId={item.name}
  				id={"task_display_"+item.name.replace(/ /g,"_")} >

  					<DoctypeUpdater
  						hiddenFields={["complete","vineyard","hours","note","season","location","date"]}
  						doctypeItem={item}
  						addFieldForm={function(){
  							item.fields.push({
  								fieldname:"",
  								fieldtype:"Data",
                  idx:item.fields.length+1
  							});
  							this.setState({tasks:this.doctypeTool.items});

  						}.bind(this)}
              fieldSelect={function(value,idx){
                item.fields.forEach(function(field,index){
                  if(field.idx==idx){
                    item.fields[index].fieldtype=value;
                    return;
                  }
                });
                this.setState({tasks:this.doctypeTool.items});
              }.bind(this)}
              nameChanged={function(value,idx){
                item.fields.forEach(function(field,index){
                  if(field.idx==idx){
                    item.fields[index].fieldname=value;
                    return;
                  }
                });
                this.setState({tasks:this.doctypeTool.items});
              }.bind(this)}
              optionsChanged={function(value,idx){
                item.fields.forEach(function(field,index){
                  if(field.idx==idx){
                    item.fields[index].options=value;
                    return;
                  }
                });
                this.setState({tasks:this.doctypeTool.items});
              }.bind(this)}
              removeFieldForm={function(idx){
                item.fields.forEach(function(field,index){
                  if(field.idx==idx){
                    item.fields.splice(index,1);
                    return;
                  }
                });
                this.setState({tasks:this.doctypeTool.items});
              }.bind(this)}
  						update={function(item){
                this.doctypeTool.update(item);
              }.bind(this)}
  						/>

              <DoctypeForm
              	edit={function(){
              		// this.tableTool.update(item);
              		// $('#'+this.modalID).modal('toggle');
              	}.bind(this)}
                doctype={"task_options"}
                item={this.taskOptionTool.items[currentOptionsIndex]}
              	id="thing"
              />
  				</AcordianContent>
  			);
  		}.bind(this));
  	}
  	return(
  		<div>{items}

  				<Form
  					className="inline"
  					type="inline"
  					rows="2"
  					fields={this.feilds}
  					id="thing"
  				/>
  	</div>
  	);

  }
}
