/* global $  */
$(function () {
  $('#tolo').click(function () {
    fetchMakan()
  })
})

function fetchMakan () {
  $.get('https://tolomakan.herokuapp.com/makans')
  .done(function (data) {
    data.forEach(function (datum) {
      $('#main').append('<ul><li>' + datum.name + '- <i> ' + datum.categories + '</i></li></ul>')
    })
    // console.log(data)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log(errorThrown)
  })
}
