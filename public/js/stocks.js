$(document).ready(function() {
  (async function() {
    try {
      await $.getScript("/js/utils/isPrivate.js");
    } catch (error) {
      console.log(error);
    }
  })();

  function stateAlert(msg) {
    $("#alert").show();
    $("#alert > .msg").html(msg);
    setTimeout(() => {
      $("#alert").hide();
    }, 1000);
  }

  const disableSubBtn = () => {
    $("#submit-stock-btn")
      .addClass("disabled")
      .attr({ "aria-disabled": true, disabled: "disabled" });
    $("#spinner-submit").show();
  };

  const unDisableSubBtn = () => {
    $("#submit-stock-btn")
      .removeClass("disabled")
      .removeAttr("aria-disabled disabled");
    $("#spinner-submit").hide();
  };

  $("#search-ticker-btn").on("click", function(e) {
    const stockSymbol = $("#stock-symbol")
      .val()
      .trim();
    disableSubBtn();
    $.get(
      `https://cors-anywhere.herokuapp.com/https://api.tiingo.com/tiingo/utilities/search/${stockSymbol}?token=32eb05433ffa0f75d6c5b3ba881d7b14f1c2a5f5`
    )
      .then(function(data) {
        if (data.length > 0) {
          let multiSelect = "";
          data.forEach(d => {
            return (multiSelect += `<option value='${d.ticker}'>${d.ticker} | ${d.name}</option>`);
          });
          // console.log(multiSelect)
          $(".stockSelectDiv").show();
          $("#multipleStockSelect").html(multiSelect);
        } else {
          stateAlert("Invalid Ticker!");
        }
        unDisableSubBtn();
      })
      .catch(function(err) {
        stateAlert("Invalid Ticker!");
        unDisableSubBtn();
      });
  });

  async function initSelect() {
    try {
      const categories = await $.get("/api/categories");
      let categoryHtml = "";
      categories.forEach(d => {
        return (categoryHtml += `<option value='${d.name}'>${d.name}</option>`);
      });
      $("#category-select").html(categoryHtml);
      $("#category-select").editableSelect();
    } catch (error) {
      console.log(error);
    }
  }
  initSelect();

  $("#multipleStockSelect").on("change", async function(e) {
    const symbol = $(this)
      .children("option:selected")
      .val();

    try {
      disableSubBtn();
      const stockData = await $.get(
        `https://cors-anywhere.herokuapp.com/https://api.tiingo.com/tiingo/daily/${symbol}/prices?token=32eb05433ffa0f75d6c5b3ba881d7b14f1c2a5f5`
      );
      unDisableSubBtn();
      // console.log(stockData);
      $("#stock-ticker").val(symbol);
      $("#buying-price").val(stockData[0].adjClose);
      updateTotal();
    } catch (error) {
      stateAlert("Server Error");
      unDisableSubBtn();
    }
  });

  async function addStock(newStock) {
    try {
      const stockData = await $.post("/api/stocks", newStock);
      // console.log(stockData);
      window.location.replace("/members");
    } catch (error) {
      // console.log(error);
      stateAlert("Invalid Transaction!");
    }
  }

  $(".add-stock-form").on("submit", function(e) {
    e.preventDefault();
    const stockTicker = $("#stock-ticker").val();
    const buyingPrice = $("#buying-price").val();
    const category = $("#category-select").val();
    const quantity = $("#quantity").val();
    if (stockTicker && buyingPrice && category && quantity && quantity > 0) {
      const newStock = {
        stockTicker,
        buyingPrice,
        category,
        quantity
      };
      addStock(newStock);
    } else {
      stateAlert("All fields are required!");
    }
  });

  function updateTotal() {
    const quantity = $("#quantity")
      .val()
      .trim();
    const buyingPrice = $("#buying-price")
      .val()
      .trim();
    const total = $("#total");
    // console.log(`${quantity} : ${buyingPrice}`);
    if (quantity && buyingPrice) {
      const totalPrice = parseFloat(buyingPrice) * parseInt(quantity);
      total.val(addCommasToInt(parseFloat(totalPrice)));
    }
  }
  // $(".add-stock-form").on("trigger", "#buying-price", updateTotal);
  $(".add-stock-form").on("keyup", "#quantity", updateTotal);
});
