var map;
		

		function myMap() {
			map = new google.maps.Map(document.getElementById('map'), {
			    center: new google.maps.LatLng(34.05, -118.24),
			    zoom: 10,
			    mapTypeId: google.maps.MapTypeId.HYBRID
			})

			var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
	        var icons = {
	          person: {
	            icon: iconBase + 'man_maps.png'
	          }
	        };

	        function addMarker(feature) {
	        	{% for cont in rowContent: %}
				var address = "{{cont['address']}}";

				var geocoder = new google.maps.Geocoder();
  				geocoder.geocode({'address': address}, function(results, status) {
    				if (status === google.maps.GeocoderStatus.OK) {
      					var marker = new google.maps.Marker({
        				map: map,
        				position: results[0].geometry.location,
        				icon: icons[feature.type].icon
      					});

      					marker.infowindow = new google.maps.InfoWindow({content: '<div contentEditable="true">{{cont['employee_name']}}<br>{{cont['work_order']}}<br>{{cont['description']}}</div>'});
	          			marker.infowindow.setPosition(results[0].geometry.location);
	          			marker.infowindow.setOptions({
			    			pixelOffset: new google.maps.Size(0, -20)
			  			});
			  			google.maps.event.addListener(marker, 'click', function(event){
							marker.infowindow.open(map);
						});
	          			
				    } else {
				      alert('Geocode was not successful for the following reason: ' + status);
				    }
				  });


	          {% endfor %} 

	          
        }

        var features = [
          {
            position: new google.maps.LatLng(34.05, -118.24),
            type: 'person'
          }
        ];

        for (var i = 0, feature; feature = features[i]; i++) {
          addMarker(feature);
        }
		
  	}
