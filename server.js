//////////////////////////////////////////////////

// Dependencies //
var express = require("express");
var exphbs = require("express-handlebars");
var routes = require("./controllers/burgers_controller.js");
var db = require("./models");

// Set up and configure //
var app = express();
var PORT = process.env.PORT || 3000;


// Middleware configuration //
// Serve static content for the app (images, css)
app.use(express.static("public"));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Give server access to routes
app.use(routes);

// Connect to our db and server
db.sequelize.sync({force:true}).then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT);
    });
});

//////////////////////////////////////////////////