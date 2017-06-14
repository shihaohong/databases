var db = require('../db');
var Sequelize = require('sequelize');

module.exports = {
  messages: {
    get: function (res) {
      // db.connect();
      // db.query('SELECT * FROM messages', function(err, result, fields) {
      //   // db.end();
      //   if (err) { 
      //     console.error(err);
      //   } else {
      //     res.end(JSON.stringify(result));          
      //   } 
      // });  

      // SEQUELIZED VERSION
      db.Message.findAll().then(messages => {
        res.end(JSON.stringify(messages));
      }).catch(function(err) {
        res.end(err);
      });

    }, // a function which produces all the messages

    post: function (message, res) {
      // db.connect();
      // var postFunc = function(userId) {
      //   var queryString = `INSERT INTO messages (user_id, message, roomname) VALUES (${userId}, ?, '${message.roomname}')`;
      //   db.query(queryString, [message.message], function(err, results, fields) {
      //     // db.end();
      //     if (err) { console.error(err); } 
      //     res.end();
      //   });
      // };

      // var queryUsername = 'SELECT id FROM users WHERE name=\'' + message.username + '\'';
      // db.query(queryUsername, function(err, foundUser, fields) {
      //   if (foundUser.length === 0) { // user does not yet exist, so create user
      //     var queryUser = 'INSERT INTO users (name) VALUES (\'' + message.username + '\')'; 
      //     db.query(queryUser, function(err, setUser, fields) {
      //       postFunc(setUser.insertId, res);
      //     });
      //   } else {
      //     postFunc(foundUser[0].id, res);
      //   }
      // });

      // SEQUELIZED VERSION
      // first, insert into the username table
      db.User.sync()
        .then(function() {
          return db.User.findOrCreate({ where: { name: message.username } });
        }).catch(err => {
          console.error('error updating users', err);
          res.end();
        }).spread((user) => {
          return db.Message.create({
            'user_id': user.get('id'),
            message: message.message,
            roomname: message.roomname
          });
        }).then((message) => {
          console.log(message, 'message');
          res.end();
        }).catch(function(err) {
          console.error('error updating messages', err);
          res.end();
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (res) {
      // db.query('SELECT * FROM users', function(err, result, fields) {
      //   // db.end();
      //   if (err) { 
      //     console.error(err);
      //   } else {
      //     res.end(JSON.stringify(result));          
      //   } 
      // });

      //SEQUELIZED VERSION
      db.User.findAll().then(users => {
        res.end(JSON.stringify(users));
      }).catch(err => {
        console.error(err);
        res.end(err);
      });

    },
    post: function (user, res) {
    //   var queryUsername = 'SELECT id FROM users WHERE name=\'' + user.username + '\'';
    //   var queryUser = 'INSERT INTO users (name) VALUES (\'' + user.username + '\')'; 

    //   db.query(queryUsername, function(err, foundUser, fields) {
    //     if (foundUser.length === 0) { // user does not yet exist, so create user
    //       db.query(queryUser, function(err, setUser, fields) {
    //         if (err) { console.error(err); }
    //         res.end();
    //       });
    //     } else {
    //       res.end();
    //     }
    //   });

    // SEQUELIZED VERSION
      db.User.sync()
        .then(function() {
          return db.User.findOrCreate({ where: { name: user.username }});
        }).spread(function(user) {
          res.end();
        }).catch(function(err) {
          console.error(err);
          res.end(err);
        });
    }
  }
};

