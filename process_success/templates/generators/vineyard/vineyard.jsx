import DocTable from '../../../public/js/modules/utils/docTable'
import AcordianContent from '../../../public/js/modules/utils/acordianContent'


const app= $('#app')[0];

(function(){
	var filter={};
	frappe.ready(function(){
		var workorderConfig=[
			{
				lable:"Vineyard",
				value:"location",
				href:"location_route",
				inTable:false,
				active:0,
				default:currentVineyard
			},
			{
				lable:"Status",
				value:"status"
			},
			{
				lable:"Priority",
				value:"priority",
				active:1
			},
			{
				lable:"Season",
				value:"season",
				active:1
			},
			{
				lable:"Date",
				value:"date",
				active:1
			}
		];
		var issueConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				inTable:false,
				active:0,
				default:currentVineyard
			},
			{
				lable:"Status",
				value:"status",
				active:1
			},
			{
				lable:"Priority",
				value:"priority",
				active:1
			},
			{
				lable:"Work Order",
				value:"work_order",
				active:1
			},
			{
				lable:"Issue",
				value:"issue",
				active:1,
				type:"textarea"
			}
		];
		var sprayConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				inTable:false,
				active:0,
				default:currentVineyard
			},
			{
				lable:"Work Order",
				value:"work_order",
				active:1
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
		//done
		var prunningConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				inTable:false,
				active:0,
				default:currentVineyard
			},
			{
				lable:"Work Order",
				value:"work_order",
				active:1
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
				lable:"Date",
				value:"date",
				active:1
			},
			{
				lable:"Style",
				value:"type",
				active:1
			},
			{
				lable:"B-Lock",
				value:"b_lock",
				active:1
			},
			{
				lable:"Pruning Removed",
				value:"removed",
				active:1
			},
			{
				lable:"Pre Prune",
				value:"pre_prune",
				active:1
			},
			{
				lable:"Tap Removed",
				value:"tap_removed",
				active:1
			}
		];
		var harvestConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				inTable:false,
				active:0,
				default:currentVineyard
			},
			{
				lable:"Work Order",
				value:"work_order",
				active:1
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
				lable:"Pounds",
				value:"pounds",
				active:1
			},
			{
				lable:"Post Harvest Water",
				value:"post_harvest_water",
				active:1
			}
		];
		var birdNetsConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				inTable:false,
				active:0,
				default:currentVineyard
			},
			{
				lable:"Work Order",
				value:"work_order",
				active:1
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
				inTable:false,
				active:0,
				default:currentVineyard
			},
			{
				lable:"Work Order",
				value:"work_order",
				active:1
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
				lable:"Duration",
				value:"duration",
				active:1
			}
		];
		var canopyConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:"vineyard_route",
				inTable:false,
				active:0,
				default:currentVineyard
			},
			{
				lable:"Work Order",
				value:"work_order",
				active:1
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
				lable:"Type",
				value:"type",
				active:1
			}
		];
		var brixConfig=[
			{
				lable:"Vineyard",
				value:"vineyard",
				href:currentVineyard,
				inTable:false,
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
				lable:"Brix A",
				value:"brix_a",
				active:1
			},
			{
				lable:"Brix B",
				value:"brix_b",
				active:1
			}
		];
		ReactDOM.render( <div>
			<AcordianContent
				title="Workorder Table"
				active={false}
				parentId="work_order"
				id="WorkorderAcordian" > 
				<DocTable 
					search={false}
					doctype="work_order"
					id="WorkorderTable"
					filter={ {location:currentVineyard} }
					config={workorderConfig}
					editable={1}
				/> 
			</AcordianContent>
			<AcordianContent
				title="Issue Table"
				active={false}
				parentId="Issue"
				id="IssueAcordian"> 
				<DocTable 
					search={false}
					doctype="Issue"
					id="IssueTable"
					filter={ {vineyard:currentVineyard} }
					config={issueConfig}
					editable={1}
				/> 
			</AcordianContent>
			<AcordianContent
				className="tablePanel"
				title="Spraying Table"
				active={false}
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
				active={false}
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
				active={false}
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
				active={false}
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
				active={false}
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
				active={false}
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
				active={false}
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
		//$('.tablePanel').collapse('hide');
	})
	
})();  

//$('.tablePanel').collapse('hide');
