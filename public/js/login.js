$(document).ready(function () {
  const token = localStorage.getItem('token');

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