var mysql = require('mysql');
var Sequelize = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// dbConnection = mysql.createConnection({
//   user: 'root',
//   password: 'plantlife',
//   database: 'chat'
// });

// module.exports = dbConnection;


// initialize db, user table and message table
var db = new Sequelize('chat', 'root', 'plantlife');

var User = db.define('users', {
  name: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

var Message = db.define('messages', {
  message: Sequelize.STRING,
  roomname: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

Message.belongsTo(User, {foreignKey: 'user_id'});

module.exports.db = db;
module.exports.User = User;
module.exports.Message = Message;