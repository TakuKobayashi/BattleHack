var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('mstDrawingTheme', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    title: { type: 'string'},
    repeatNumber: { type: 'integer', notNull: true, defaultValue: 4 },
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('mstDrawingTheme', callback);
};
