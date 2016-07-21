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
           $('#main').append('<br><div class="makanOption panel panel-default"><div class="panel-body"><div class="media-body"><p><h4 class="media-heading"> <div id="value" class=" bigger-font"><strong>Place: </strong>' + '<span class=datumName>' + datum.name + '</span>' + '</div></h4></p>' + '<p><b>Address:</b> ' + datum.address + '</p><p class="color"><b>Categories:</b> ' + datum.categories + '</p><p class= "type"><b>Type:</b> ' + datum.type + '<p class= "Price"><b>Price: $</b>' + datum.price + '<p class="latitude hide">' + datum.latitude + '</p><p class="longitude hide">' + datum.longitude + '</p></div></div></div>')

   })
    }
  })
}
