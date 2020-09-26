$(document).ready(function () {
  //Appending JS Files
  
  // $.getScript("js/utils/isPublic.js")
  //   .done(function (script, textStatus) {
  //     // console.log(textStatus);
  //   })
  //   .fail(function (jqxhr, settings, exception) {
  //     console.log("Triggered ajaxError handler.");
  //   });
  //End Here
  (async function(){
    await $.getScript("js/utils/isPublic.js");
  })();

  $('.login').on('submit', function (e) {
    e.preventDefault();
    const username = $('#username').val().trim();
    const password = $('#password-input').val().trim();

    const loginData = { username: username, password: password };
    loginReq(loginData);
  });

  function stateAlert(msg){
    $('#alert').show();
    $('#alert > .msg').html(msg);
    setTimeout(() => { $("#alert").hide(); }, 1000);
  }

  function loginReq(loginData) {
    $.post('/api/auth', loginData)
      .then(function (data) {
        // console.log(data)
        localStorage.setItem("token", data.token);
        window.location.replace('/members')
      }).catch(function (err) {
       stateAlert(err.responseJSON);
        // console.log(err.responseJSON)
      });
  };


});