/* global $  */
$(function () {
  $('#myForm').on('edit', function (event) {
    event.preventDefault()
    var formData = $(this).serialize()
    editUser(formData)
  })
})

function editUser (formData) {
  $.ajax({
    type: 'PUT',
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
