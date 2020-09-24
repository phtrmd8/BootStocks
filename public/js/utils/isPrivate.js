$.get('/api/auth')
  .done(function (data) {
    console.log(data)
  }).fail(function (err) {
    window.location.replace('/');
  });