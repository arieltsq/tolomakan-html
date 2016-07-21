/* global $ pos */
var pinLatitude
var pinLongitude
$(function () {
  $('#tolo').click(function () {
    fetchTolo()
  })
  $('#random').click(function () {
    fetchMakan()
  })
  $('.dropdown-Price').on('click', 'li', function (event) {
    var price = $(this).text()
    console.log(price)
    $('#get_price').text(price)
    getBudget(price)
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
  $.get('https://tolomakan.herokuapp.com/near?lat=' + pos.lat + '&lng=' + pos.lng + '&price=' + price)
  .done(function (data) {
    data.forEach(function (datum) {
      $('#main').append('<div id="'+data.indexOf(datum)+'" class=" makanOption panel-body"><div class="media-body"><p><h4 class="media-heading"> <div id="value" class=" bigger-font"><strong>Place: </strong>' + '<span class=datumName>' + datum.name + '</span>' + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p><p class= "type"><b>Type:</b> ' + datum.type + '<p class= "Price"><b>Price: $</b>' + datum.price + '<p class="latitude hide">' + datum.latitude + '</p><p class="longitude hide">' + datum.longitude + '</p></div></div>')
      $('#historyBtn').append('<button id="' + data.indexOf(datum) + 'Btn" class="btn-small saveOption"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span><p class="datumID hide">' + datum._id + '</p></button>')
    })
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}

function fetchMakan () {
  $('#main').empty()
  $('#indexText').empty()
  $('#indexText').append('<h3>The MAKAN Master has spoke: </h3>')
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

function fetchTolo () {
  $('#main').empty()
  $('#indexText').empty()
  $('#historyText').empty()
  $('#indexText').append('<h3> Here are the places you should makan today!</h3>')
  $('#historyText').append('<h3> History </h3>')
  var data = 'lng=' + pos.lng + '&' + 'lat=' + pos.lat
  $.get('https://tolomakan.herokuapp.com/randomFive?' + data)
  .done(function (data) {
    data.forEach(function (datum) {
      $('#main').append('<div id="'+data.indexOf(datum)+'" class="makanOption panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div id="value" class=" bigger-font"><strong>Place: </strong>' + '<span class=datumName>' + datum.name + '</span>' + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p><p class= "type"><b>Type:</b> ' + datum.type + '<p class= "Price"><b>Price: $</b>' + datum.price + '<p class="latitude hide">' + datum.latitude + '</p><p class="longitude hide">' + datum.longitude + '</p></div></div></div>')
      console.log(datum)
      $('#historyBtn').append('<button id="' + data.indexOf(datum) + 'Btn" class="btn-small saveOption"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span><p class="datumID hide">' + datum._id + '</p></button>')
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
      $('#historyText').append(btnID + '<h3> History Saved! </h3>')
    }
  })
}
