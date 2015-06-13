var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('user', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    name: 'string',
    updatedAt: 'datetime',
    createdAt: 'datetime'
  }, function(){
    db.addIndex('user', 'user_name_index', 'name', callback)
  });
};

exports.down = function(db, callback) {
  db.dropTable('user', callback);
};
