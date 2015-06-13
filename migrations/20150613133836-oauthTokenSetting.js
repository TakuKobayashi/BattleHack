var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('oauthTokenSetting', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    userId: { type: 'int', notNull: true},
    type: { type: 'string', notNull: true },
    uid: { type: 'string' },
    token: { type: 'string', notNull: true },
    tokenSecret: { type: 'string' },
    expiredAt: { type: 'datetime' },
  }, function(){
    db.addIndex('oauthTokenSetting', 'oauth_token_setting_user_id_index', 'userId', function(){
      db.addIndex('oauthTokenSetting', 'oauth_token', 'type', callback)
    })
  });
};

exports.down = function(db, callback) {
  db.dropTable('oauthTokenSetting', callback);
};
