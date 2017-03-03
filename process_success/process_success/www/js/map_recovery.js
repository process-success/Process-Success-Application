var map;
		var markers = [];
		var lines = [];
		var notes = [];
		var finalImageSrc;
		var paths = [];
		var notesToSave = [];

		function search(){
			var p = document.getElementById("person");
			var date = document.getElementById("date");
			frappe.call({
					method: "frappe.www.map_recovery3.send",
					args: {"client":p.options[p.selectedIndex].text,"date": date.value},
					callback: function(r){
						console.log(r);
				}
			});
		}

		function addNote(){
			var infowindow = new google.maps.InfoWindow({content: '<div contentEditable="true">changeme...</div>'});
			google.maps.event.addListenerOnce(map, 'click', function(e){
				infowindow.setPosition(e.latLng);
				infowindow.open(map);
				notes.push(infowindow);
				notesToSave.push(infowindow.getPosition());
				notesToSave.push(infowindow.getContent());

			});
			
		}

		function drawFreeHand()
		{

		    //the polygon
		    var col = document.getElementById("drawColour");
		    poly=new google.maps.Polyline({map:map,clickable:false, strokeColor:col.options[col.selectedIndex].text});
		    lines.push(poly);

		    //move-listener
		    var move=google.maps.event.addListener(map,'mousemove',function(e){
		        poly.getPath().push(e.latLng);
		    });
    
		    //mouseup-listener
		    google.maps.event.addListenerOnce(map,'mouseup',function(e){
		        google.maps.event.removeListener(move);
		        var path=poly.getPath();;
		        poly.setMap(null);
		        poly=new google.maps.Polygon({map:map,path:path,strokeColor:col.options[col.selectedIndex].text});
		      	
		        google.maps.event.addListener(poly, 'click', function(event){
					poly.setMap(null);
				});
		        
		        google.maps.event.clearListeners(map.getDiv(), 'mousedown');
		        
		        enable();
		        addNote();
		    });
		}

		function disable(){
		  map.setOptions({
		    draggable: false, 
		    zoomControl: false, 
		    scrollwheel: false, 
		    disableDoubleClickZoom: false
		  });
		}

		function enable(){
		  map.setOptions({
		    draggable: true, 
		    zoomControl: true, 
		    scrollwheel: true, 
		    disableDoubleClickZoom: true
		  });
		}

		function captureImg(){
			
			var center = map.getCenter();
			center = center.toString();
			var no_brackets = center.substring(1,center.length-1);
			var coord = no_brackets.split(", ");
			var zoom = map.getZoom();
			zoom = zoom.toString();
			var p = document.getElementById("person");
			var date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
			
			var markers_param = "";
			for (var i=0; i<markers.length; i++){
				if (markers[i].getMap()!==null){
					var lat = markers[i].getPosition().lat();
					var lon = markers[i].getPosition().lng();
					var coord = lat.toString().substring(0,10) + "," + lon.toString().substring(0,10);
					markers_param = markers_param + "_" + coord;
				}

			}

			for (var i=0; i<lines.length; i++){	
					var coord = lines[i].getPath();
					var col = lines[i].strokeColor;
					paths.push(coord);
					paths.push(col);

			}
			/*alert(paths);
			poly=new google.maps.Polygon({map:map,path:paths[0],strokeColor:"Red"});
			poly.setMap(map);*/
			
			frappe.call({
					method: "frappe.www.map_drawing37.send",
					args: {"client":p.options[p.selectedIndex].text, "center": center, "markers": markers_param, "notes": notesToSave,"shapes": paths,"date": date},
					callback: function(r){
				}
			});
			

		}

		function convertasbinaryimage(p,date)
		{ 
			html2canvas(document.getElementById("screenshot"), {

			useCORS: true,

			onrendered: function(canvas) {
			     
				 var img = canvas.toDataURL("image/png"); 
				   
				 img = img.replace('data:image/png;base64,', '');
				 finalImageSrc = 'data:image/png;base64,' + img;
				 
			
                    
				}
			});
		}


		function myMap() {
		var mapOptions = {
		    center: new google.maps.LatLng(34.05, -118.24),
		    zoom: 10,
		    mapTypeId: google.maps.MapTypeId.HYBRID
		}
		var myCenter = new google.maps.LatLng(34.05, -118.24);
		map = new google.maps.Map(document.getElementById("map"), mapOptions);

  		var marker = new google.maps.Marker({position:myCenter});
  		markers.push(marker);
  		google.maps.event.addListener(marker, 'click', function(event){
				marker.setMap(null);
			});
  		marker.setMap(map);
  		google.maps.event.addListener(map, 'click', function(event){
  			placeMarker(event.latLng);
  		});
  	}

		function draw(){

		    disable()	

		    google.maps.event.addDomListener(map.getDiv(),'mousedown',function(){
		      drawFreeHand()
		    });

		}

		function placeMarker(location) {
			var marker = new google.maps.Marker({
				position : location,
				map : map
			});
			markers.push(marker);
			google.maps.event.addListener(marker, 'click', function(event){
				marker.setMap(null);
			});

		}

		google.maps.event.addDomListener(window, 'load', myMap);
