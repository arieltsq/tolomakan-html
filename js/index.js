/* global $ pos google*/
$(function () {
  $('#tolo').click(function () {
    fetchTolo()

  })
  $('#random').click(function () {
    fetchMakan()
  })
  $('#submit').click(function () {
    console.log('clicked')
    fetchAddress()
  })
})

$(document).on('click', '.makanOption', function() {
    fetchMap()
})


function fetchMakan () {
  $('#main').empty()
  $('#indexText').empty()
  // $('#indexText').append('<h4>The MAKAN Master has spoke: </h4>')
  $.get('https://tolomakan.herokuapp.com/makans')
  .done(function (data) {
    data.forEach(function (datum) {
      // $('#main').append('<div class="col-xs-6 col-md-3"> <div class="thumbnail color">' + datum.name + '-' + datum.categories + '</div></div>').css('height', '300px')
      $('#main').append('<div class="panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div class=" bigger-font"><strong>Place: </strong>' + datum.name + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p>' + '</div></div></div>')
    })
    // console.log(data)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}
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
      $('#main').append('<div class="makanOption panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div id="value" class=" bigger-font"><strong>Place: </strong>' + '<span class=datumName>' + datum.name + '</span>' + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p><p class="latitude">' + datum.latitude + '</p><p class="longitude">' + datum.longitude + '</p></div></div></div>')
    })
    // console.log(data)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}

function fetchAddress(){
  $('#main').empty()
  $('#indexText').empty()
  $.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + pos.lng + '2%2C' + pos.lat + '.json?types=address&access_token=pk.eyJ1IjoiYXJpZWx0c3EiLCJhIjoiY2lxdW8wN2VvMDBjNGZzbmhxcHZucTlnYyJ9.ZlhYXCCC5kB9G7X3RYzoFw')
  .done(function (data) {
    console.log(data.features[0])
    console.log(data.features[0].place_name)
    // $('#indexText').empty()
    // data.forEach(function (datum) {
    // console.log(datum)
    // })
    // console.log(data)
    var text = $('#currentLocation');
    text.val(data.features[0].place_name);
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}

function fetchMap() {
    pinLatitude = $('.latitude').first().text()
    pinLongitude = $('.longitude').first().text()

    console.log(pinLatitude)
    console.log(pinLongitude)

    $('#main').empty()
    $('#indexText').empty()
    window.location.href = './map.html?pinLat=' + pinLatitude + '&pinLng=' + pinLongitude + '&posLng=' + pos.lng + '&posLat=' + pos.lat
}
