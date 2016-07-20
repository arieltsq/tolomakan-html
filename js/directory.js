/* global $  */
$(function () {
  $('.dropdown-Categories').on('click', 'li', function (event) {
    var categories = $(this).text()
    console.log(categories)
    getCategories(categories)
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
      // $('#main').append('<div class="col-xs-6 col-md-3"> <div class="thumbnail color">' + datum.name + '-' + datum.categories + '</div></div>').css('height', '300px')
      $('#main').append('<div class="panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div class=" bigger-font"><strong>Place: </strong>' + datum.name + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p></div></div></div>')
    })
    // console.log(data)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}
