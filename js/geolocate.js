/* global $ */
function geolocationAjax () {
  // var queryLatLng = pos.lat + '&' + pos.lng
  console.log(pos)
  $.ajax({
    url: 'http://localhost:3000/randomFive',
    data: {
      lat: pos.lat,
      lng: pos.lng
    },
    success: function (result) {
      $.each(result, function (index, item) {
        console.log(item)
      })
    }

  }).fail(function (jqXHR, textStatus, errorThrown){
      console.log('Error',errorThrown)
    });
}
