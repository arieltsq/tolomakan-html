function initMap1() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map1'), {
    zoom: 12,
    center: {lat: 1.3521, lng: 103.8198}
  });
  directionsDisplay.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsDisplay)
  document.getElementById('mode').addEventListener('change', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
    origin: {lat: pos.lat, lng: post.lng},  // Haight.
    destination: {lat: pinLatitude, lng: pinLongitude},  // Ocean Beach.
    // Note that Javascript allows us to access the constant
    // using square brackets and a string value as its
    // "property."
    // 103.846598, 1.372184
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
