$.get("/api/auth")
  .done(function(data) {
    $("#member-name").text(data.firstname + " " + data.lastname);
    $("#account-balance").text(addCommasToInt(data.user_money));
  })
  .fail(function(err) {
    console.log(err);
    window.location.replace("/");
  });

$("#logout").on("click", function() {
  localStorage.removeItem("token");
  window.location.replace("/");
});

function addCommasToInt(num) {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

$("#dropdown-navigate").on("change", function() {
  const value = $(this).val();
  switch (value) {
    case "view-stocks":
      window.location.replace("/stocks/view");
      break;

    case "add-stocks":
      window.location.replace("/stocks/add");
      break;
    case "view-categories":
      window.location.replace("/categories/view");
      break;

    default:
      window.location.replace("/members");
      break;
  }
});
