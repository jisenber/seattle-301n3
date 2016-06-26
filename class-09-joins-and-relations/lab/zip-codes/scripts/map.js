function initMap(zipData) {
  console.log(zipData)
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.611435, lng: -122.330456},
    scrollwheel: true,
    zoom: 8
  });
  var myMap = {
    lat: zipData[0].latitude,
    lng: zipData[0].longitude
    }
    var marker = new google.maps.Marker({
      position: myMap,
      map: map,
      title: 'You are Here'
    });
    marker.setMap(map)
  };


  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
