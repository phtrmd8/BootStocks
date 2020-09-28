$(document).ready(function() {
  //https://api.tiingo.com/tiingo/daily/aapl/prices?token=32eb05433ffa0f75d6c5b3ba881d7b14f1c2a5f5&startDate=2020-8-12&endDate=2020-9-10
  (async function() {
    await $.getScript("js/utils/isPrivate.js");
  })();

  const getDaysOfMonth = days => {
    date = moment(); // use a clone
    const dateArr = [];
    while (days > 0) {
      date = date.subtract(1, "days");

      // decrease "days" only if it's a weekday.
      if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
        days -= 1;
        // console.log(moment(date).format('YYYY-M-D'));
        dateArr.push(moment(date).format("YYYY-M-D"));
      }
    }
    dateArr.unshift(moment().format("YYYY-M-D"));
    dateArr.reverse();
    return dateArr;
  };

  const buildChart = (ticker = "FB") => {
    const daysOfMonth = getDaysOfMonth(30); //Arr
    const startDate = daysOfMonth[0];
    const endDate = daysOfMonth[30];
    // ticker = 'AAPL'
    $.get(
      `https://cors-anywhere.herokuapp.com/https://api.tiingo.com/tiingo/daily/${ticker}/prices?token=32eb05433ffa0f75d6c5b3ba881d7b14f1c2a5f5&startDate=${startDate}&endDate=${endDate}`
    )
      .then(function(data) {
        const stockChart = $("#stockChart");
        const myChart = new Chart(stockChart, {
          type: "line",
          data: {
            labels: daysOfMonth,
            datasets: [
              {
                label: `Monthly ${ticker.toUpperCase()} Stock Price`,
                data: data.map(d => d.close),
                backgroundColor: ["rgba(192, 227, 2351)"],
                borderColor: ["rgba(29, 191, 83)"],
                pointStyle: "line",
                tension: 0.1,
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
        myChart.update();
      })
      .catch(function(err) {
        console.log("Invalid Ticker");
      });
  };

  $("#ticker-input").on("keypress", e => {
    if (e.which === 13) {
      const ticker = $("#ticker-input")
        .val()
        .trim();
      buildChart(ticker);
    }
  });

  buildChart();

  async function initSelect() {
    const categories = await $.get("/api/categories");
    let selectCat = "";
    categories.forEach(d => {
      return (selectCat += `<option value='${d.id}'>${d.name}</option>`);
    });
    $("#changeCategory").append(selectCat);
  }
  initSelect();

  $("#changeCategory").on("change", function() {
    const value = $(this).val();
    initTable(value);
  });

  async function initTable(category_id = 0) {
    try {
      const stocks = await $.get("/api/stocks");
      console.log(category_id);
      // console.log(stocks);
      if (stocks.length > 0) {
        let tbodyHtml = "";
        stocks.forEach(s => {
          if (parseInt(category_id) === s.Category.id) {
            tbodyHtml += `
              <tr>
                <td>${s.stock_symbol}</td>
                <td>${s.Category.name}</td>
                <td>${s.stock_quantity}</td>
                <td>$ ${s.buying_price}</td>
                <td>$ ${s.total}</td>
                <td>$ ${s.stock_gain}</td>
                <td>actions</td>
              </tr>`;
          } else if (parseInt(category_id) === 0) {
            tbodyHtml += `
              <tr>
                <td>${s.stock_symbol}</td>
                <td>${s.Category.name}</td>
                <td>${s.stock_quantity}</td>
                <td>$ ${s.buying_price}</td>
                <td>$ ${s.total}</td>
                <td>$ ${s.stock_gain}</td>
                <td>actions</td>
              </tr>`;
          }
        });
        $(".stock-tbody").html(tbodyHtml);
      } else {
        $(".stock-tbody").html("No Results to display!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  initTable();
});
