// first we need to require the sequelize package
// var Sequelize = require('sequelize');

//============================
var mysql = require ('mysql');

if (process.env.JAWSDB_URL) {

	connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
	connection = mysql.createConnection({
		host: 'localhost',
		username: 'root',
    password: 'Impetus2Chaos#',
    database: 'burgers_db',
	});
};

connection.connect();
module.exports = connection;
//============================

// then set the env variable which will be either
// production or development based on the existence
// of the JawsDB environment variable
// var env;
// if (process.env.JAWSDB_URL)
//     env = "production";
// else {
//     env = 'development';
// }

// // we're going to define our config for the sql server based
// // on feeding the env variable to the config file
// var config = require('./config')[env];

// // now we will set up our connection variable (sequelize) based
// // on whether use_env_variable exists in our config
// var sequelize;
// if (config.use_env_variable) {
// 	// jawsDB production option
// 	sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
// 	// local mysqlDB development option
// 	sequelize = new Sequelize(config.database, config.username, config.password, {
// 		host: config.host,
// 		dialect: config.dialect
// 	});
// }

// // finally export the connection to the model
// module.exports = sequelize;