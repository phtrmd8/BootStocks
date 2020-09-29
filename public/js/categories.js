$(document).ready(function() {
  /* global moment */
  (async function() {
    try {
      await $.getScript("/js/utils/isPrivate.js");
    } catch (error) {
      console.log(error);
    }
  })();

  // categoryContainer holds all categories
  var categoryContainer = $(".category-container");
  var stockCategorySelect = $("#category");
  // Click events for the edit button
  //   $(document).on("click", "button.edit", handleCategoryEdit);

  // Variable to hold our stocks
  //   var stocks;

  // The code below handles the case where users want to get all stock names under a specific category
  // Looks for a query param in the url for categories_id

  //   function getCategoryData() {
  //     // categoryId = category || "";
  //     // if (categoryId) {
  //     //   categoryId = "/?categories_id=" + categoryId;
  //     // }
  //     $.get("/api/categories", function(data) {
  //       console.log("Categories", data);
  //       categories = data;
  //       if (!categories || !categories.length) {
  //         displayEmpty(category);
  //       } else {
  //         initializeRows();
  //       }
  //     });
  //   }
  //   var url = window.location.search;
  //   var categoryId;
  //   if (url.indexOf("?categories_id=") !== -1) {
  //     categoryId = url.split("=")[1];
  //     getCategoryData(categoryId, "stocks");
  //   }
  //   // If there's no categoryId, users just get all categories as usual
  //   else {
  //     getCategoryData();
  //   }

  // This function grabs categories from the database & updates the view (add)

  // =========== (change cat_name)
  // Getting the initial list of Categories
  getCategories();

  // Function for creating a category. Calls getCategories upon completion
  function upsertCategory(categoryData) {
    $.category("/api/categories", categoryData).then(getCategories);
  }

  // Function for creating a new list row for categories
  function createCategoryRow(categoryData) {
    var newTr = $("<tr></tr>");
    // newTr.data("category", categoryData);
    newTr.append(
      "<td>" +
        categoryData.name +
        "</td><td>" +
        moment(categoryData.createdAt).format("MMM D, YYYY") +
        "</td>"
    );
    // newTr.append("");
    // if (categoryData.Stocks) {
    //   newTr.append("<td> " + categoryData.Stocks.length + "</td>");
    // } else {
    //   newTr.append("<td>0</td>");
    // }
    $(".category-tbody").append(newTr);
  }

  // Function for retrieving categories & getting them ready to be rendered to the page
  function getCategories() {
    $.get("/api/categories").then(function(data) {
      //   var rowsToAdd = "";
      for (var i = 0; i < data.length; i++) {
        // console.log(createCategoryRow(data[i]));
        createCategoryRow(data[i]);
      }
      //   console.log(rowsToAdd);
    });
    // $.get("/api/categories", function(data) {
    //   var rowsToAdd = [];
    //   for (var i = 0; i < data.length; i++) {
    //     rowsToAdd.push(createCategoryRow(data[i]));
    //   }
    //   renderCategoryList(rowsToAdd);
    //   nameInput.val("");
    // });
  }

  // Function for rendering the list of categories to the page
  function renderCategoryList(rows) {
    categoryList
      .children()
      .not(":last")
      .remove();
    categoryContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      categoryList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for figuring out which category we want to edit and takes it to the appropriate url
  //   function handleCategoryEdit() {
  //     var currentCategory = $(this)
  //       .parent()
  //       .parent()
  //       .data("category");
  //     window.location.href = "/cms?categories_id=" + currentCategory.id;
  //   }
});
