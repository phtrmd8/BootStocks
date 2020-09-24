$(document).ready(function () {
  //Appending JS Files
  $.getScript("js/utils/isPrivate.js")
    .done(function (script, textStatus) {
      console.log(textStatus);
    })
    .fail(function (jqxhr, settings, exception) {
      console.log("Triggered ajaxError handler.");
    });
  //End Here

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