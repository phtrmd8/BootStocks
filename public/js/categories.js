$(document).ready(function () {
    (async function () {
        try {
            await $.getScript("/js/utils/isPrivate.js");
        } catch (error) {
            console.log(error);
        }
    })();
    // categoryContainer holds all categories
    var categoryContainer = $(".category-container");
    var stockCategorySelect = $("#category");

    // Getting the initial list of Categories
    getCategories();

    // Function for creating a category. Calls getCategories upon completion
    function upsertCategory(categoryData) {
        $.category("/api/categories", categoryData).then(getCategories);
    }

    // Function for creating a new list row for categories
    // function createCategoryRow(categoryData) {
    //     var newTr = $("<tr>");
    //     newTr.data("category", categoryData);
    //     newTr.append("<td>" + categoryData.name + "</td>");
    //     newTr.append(
    //         "<td>" + moment(categoryData.createdAt).format("MMM D, YYYY") + "</td>"
    //     );
    //     return newTr;
    // }

    // Function for retrieving categories & getting them ready to be rendered to the page
    function getCategories() {
        $.get("/api/categories").then(function (data) {
            var rowsToAdd = "";
            for (var i = 0; i < data.length; i++) {
                rowsToAdd += createCategoryRow(data[i]);
            }
            // renderCategoryList(rowsToAdd);
            $(".category-tbody").html(rowsToAdd)
        });
    }

    // FOR EDITTING
    // Function for rendering the list of categories to the page
    // function renderCategoryList(rows) {
    //     categoryList
    //         .children()
    //         .not(":last")
    //         .remove();
    //     categoryContainer.children(".alert").remove();
    //     if (rows.length) {
    //         console.log(rows);
    //         categoryList.prepend(rows);
    //     } else {
    //         renderEmpty();
    //     }
    // }

    async function initTable(category_id = 0) {
        try {
            const categories = await $.get("/api/categories");
            if (categories.length > 0) {
                let tbodyHtml = "";
                categories.forEach(s => {
                    if (parseInt(category_id) === s.Category.id) {
                        tbodyHtml += `
              <tr id='tr-category-${s.id}'>
                <td>${s.Category.name}</td>
                <td>${moment(s.createdAt).format("MMM D, YYYY")}</td>`;
                    } else if (parseInt(category_id) === 0) {
                        tbodyHtml += `
              <tr id='tr-category-${s.id}'>
                <td>${s.Category.name}</td>
                <td>${moment(s.createdAt).format("MMM D, YYYY")}</td>`;
                    }
                });
                if (tbodyHtml) {
                    $(".category-tbody").html(tbodyHtml);
                    $("#span-result").empty();
                } else {
                    $(".category-tbody").empty();
                    $("#span-result").html("No Results to display!");
                }
                $("#category-table-display").show();
            } else {
                $("#category-table-display").hide();
                $("#span-result").html("No Results to display!");
            }
        } catch (error) {
            console.log(error);
        }
    }

});