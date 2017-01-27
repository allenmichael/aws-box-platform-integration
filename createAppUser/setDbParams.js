var db = require('./config').Dynamo;
module.exports = function (sub, userPoolId, appUserId, name) {
  var params = {};
  params.Item = {};
  params.Item[db.partitionKey] = {};
  params.Item[db.partitionKey].S = sub;
  params.Item[db.sortKey] = {};
  params.Item[db.sortKey].S = userPoolId;
  params.Item[db.appUserKey] = {};
  params.Item[db.appUserKey].S = appUserId;
  params.Item[db.userNameKey] = {};
  params.Item[db.userNameKey].S = name;
  params.TableName = db.tableName;
  return params;
}