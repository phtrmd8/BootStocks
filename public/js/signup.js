$(document).ready(function () {
  const token = localStorage.getItem(token);


  function createUser(userData) {
    $.post('/users', userData)
      .done(function (data) {
        console.log(data)
        localStorage.setItem("token", data.token);
      })
      .fail(function (err) {
        console.log(err)
      })
  };
});