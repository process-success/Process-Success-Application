export default class Table extends React.Component{
	constructor(props){
		super(props);
		this.initTable=this.initTable.bind(this);
		this.componentDidUpdate=this.componentDidUpdate.bind(this);
		this.componentWillUpdate=this.componentWillUpdate.bind(this);

	}

	initTable(){
		//
		// if(this.table !== undefined){
		// 	this.table.destroy();
		// }
		console.log(this.props.content);
	    this.table=$("#"+this.props.id).DataTable({
	    	"destroy": true,
	    	"scrollY": '70vh',
        	"scrollCollapse": true,
	        "scrollX": true,
	        "paging":   false,
	        "stateSave": true,
	        "columns": this.props.columns,
	        "info":     false
	    });
	}
	componentWillUpdate(){

		if(this.table !== undefined){
			console.log("DESTROY");
			this.table.destroy();
		}
	}
	componentDidUpdate(){
		this.initTable();
	}

	render(){
		return(

			<table
				className="stripe table table-bordered ps-list-table" 
				width="100%"
				id={this.props.id}
				>
				{this.props.content}
			</table>
		);
	}
}