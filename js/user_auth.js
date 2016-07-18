/* global $ display _*/
var serverURL = 'https://tolomakan.herokuapp.com/'
var currentUser = null

// We are assuming Local Storage is supported
$(function () {
  if (!window.localStorage.getItem('email') || !window.localStorage['auth_token']) window.location.href = 'login.html'
  else loadUser()
})

// load the user from the server. This ensures we have a logged in user
function loadUser () {
  $.ajax({
    type: 'GET',
    url: serverURL + 'users',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('User-Email', window.localStorage['email'])
      xhr.setRequestHeader('Auth-Token', window.localStorage['auth_token'])
    },
    success: function (response) {
    //  filter method
      var filtered = _.where(response, {email: window.localStorage['email']})
      filtered.forEach(function (datum) {
        currentUser = datum
        console.log(currentUser)
        // console.log("datum is: " , datum)
         display()
        // asign the current user
        // currentUser = response
        // tell the current page we are ready
      })
      // console.log(response)
      // // asign the current user
      // currentUser = response
      // // tell the current page we are ready
      // display()
    //   if (display) display()
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else error, redirect to login
      window.location.href = 'login.html'
      console.log('error in user_auth')
    }
  })
}
