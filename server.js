// set up express, bodyparser, and methodOverride packages
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// and define the express server
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// require the express handlebars package
var exphbs = require("express-handlebars");

// tell the express server to use the handlebars engine
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// bring in the controller so routing can be handled
var routes = require("./controllers/burgers_controller");

// create the routes for /, /update, and /create
app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

// listen on port 3000 locally
// or on the process.env.PORT which comes from heroku deployment
var port = process.env.PORT || 3000;
app.listen(port);