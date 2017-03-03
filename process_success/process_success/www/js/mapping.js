function myMap() {
		var mapOptions = {
		    center: new google.maps.LatLng(34.05, -118.24),
		    zoom: 10,
		    mapTypeId: google.maps.MapTypeId.HYBRID
		}
		var myCenter = new google.maps.LatLng(34.05, -118.24);
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  		var marker = new google.maps.Marker({position:myCenter});
  		marker.setMap(map);
		}