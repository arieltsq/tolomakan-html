/* global $  */
$(function () {
  $('#tolo').click(function () {
    fetchTolo()
  })
  $('#random').click(function () {
    fetchMakan()
  })
  $('#submit').click(function () {
    console.log('clicked')
    initMap2()
  })
})

function fetchMakan () {
  $('#main').empty()
  $('#indexText').empty()
  $('#indexText').append('<h4>The MAKAN Master has spoke: </h4>')
  $.get('https://tolomakan.herokuapp.com/makans')
  .done(function (data) {
    data.forEach(function (datum) {
      // $('#main').append('<div class="col-xs-6 col-md-3"> <div class="thumbnail color">' + datum.name + '-' + datum.categories + '</div></div>').css('height', '300px')
      $('#main').append('<div class="panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div class=" bigger-font"><strong>Place: </strong>' + datum.name + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p>' + '<button class="edit">Edit</button></div></div></div>')
    })
    // console.log(data)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}

$('.edit').click(function () {
  console.log('click')
})
function fetchTolo () {
  $('#main').empty()
  $('#indexText').empty()
  $('#indexText').append('<h4> Here are the places you should makan today!</h4>')
  var data = 'lng=' + pos.lng + '&' + 'lat=' + pos.lat
  $.get('https://tolomakan.herokuapp.com/randomFive?' + data)
  .done(function (data) {
    data.forEach(function (datum) {
      // $('#main').append('<div class="col-xs-6 col-md-3"> <div class="thumbnail color"> <b>Place: </b>' + datum.name + '<br/>' + '<b>Address:</b> ' + datum.address + '<b>Categories:</b> ' + datum.categories + '</div></div>')
      // $('#main').append('<h4 class="media-heading"> <b>Place: </b>' + datum.name + '</h4>'
      $('#main').append('<div class="panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div class=" bigger-font"><strong>Place: </strong>' + datum.name + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p></div></div></div>')
    })
    // console.log(data)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}

function initMap2() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 40.731, lng: -73.997}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;


    geocodeLatLng(geocoder, map, infowindow);
}

function geocodeLatLng(geocoder, map, infowindow) {
  // var input = document.getElementById('latlng').value;
  // var latlngStr = input.split(',', 2);
  // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': pos}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        $('#currentLocation').append(results[1].formatted_address)
        // infowindow.setContent(results[1].formatted_address);
        // infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}
