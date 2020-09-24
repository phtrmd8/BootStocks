$(document).ready(function () {
  //Appending JS Files
  (async function(){
    await $.getScript("js/utils/isPublic.js");
  })();

  $('.signup').on('submit', function (e) {
    e.preventDefault();
    const firstname = $('#firstname').val().trim();
    const lastname = $('#lastname').val().trim();
    const username = $('#username').val().trim();
    const email = $('#email-input').val().trim();
    const password = $('#password-input').val().trim();
    const cpassword = $('#cpassword-input').val().trim();

    const userData = { firstname: firstname, lastname: lastname, username : username, email: email, password : password ,cpassword : cpassword };
    createUser(userData);
  });

  function stateAlert(msg){
    $('#alert').show();
    $('#alert > .msg').html(msg);
    setTimeout(() => { $("#alert").hide(); }, 1000);
  }

  function createUser(userData) {
    $.post('/api/users', userData)
      .done(function (data) {
        // console.log(data)
        localStorage.setItem("token", data.token);
        window.location.replace('/members');
      })
      .fail(function (err) {
        stateAlert(err.responseJSON);
      })
  };
});