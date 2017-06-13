var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      console.log('IM IN THE MODEL');
      // db.connect();
      db.query('SELECT * FROM messages', function(err, result, fields) {
        // db.end();
        if (err) { 
          console.log(err);
        } else {
          return result;          
        } 
      });  
    }, // a function which produces all the messages
    post: function (message) {
      // db.connect();
      var postFunc = function(userId) {
        var queryString = `INSERT INTO messages (user_id, message, roomname) VALUES (${userId}, '${message.message}', '${message.roomname}')`;
        db.query(queryString, function(err, results, fields) {
          // db.end();
          if (err) { console.log(err); } 
          console.log('COMPLETE POST!');
          return results;
        });
      };

      console.log(message.username);

      var queryUsername = 'SELECT id FROM users WHERE name=\'' + message.username + '\'';
      console.log('query', queryUsername);

      db.query(queryUsername, function(err, foundUser, fields) {
        console.log('foundUser', foundUser);
        if (foundUser === undefined || foundUser.length === 0) { //user does not yet exist, so create user
          var queryUser = 'INSERT INTO users (name) VALUES (\'' + message.username + '\')'; 
          db.query(queryUser, function(err, setUser, fields) {
            //do a post to messages
            postFunc(setUser.insertId);
          });
        } else {
          postFunc(foundUser[0].id);
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

