/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  join: function (req, res) {
    var responseJson = function(res, roomUser, theme){
      RoomUser.findOne({roomId: roomUser.room, userId: roomUser.user}).exec(function(err, prev){
        var p = prev;
        if(!prev) p = {};
        return res.json({
          id: roomUser.id,
          title: theme.title,
          answerFlag: roomUser.answerFlag,
          drawingCount: roomUser.drawingCount,
          repeatNumber: theme.repeatNumber,
          prev: {
            answerWord: p.answerWord,
            imagePath: p.imagePath,
          }
        });
      });
    };

    var createNewRoom = function(user){
      MstDrawingTheme.count().exec(function(err, c){
        var mstThemeId = Math.ceil(Math.random() * c);
        MstDrawingTheme.findOne({id: mstThemeId}).exec(function(err, theme){
          Room.create({mstDrawingThemeId: mstThemeId, drawNumber: theme.repeatNumber}).exec(function(err, room){
            RoomUser.create({userId: user.id, roomId: room.id}).exec(function(err, roomUser){
              responseJson(res, roomUser, theme);
            });
          });
        });
      });
    };

    User.findOne({authToken: req.param('authToken')}).exec(function(err, user){
      Room.findOne({finishFlag: false}).exec(function(err, room){
        //まだ終わっていなくて、最後に答える人がいないRoomがあればそこに入れる
        if(room){
          RoomUser.findOne({roomId: room.id, answeredFlag: false, userId: user.id}).exec(function(err, ru){
            if(ru){
              MstDrawingTheme.findOne({id: room.theme}).exec(function(err, theme){
                responseJson(res, ru, theme);
              });
            } else {
              if(room.drawNumber > 0){
                MstDrawingTheme.findOne({id: room.theme}).exec(function(err, theme){
                  room.drawNumber = room.drawNumber - 1;
                  room.save(function(err){ console.log(err); });
                  RoomUser.create({userId: user.id, roomId: room.id, drawingCount: theme.repeatNumber - room.drawNumber, answerFlag: room.drawNumber % 2 == 0}).exec(function(err, roomUser){
                    responseJson(res, roomUser, theme);
                  });
                });
              } else {
                createNewRoom(user);
              }
            }
          });
        } else {
          createNewRoom(user);
        }
      });
    });
  },
  answer: function (req, res) {
    RoomUser.findOne({id: req.param('roomUserId')}).exec(function(err, roomUser){
      Room.findOne({id: roomUser.room}).exec(function(err, room){
        roomUser.answeredFlag = true;
        roomUser.answerWord = req.param('answer');
        roomUser.save(function(err){ console.log(err); });
        if(room.drawNumber <= 0){
          room.finishFlag = true;
          room.save(function(err){ console.log(err); });
        }
        res.send();
        res.status(200);
      });
    });
  },
  sendDraw: function (req, res) {
    var uploadFile = req.file('uploadFile');
    console.log(uploadFile);
    uploadFile.upload(function onUploadComplete (err, files) {				
      //Files will be uploaded to .tmp/uploads
      if (err) return res.serverError(err);
        console.log(files);
      });
  }
}