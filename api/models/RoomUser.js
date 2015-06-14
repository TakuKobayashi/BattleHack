/**
* RoomUser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  //そのままやると、PosgreのAdapterがバグっていてうまくいかないリネーム
  tableName: 'roomuser',

  attributes: {
    user:{
      model: 'user',
      columnName: 'userId'
    },
    room:{
      model: 'room',
      columnName: 'roomId'
    },
    drawingCount: 'integer',
    answerFlag: 'boolean',
    answerWord: 'string',
    drawingImage: 'text',
    answeredFlag: 'boolean',
  },
};

