$(document).ready(function() {

  let ticker = "aapl";
  let apiKey = "32eb05433ffa0f75d6c5b3ba881d7b14f1c2a5f5"
  let queryURL = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?token=${apiKey}`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (res) {
    console.log(res);
  });

  $(".enter-stock").on("submit", function(event) {
    
    event.preventDefault();

    const newStock = {
      ticker: $("#stock-input").val().toUpperCase().trim(),
    };

    $.ajax("/api/stocks", {
      type: "POST",
      data: newStock
    }).then(function() {
        console.log(`added ${newStock.ticker} to portfolio`);
        location.reload();
    });
  });

});
