/* global $ display _*/
var serverURL = 'https://tolomakan.herokuapp.com/'
var currentUser = null

// We are assuming Local Storage is supported
$(function () {
  if (window.localStorage.getItem('email') && window.localStorage['auth_token']) {
    loadUser()
  }
})

// load the user from the server. This ensures we have a logged in user
function loadUser () {

  console.log("in user_auth")
  $.ajax({
    type: 'GET',
    url: serverURL + 'users',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('User-Email', window.localStorage['email'])
      xhr.setRequestHeader('Auth-Token', window.localStorage['auth_token'])
    },
    success: function (response) {
    //  filter method
      console.log("in user_auth - success function")
      var filtered = _.where(response, {email: window.localStorage['email']})
      if(filtered.length == 0){
        window.localStorage.removeItem('name')
        window.localStorage.removeItem('email')
        window.localStorage.removeItem('auth_token')
      }
      else {
        currentUser = filtered[0]
        display()
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else error, redirect to login
      console.log('error in user_auth')
    }
  })
}
