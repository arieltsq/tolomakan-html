$(function () {
fetchHistory()
})

function fetchHistory () {
  $.ajax({
    type: 'GET',
    url: 'https://tolomakan.herokuapp.com/history/',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('User-Email', window.localStorage['email'])
      xhr.setRequestHeader('Auth-Token', window.localStorage['auth_token'])
    },
    success: function (result) {

     result.history.forEach(function (datum) {
           console.log(datum)
     $('#main').append('<p>' + datum.name + '</p>')

   })
    }
  })
}
