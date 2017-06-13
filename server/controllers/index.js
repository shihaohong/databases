var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('IM GETTING IN THE CONTROLLER!');
      res.end(models.messages.get());
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('IM POSTING IN THE CONTROLLER!');
      res.end(models.messages.post({ username: 'jennifer', roomname: 'lobby', message: 'i am a butt' }));
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

