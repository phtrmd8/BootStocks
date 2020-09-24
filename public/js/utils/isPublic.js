$.get('/api/auth')
  .done(function (data) {
    window.location.replace('/signup');
  }).fail(function (err) {
    console.log('Public')
  });