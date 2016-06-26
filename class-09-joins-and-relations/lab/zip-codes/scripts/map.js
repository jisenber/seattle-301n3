function initMap(zipData) {
  // Create a map object and specify the DOM element for display.
  if (zipData) {
    var myMap = {
      lat: zipData[0].latitude,
      lng: zipData[0].longitude
    };
    var map = new google.maps.Map(document.getElementById('map'), {
      center: myMap,
      scrollwheel: true,
      zoom: 8
    });
    zipData.forEach(function(markers) {
      new google.maps.Marker({
        position: {lat: markers.latitude,
                lng: markers.longitude
              },
        map: map,
        title: 'You are Here'
      });
    });
  } else {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.611435, lng: -122.330456},
      scrollwheel: true,
      zoom: 8
    });
  }
}

  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
