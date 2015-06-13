var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('room', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    drawNumber: { type: 'int', notNull: true, defaultValue: 0},
    mstDrawingThemeId: { type: 'int', notNull: true},
    name: 'string',
    updatedAt: 'datetime',
    createdAt: 'datetime'
  },function(){
    db.addIndex('room', 'drawing_theme_id_index', 'mstDrawingThemeId', callback)
  });
};

exports.down = function(db, callback) {
  db.dropTable('room', callback);
};
