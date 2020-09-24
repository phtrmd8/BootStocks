$(document).ready(function () {
  //Appending JS Files
  $.getScript("js/utils/isPublic.js")
    .done(function (script, textStatus) {
      console.log(textStatus);
    })
    .fail(function (jqxhr, settings, exception) {
      console.log("Triggered ajaxError handler.");
    });
  //End Here

  $('.login').on('submit', function (e) {
    e.preventDefault();
    const username = $('#username').val().trim();
    const password = $('#password-input').val().trim();

    const loginData = { username: username, password: password };
    loginReq(loginData)
  })

  function loginReq(loginData) {
    $.post('/api/auth', loginData)
      .done(function (data) {
        console.log(data)
        localStorage.setItem("token", data.token);
      }).fail(function (err) {
        console.log(err)
      });
  };


});