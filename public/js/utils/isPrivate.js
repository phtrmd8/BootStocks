$.get('/api/auth')
  .done(function (data) {
    $('#member-name').text(data.firstname + ' ' +data.lastname);
  }).fail(function (err) {
    console.log(err)
    window.location.replace('/');
  });

$('#logout').on('click',function(){
  localStorage.removeItem('token');
  window.location.replace('/');
});