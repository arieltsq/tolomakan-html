/* global $ pos */
var pinLatitude
var pinLongitude
$(function () {
  $('#tolo').click(function () {
    fetchTolo()
  })
  $('.dropdown-Price').on('click', 'li', function (event) {
    var price = $(this).text()
    console.log(price)
    $('#get_price').text(price)
    getBudget(price)
  })
  $('#submit').click(function () {
    console.log('clicked')
    fetchAddress()
  })
})

$(document).on('click', '.makanOption', function () {
  var makanId = $(this).attr('id')
  console.log(makanId)
  fetchMap(makanId)
})

$(document).on('click', '.saveOption', function () {
  var historyId = $(this).attr('id')
  console.log(historyId)
  console.log('button click')
  saveHistory(historyId)
})

function getBudget (price) {
  $('#main').empty()
  $('#indexText').empty()
  // 1.279023, 103.841453
  // $.get('https://tolomakan.herokuapp.com/near?lat=' + pos.lat + '&lng=' + pos.lng + '&price=' + price)
  $.get('https://tolomakan.herokuapp.com/near?lat=' + pos.lat + '&lng=' + pos.lng + '&price=' + price)
  .done(function (data) {
    data.forEach(function (datum) {
      $('#main').append('<br><div id="'+data.indexOf(datum)+'" class="makanOption panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div id="value" class=" bigger-font"><strong>Place: </strong>' + '<span class=datumName>' + datum.name + '</span>' + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p><p class= "type"><b>Type:</b> ' + datum.type + '<p class= "Price"><b>Price: $</b>' + datum.price + '<p class="latitude hide">' + datum.latitude + '</p><p class="longitude hide">' + datum.longitude + '</p></div></div></div>')
      $('#main').append('<div> <span class="color bigger-font">Add To History</span> : <button id="' + data.indexOf(datum) + 'Btn" class="btn-small saveOption"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span><p class="datumID hide">' + datum._id + '</p></button></div>')
    })
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}

function fetchTolo () {
  $('#main').empty()
  $('#indexText').empty()
  $('#historyText').empty()
  $('#indexText').append('<h3> Here are the places you should makan today!</h3>')
  var data = 'lng=' + pos.lng + '&' + 'lat=' + pos.lat
  $.get('https://tolomakan.herokuapp.com/randomFive?' + data)
  .done(function (data) {
    data.forEach(function (datum) {
      $('#main').append('<br><div id="'+data.indexOf(datum)+'" class="makanOption panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div id="value" class=" bigger-font"><strong>Place: </strong>' + '<span class=datumName>' + datum.name + '</span>' + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p><p class= "type"><b>Type:</b> ' + datum.type + '<p class= "Price"><b>Price: $</b>' + datum.price + '<p class="latitude hide">' + datum.latitude + '</p><p class="longitude hide">' + datum.longitude + '</p></div></div></div>')
      $('#main').append('<div><button id="' + data.indexOf(datum) + 'Btn" class="btn-small saveOption"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span><p class="datumID hide">' + datum._id + '</p></button></div>')
    })
    // console.log(data)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}

function fetchMap (makanId) {
  pinLatitude = $('#' + makanId).find('.latitude').text()
  pinLongitude = $('#' + makanId).find('.longitude').text()

  console.log(pinLatitude)
  console.log(pinLongitude)

  $('#main').empty()
  $('#indexText').empty()
  window.location.href = './map.html?pinLat=' + pinLatitude + '&pinLng=' + pinLongitude + '&posLng=' + pos.lng + '&posLat=' + pos.lat
}

function saveHistory (historyId) {
  $('#historyText').empty()
  var btnID = $('#' + historyId).find('.datumID').text()
  console.log(btnID)
  $.ajax({
    type: 'POST',
    url: 'https://tolomakan.herokuapp.com/history/' + btnID,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('User-Email', window.localStorage['email'])
      xhr.setRequestHeader('Auth-Token', window.localStorage['auth_token'])
    },
    success: function (result) {
      $('#indexText').append('<h3> History Saved! </h3>')
    }
  })
}

function fetchAddress () {
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
