import DocTable from '../../../public/js/modules/utils/docTable'
import AcordianContent from '../../../public/js/modules/utils/acordianContent'


const app= $('#app')[0];

(function(){
	var filter={};
	frappe.ready(function(){
		var sprayConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				active:0,
				default:"CRV Vines"
			},
			{
				lable:"Season",
				value:"season",
				active:1
			},
			{
				lable:"Note",
				value:"note",
				active:1,
				type:"textarea"
			},
			{
				lable:"Spray Type",
				value:"spray_type",
				active:1
			}
		];
		ReactDOM.render( <div>
			<AcordianContent
				title="Spraying Table"
				active={false}
				parentId="Spraying"
				id="Spraying"
			> 
				<DocTable 
					doctype="Spraying"
					id="doctable"
					filter={ {} }
					config={sprayConfig}
					editable={1}
				/> 
			</AcordianContent>
			<AcordianContent
				title="Spraying Table two"
				active={false}
				parentId="Spraying2"
				id="Spraying2"
			> 
				<DocTable 
					doctype="Spraying"
					id="doctable"
					filter={ {} }
					config={sprayConfig}
					editable={1}
				/> 
			</AcordianContent>
			</div>

		, app );
	})

})();  