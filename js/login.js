/* global $ */
var serverURL = 'https://tolomakan.herokuapp.com/'

$(function () {
  // listen for the form login
  $('#myForm').on('submit', function (event) {
    event.preventDefault()
    var formData = $(this).serialize()
    signin(formData)
  })
})

function signin (formData) {
  $.ajax({
    type: 'POST',
    url: serverURL + 'signin',
    data: formData,
    success: function (response) {

      // success save the repsonse
      window.localStorage.setItem('name', response.name)
      window.localStorage.setItem('email', response.email)
      window.localStorage.setItem('auth_token', response.auth_token)
      // window.localStorage.email = response.email
      // window.localStorage.auth_token = response.auth_token
      // then redirect
      window.location.href = 'index.html'
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else output error
      console.log(xhr.status)
      console.log(thrownError)
      window.alert('Login Failed, Please Try Again!')
    }
  })
}
