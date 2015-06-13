var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('roomUser', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    userId: { type: 'int', notNull: true},
    roomId: { type: 'int', notNull: true},
    drawingCount: { type: 'int', notNull: true, defaultValue: 0},
    answerFlag: { type: 'boolean', notNull: true, defaultValue: false},
    answerWord: 'string',
    drawingImagePath: 'string',
    answeredFlag: { type: 'boolean', notNull: true, defaultValue: false},
    updatedAt: 'datetime',
    createdAt: 'datetime'
  }, function(){
    db.addIndex('roomUser', 'roomUserUserId', 'userId', function(){
      db.addIndex('roomUser', 'roomUserRoomId', 'roomId', callback);
    });
  });
};

exports.down = function(db, callback) {
  db.dropTable('roomUser', callback);
};
