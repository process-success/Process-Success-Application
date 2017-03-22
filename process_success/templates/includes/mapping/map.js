(function(){
    frappe.provide("ps.mapping")

    var infowindow = new google.maps.InfoWindow();

    function initMap(geojson, center) {

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: new google.maps.LatLng(center[1], center[0])
          });

        map.data.addGeoJson(geojson);

        google.maps.event.addListener(map, 'click', function() {
             infowindow.close();
        });

        map.data.addListener('click', function(event) {
            infowindow.setContent(event.feature.getProperty('name')+"<br>"+event.feature.getProperty('description'));
            infowindow.setPosition(event.latLng);
            infowindow.setOptions({pixelOffset: new google.maps.Size(0,-34)});
            infowindow.open(map);
          });
    }

    frappe.ready(function(){
        var geojson = {{geojson}}

        google.maps.event.addDomListener(window, 'load', initMap(geojson.data, geojson.center));
    });

})();
