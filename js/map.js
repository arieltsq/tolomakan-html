/* global google */
function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

var posLat
var posLng
var pinLat
var pinLng

function initMap1 () {
  posLat = +getParameterByName('posLat')
  posLng = +getParameterByName('posLng')
  pinLat = +getParameterByName('pinLat')
  pinLng = +getParameterByName('pinLng')
  var directionsDisplay = new google.maps.DirectionsRenderer
  var directionsService = new google.maps.DirectionsService
  var map = new google.maps.Map(document.getElementById('map1'), {
    zoom: 14,
    center: {lat: 37.77, lng: -122.447}
  })
  directionsDisplay.setMap(map)

  calculateAndDisplayRoute(directionsService, directionsDisplay)
  document.getElementById('mode').addEventListener('change', function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay)
  })
}

function calculateAndDisplayRoute (directionsService, directionsDisplay) {
  var selectedMode = document.getElementById('mode').value
  directionsService.route({
    // origin: {lat: posLat, lng: posLng},  // Haight.
    //1.279023  + '&' + 'lat=' + 103.841453
    origin: {lat: 103.841453, lng: 1.279023},  // Haight.
    destination: {lat: pinLat, lng: pinLng},  // Ocean Beach.
    // Note that Javascript allows us to access the constant
    // using square brackets and a string value as its
    // "property."
    travelMode: google.maps.TravelMode[selectedMode]
  }, function (response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response)
    } else {
      window.alert('Directions request failed due to ' + status)
    }
  })
}
