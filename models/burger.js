// first require the sequelize package
var Sequelize = require('sequelize');

// then bring in our connection
var connection = require('../config/connection.js');

// set up the table variable
var Burgers = connection.define('burgers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  burger_name: {
    type: Sequelize.STRING,
    // bonus - validate that there wasn't an empty burger name field
    validate: {
      // isEmpty got deprecated!!!
      // isEmpty: false

      notEmpty: {
        msg: "Enter a burger name then click submit"
      }

      // alternative approach to isEmpty with custom validator:
      // checkForEmpty: function(burger_name) {
      //   if (burger_name === null || burger_name.match(/^ *$/) !== null) {
      //     throw new Error("No empty values please!");
      //   }
      // }
    }
  },
  devoured: {
    type: Sequelize.BOOLEAN,
    // bonus - default devoured state is false
    defaultValue: false
  }
}, {
  timestamps: false
});

// sync the table variable with the table in the DB
Burgers.sync();

// Define the all, create, and update functions and
// what they do. These will be called on by the controller
var burger = {
  all: function(cb) {
    Burgers.findAll({}).then(function(response) {
      cb(response);
    });
  },
  create: function(burger_name, cb) {
    Burgers.create({
      burger_name: burger_name
    }).then(function() {
      cb();
    }).catch(function(error) {
      // bonus - trap for there being no burger name field
      cb(error);
    });
  },
  update: function(id, cb) {
    Burgers.update({
      devoured: true
    }, {
      where: {id: id}
    }).then(function() {
      cb();
    });
  }
};

// export the burger variable with all the functions
// back to the controller
module.exports = burger;