$(document).on('click', '#getMore', function () {
  fetchMapTolo()
  fetchMapMakan()
})

var pinLatitude
var pinLongitude

function initMap1() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map1'), {
    zoom: 14,
    center: {lat: 37.77, lng: -122.447}
  });
  directionsDisplay.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsDisplay);
  document.getElementById('mode').addEventListener('change', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
    origin: {lat: 1.2790333999999999, lng: 103.84146129999999},  // Haight.
    destination: {lat: 1.280183, lng: 103.841451},  // Ocean Beach.
    // Note that Javascript allows us to access the constant
    // using square brackets and a string value as its
    // "property."
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response)
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  })
}

function fetchMapTolo () {
  $('#main').empty()
  console.log("testing the map js logic")
  //  1.278668, 103.841098
  // var data = 'lng=' + pos.lng + '&' + 'lat=' + pos.lat
  var data = 'lng=' + 103.841098 + '&' + 'lat=' + 1.278668
  $.get('https://tolomakan.herokuapp.com/randomFive?' + data)
  .done(function (data) {
    data.forEach(function (datum) {
  $('#main').append('<div class="makanOption panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div id="value" class=" bigger-font"><strong>Place: </strong>' + '<span class=datumName>' + datum.name + '</span>' + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p><p class="latitude hide">' + datum.latitude + '</p><p class="longitude hide">' + datum.longitude + '</p></div></div></div>')
    })
    // console.log(data)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}

function fetchMapMakan () {
  pinLatitude = $('.latitude').first().text()
  pinLongitude = $('.longitude').first().text()
  console.log(pinLatitude)
  console.log(pinLongitude)
  $('#main').empty()
  window.location.href = './map.html?pinLat=' + pinLatitude + '&pinLng=' + pinLongitude + '&posLng=' + pos.lng + '&posLat=' + pos.lat
}
