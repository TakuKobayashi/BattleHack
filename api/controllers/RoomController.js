/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  join: function (req, res) {
    User.findOne({authToken: req.param('authToken')}).exec(function(err, user){
      MstDrawingTheme.count().exec(function(err, c){
        var mstThemeId = Math.ceil(Math.random() * c);
        MstDrawingTheme.findOne({id: mstThemeId}).exec(function(err, theme){
          Room.create({mstDrawingThemeId: mstThemeId, drawNumber: theme.repeatNumber}).exec(function(err, room){
            RoomUser.create({userId: user.id, roomId: room.id}).exec(function(err, roomUser){
              res.json(roomUser);
            });
          });
        });
      });
    });
  }
};

