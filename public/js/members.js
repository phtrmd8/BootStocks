$(document).ready(function(){

    (async function(){
        await $.getScript("js/utils/isPrivate.js");
      })();

    function getDaysOfMonth(days) {
      date = moment(); // use a clone
      const dateArr = [];
      while (days > 0) {
        date = date.subtract(1, 'days');
        
        // decrease "days" only if it's a weekday.
        if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
          days -= 1;
          console.log(moment(date).format('YYYY-M-D'));
          dateArr.push(moment(date).format('YYYY-M-D'));
        }
      }
      return dateArr;
    }

    console.log(getDaysOfMonth(30));

  const stockChart = $('#stockChart');
  const myChart = new Chart(stockChart, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Weekly Stock',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(192, 227, 2351)'
            ],
            borderColor: [
                'rgba(29, 191, 83)',
            ],
            pointStyle : 'line',
            tension : 0.1,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });

});