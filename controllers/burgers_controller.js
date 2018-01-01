// require the express package
var express = require("express");

// set up the router
var router = express.Router();

// bring in the burger model
var burger = require("../models/burger");

// set up the body parser package and use it
// as middleware on the router
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

// get route -> index which redirects to /burgers
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

// burgers route which is the defacto start page
router.get("/burgers", function(req, res) {
  // express callback response by calling burger.all - all burgers
  burger.all(function(data) {
    // Wrapping the array of returned burgers in a object so it can be referenced inside our handlebars
    // -renders the index file by passing in all the burgers
    // -as an object for handlebars to use
    var hbsObject = { burgers: data };
    res.render("index", hbsObject);
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for burger.addBurger
  burger.create(req.body.burger_name, function(error) {
    if (error) {
      console.log("Enter a burger name then hit submit");
    }
    // render back to index with handle
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/update", function(req, res) {
  burger.update(req.body.burger_id, function(result) {
    // wrapper for orm.js, using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// export the controller to the server file
module.exports = router;