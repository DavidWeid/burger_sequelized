$(function() {

    // $("#clickMe").on("click", function() {
    //     $("#enter-container").css("opacity", "0");
    //     $("#index-container").css("opacity", "1");
    //     $("body").css("background-color", "white");
    // })

    // User clicks button to devour a burger (change devoured from false to true)
    $(".change-devoured").on("click", function(e) {

        console.log("Devour Me clicked");

        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");

        var newDevouredState = {
            devoured: newDevoured
        };

        // Send PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function() {
            console.log("Changed devoured stat to", newDevoured);

            location.reload();
        });
    });

    // User enters new burger and clicks submit (add new burger to db)
    $("#createburger").on("submit", function(e) {
        e.preventDefault();

        // var newBurger = {
        //     name: $("#burg").val().trim()
        // };

        var name = {
            name: $("#burg").val().trim()
        };

        // var newBurgerNameLC = newBurger.name.toLowerCase();

        var nameLC = name.name.toLowerCase();

        if (nameLC === "") {
            return;
        } else if (nameLC.includes("burger") === false) {
            return;
        } else {

            console.log(name);

            $.ajax("/api/burgers", {
                type: "POST",
                data: name
            }).then(function(res) {
                console.log("Created new burger");
                console.log(res);
                location.reload();
            });

        }
    });

    ///////////////////////////////////////
    ///// DELETE function not active /////

    // To implement, need to add a button with attributes "id=deletebtn" and a "data-id='{{id}}'"

    // User deletes a burger
    $("#deletebtn").on("click", function(e) {
        var id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(function() {
            console.log("Burger deleted", id);

            location.reload();
        });
    });

    ///////////////////////////////////////
});