/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'plantlife');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('users', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true
  // },
  name: Sequelize.STRING,
}, { timestamps: false });

var Message = db.define('messages', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true
  // },
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
}, { timestamps: false });

Message.belongsTo(User, {foreignKey: 'user_id'});

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
User.sync()
  .then(function() {
    // Now instantiate an object and save it:
    return User.create({name: 'Jean Valjean'});
  })
  .then(function() {
    // Retrieve objects from the database:
    return User.findAll({ where: {name: 'Jean Valjean'} });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.name + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });
