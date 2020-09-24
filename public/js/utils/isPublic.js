$.get('/api/auth')
  .done(function (data) {
    window.location.replace('/members');
    console.log(data)
  }).fail(function (err) {
    // console.log(err)
  });