var express = require("express");
var router = express.Router();
var db = require("../models");


// Main page route, show all burgers
router.get("/", function(req, res) {

    // burger.all is from burger.js model (function that links to orm.all, which then connects to the database and "SELECT * FROM burgers")
    db.Burger.findAll().then(function(results) {
        console.log(" - - - - ");
        console.log(results);
        console.log(" - - - - ");
        
        var resultObj = {};
        for (var i = 0; i < results.length; i++) {
            resultObj[results[i].id] = results[i].name;
        }
        console.log(resultObj);

        res.render("index", {Burger: results })
        // res.json(results);
        // res.render("index", resultObj);
    })
});

// POST route to create a burger (get data: newBurger where newBurger = { name: "$("#burg").val().trim()" })
router.post("/api/burgers", function(req, res) {

    // console.log(req.body.name);
    // console.log(req.body.burger);

    db.Burger.create({
        name: req.body.name
    }).then(function(results) {
        console.log(results);
        res.json(results);
    })

});

// PUT route to update the burger's devoured state via id param where newDevouredState = { devoured: $(this).data("newdevoured") }
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("Condition", condition);

    db.Burger.update({
        devoured: true
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(results) {
        res.json(results);
    });
});

///////////////////////////////////////
///// DELETE route is not active /////

// DELETE route to remove a burger from the database via id = $(this).data("id")
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    // burger.delete is from burger.js model (function that links to orm.delete, which then connects to the database and "DELETE FROM burgers WHERE condition")
    db.Burger.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(results) {
        res.json(results);
    })

});

///////////////////////////////////////

// Export routes for the server to use (server.js)
module.exports = router;