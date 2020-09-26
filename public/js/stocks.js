$(document).ready(function() {

  // let ticker = "aapl";
  // let apiKey = "32eb05433ffa0f75d6c5b3ba881d7b14f1c2a5f5"
  // let queryURL = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?token=${apiKey}`;

  // $.ajax({
  //   url: queryURL,
  //   method: "GET"
  // }).then(function (res) {
  //   console.log(res);
  // });

  // $(".enter-stock").on("submit", function(event) {
    
  //   event.preventDefault();

  //   const newStock = {
  //     ticker: $("#stock-input").val().toUpperCase().trim(),
  //   };

  //   $.ajax("/api/stocks", {
  //     type: "POST",
  //     data: newStock
  //   }).then(function() {
  //       console.log(`added ${newStock.ticker} to portfolio`);
  //       location.reload();
  //   });
  // });


  $("#search-ticker-btn").on('click',function(e){
   const stockSymbol =  $('#stock-symbol').val().trim();
   $.get(`https://cors-anywhere.herokuapp.com/https://api.tiingo.com/tiingo/utilities/search/${stockSymbol}?token=32eb05433ffa0f75d6c5b3ba881d7b14f1c2a5f5`)
   .then(function(data){
     let multiSelect = ''
     data.forEach(d =>{ return multiSelect += `<option value='${d.ticker}'>${d.ticker} | ${d.name}</option>`});
      // console.log(multiSelect)
    //  $('.stockSelectDiv').show()
    $('#multipleStockSelect').html(multiSelect);
   }).catch(function(err){
    console.log('Invalid Ticker');
   });
  });

  $('#multipleStockSelect').on('change', function(e){
    const symbol =  $(this).children("option:selected").val();
    $('#stock-ticker').val(symbol)
  });

});
