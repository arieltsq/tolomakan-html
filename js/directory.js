/* global $  */
$(function () {
  $('.dropdown-Categories').on('click', 'li', function (event) {
    var categories = $(this).text()
    console.log(categories)
    getCategories(categories)
  })
  $('.dropdown-Price').on('click', 'li', function (event) {
    var price = $(this).text()
    console.log(price)
    getPrice(price)
  })
})

function getCategories (categories) {
  $('#main').empty()
  $('#indexText').empty()
  $('#indexText').append('<h4> Here are the Categories inside: ' + categories + '</h4>')
  $.get('https://tolomakan.herokuapp.com/random/' + categories)
  .done(function (data) {
    console.log(data.makan)
    data.makan.forEach(function (datum) {
      $('#main').append('<div class="panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div class=" bigger-font"><strong>Place: </strong>' + datum.name + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p></div></div></div>')
    })
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}

function getPrice (price) {
  $('#main').empty()
  $('#indexText').empty()
  $('#indexText').append('<h4> Here are the Makan Places inside: ' + price + '</h4>')
  $.get('https://tolomakan.herokuapp.com/price/' + price)
  .done(function (data) {
    console.log(data.makan)
    data.makan.forEach(function (datum) {
      $('#main').append('<div class="panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div class=" bigger-font"><strong>Place: </strong>' + datum.name + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p></div></div></div>')
    })
    // console.log(data)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}
