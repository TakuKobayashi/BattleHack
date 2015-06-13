/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req,res) {
    User.findOne({id: req.param('authToken')}).exec(function(err, user){
      if(!user){
        var uuid = require('node-uuid');
        // Generate a v4 (random) id
        User.create({authToken: uuid.v4()}).exec(function(err, user){
          res.json(user);
        });
      }else{
        res.json(user);
      }
    });
  }
};

