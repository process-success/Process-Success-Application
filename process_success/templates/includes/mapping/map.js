function validateData(o) {

   var validateCoordinates = function (items) {
        var validAll = items.every(function (item) {
            var latLngs = item.getArray();
            valid = latLngs.every(function (latLng) {
                return isValidLatLng(latLng);
            });
            return valid;
        });
        return validAll;
    };

    var f = o.feature;
    var geometry = f.getGeometry();
    if (geometry.getType() == "MultiPolygon") {
        var allCoords = geometry.getArray();
        allCoords.forEach(function(coords) {
            if (!validateCoordinates(coords.getArray())) {
                document.getElementById('output').innerHTML += 'Geo JSON contains invalid lat/lng'; 
            }
        });
    } else {
        var coords = geometry.getArray();
        if (!validateCoordinates(coords)) {
             document.getElementById('output').innerHTML += 'Geo JSON contains invalid lat/lng'; 
        }
    }
}


function isValidLatLng(latLng) {
    return latLng.lat() != 90;
}

frappe.ready(function(){
    function initMap() {

        var geojson = {
              "type": "FeatureCollection",
              "features": [
                {
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": [
                      -120.201,
                      34.6122
                    ]
                  },
                  "properties": {
                    "marker-color": "#800b0b",
                    "marker-size": "medium",
                    "marker-symbol": "",
                    "Name": "Margerum Wines"
                  }
                }
              ]
            };

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: {lat: -28, lng: 137}
          });

        console.log(vaidateData(geojson));
        map.data.loadGeoJson(geojson);
    }

    google.maps.event.addDomListener(window, 'load', initMap);
});