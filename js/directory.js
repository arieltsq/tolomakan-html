/* global $  */
var searchType
var searchCat
var searchPrice
$(function () {
  $('.dropdown-Categories').on('click', 'li', function (event) {
    var categories = $(this).text()
    console.log(categories)
    $('#get_categories').text(categories)
    getCategories(categories)
  })
  $('.dropdown-Price').on('click', 'li', function (event) {
    var price = $(this).text()
    console.log(price)
    $('#get_price').text(price)
    getPrice(price)
  })
  $('.dropdown-Type').on('click', 'li', function (event) {
    var type = $(this).text()
    $('#get_type').text(type)
    getType(type)
  })
  $('.search-Type').on('click', 'li', function (event) {
    searchType = $(this).text()
    $('#search_type').text(searchType)
  })
  $('.search-Categories').on('click', 'li', function (event) {
    searchCat = $(this).text()
    $('#search_categories').text(searchCat)
  })
  $('.search-Price').on('click', 'li', function (event) {
    searchPrice = $(this).text()
    $('#search_price').text(searchPrice)
  })
  $('#search').on('click', function (event) {
     console.log('hellooo')
    getSearchResults(searchType, searchCat, searchPrice)
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

function getSearchResults (searchType, searchCat, searchPrice) {
  $('#main').empty()
  $('#indexText').empty()
  $('#indexText').append('<h4> Your most mafan results of - ' + ' Type: ' + searchType + ' Categories: ' + searchCat + ' Price: $' + searchPrice + '</h4>')
  $.get('http://tolomakan.herokuapp.com/type?type=' + searchType + '&price=' + searchPrice + '&categories=' + searchCat)
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

function getType (type) {
  $('#main').empty()
  $('#indexText').empty()
  $('#indexText').append('<h4> Here are the Makan Places inside: ' + type + '</h4>')
  $.get('https://tolomakan.herokuapp.com/place/' + type)
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
