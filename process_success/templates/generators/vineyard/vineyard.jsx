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
				default:currentVineyard
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
		var prunningConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				active:0,
				default:currentVineyard
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
			}
		];
		var harvestConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				active:0,
				default:currentVineyard
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
			}
		];
		var birdNetsConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				active:0,
				default:currentVineyard
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
			}
		];
		var wateringConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				active:0,
				default:currentVineyard
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
			}
		];
		var canopyConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				active:0,
				default:currentVineyard
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
			}
		];
		var brixConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:currentVineyard,
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
			}
		];
		ReactDOM.render( <div>
			<AcordianContent
				className="tablePanel"
				title="Spraying Table"
				active={true}
				parentId="Spraying"
				id="Spraying" > 
				<DocTable 
					search={false}
					doctype="Spraying"
					id="doctable"
					filter={ {vineyard:currentVineyard} }
					config={sprayConfig}
					editable={1}
				/> 
			</AcordianContent>
			<AcordianContent
				className="tablePanel"
				title="Pruning Table"
				active={true}
				parentId="pruning"
				id="pruning"> 
				<DocTable 
					search={false}
					doctype="Pruning"
					id="PruningTable"
					filter={ {vineyard:currentVineyard} }
					config={prunningConfig}
					editable={1}
				/> 
			</AcordianContent>
			<AcordianContent
				className="tablePanel"
				title="Harvest Table"
				active={true}
				parentId="harvest"
				id="harvestAcordian"> 
				<DocTable 
					search={false}
					doctype="Harvest"
					id="HarvestTable"
					filter={ {vineyard:currentVineyard} }
					config={harvestConfig}
					editable={1}
				/> 
			</AcordianContent>
			<AcordianContent
				className="tablePanel"
				title="Bird Nets Table"
				active={true}
				parentId="birdnets"
				id="birdNetsAcordian"> 
				<DocTable 
					search={false}
					doctype="Bird Nets"
					id="birdNetsTable"
					filter={ {vineyard:currentVineyard} }
					config={birdNetsConfig}
					editable={1}
				/> 
			</AcordianContent>
			<AcordianContent
				className="tablePanel"
				title="Watering Table"
				active={true}
				parentId="watering"
				id="wateringAcordian"> 
				<DocTable 
					search={false}
					doctype="Watering"
					id="WateringTable"
					filter={ {vineyard:currentVineyard} }
					config={wateringConfig}
					editable={1}
				/> 
			</AcordianContent>
			<AcordianContent
				className="tablePanel"
				title="Canopy Table"
				active={true}
				parentId="canopy"
				id="canopyAcordian"> 
				<DocTable 
					search={false}
					doctype="Canopy"
					id="canopyTable"
					filter={ {vineyard:currentVineyard} }
					config={canopyConfig}
					editable={1}
				/> 
			</AcordianContent>
			<AcordianContent
				className="tablePanel"
				title="Brix Table"
				active={true}
				parentId="brix"
				id="brixAcordian"> 
				<DocTable 
					search={false}
					doctype="Brix"
					id="brixTable"
					filter={ {} }
					config={brixConfig}
					editable={1}
				/> 
			</AcordianContent>
			</div>

		, app );
		$('.tablePanel').collapse('hide');
	})
	
})();  

//$('.tablePanel').collapse('hide');
