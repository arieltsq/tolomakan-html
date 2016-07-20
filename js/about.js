/* global $  */

// function display () {
//   console.log('hello im called')
// $('#name').append('Hello ' + currentUser.name)
// }
$(function () {
  if (window.localStorage.getItem('email') || window.localStorage['auth_token']) {
    $('#name').append('[ ' + window.localStorage.getItem('name') + ' ]' + ' <span class="caret"></span>').css('color', 'black')
  }
})

function display () {
  console.log("display function working")
  $('#login_link').hide()
  $('#user_link').hide()
  $('#logout').show()
  console.log('Hello ' + window.localStorage['email'])
  $('#logout').click(function (event) {
    console.log('clicked')
    event.preventDefault()
    $('#login_link').show()
    $('#user_link').show()
    $('#logout').hide()
    window.localStorage.removeItem('name')
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('auth_token')
    window.location.href = 'index.html'
  })
}
