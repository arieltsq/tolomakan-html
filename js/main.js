/* global $ display _ */

var localname
var local_auth_token
var localemail
var currentUser

$(document).ready(function () {
  if (window.localStorage.getItem('name')) {
    localname = window.localStorage.getItem('name')
    local_auth_token = window.localStorage.getItem('auth_token')
    localemail = window.localStorage.getItem('email')
    $('#result2').text(localname + ' ' + local_auth_token + ' ' + localemail)
    getUser()
  } else {
    window.location = 'login.html'
  }
  function getUser () {
    $.get('http://tolomakan.herokuapp.com/users')
    .done(function (data) {
      var filtered = _.where(data, {email: localemail})
      filtered.forEach(function (datum) {
        currentUser = datum
        console.log(currentUser)
        // console.log("datum is: " , datum)
        $('#currentUser').html('<p> The freaking user is : ' + datum.name + '</p>')
        display()
      })
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
    })
  }

  $('#myForm').on('submit', function (event) {
    event.preventDefault()
    var formData = $(this).serialize()
    console.log(formData)
    login(formData)
    // var email = $('#email').val()
  })

  function login (formData) {
    $.ajax({
      type: 'POST',
      url: 'http://tolomakan.herokuapp.com/signin',
      data: formData,
      success: function (response) {
        // Check browser support
        if (typeof (window.localStorage) !== 'undefined') {
          // Store
          window.localStorage.setItem('name', response.name)
          window.localStorage.setItem('auth_token', response.auth_token)
          window.localStorage.setItem('email', response.email)
          // // Retrieve
          // var name = window.localStorage.getItem('name')
          // var auth_token = window.localStorage.getItem('auth_token')
          //    $('#result').append(name + ' ' + auth_token)
        } else {
          $('#result').append('Sorry, your browser does not support Web Storage...')
        }
        window.location.href = 'about.html'
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status)
        console.log(thrownError)
      }
    })
  }
})
// function redirect(name) {
//
// }
