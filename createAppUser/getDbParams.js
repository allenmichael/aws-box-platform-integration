var db = require('./config').Dynamo;
module.exports = function (sub, userPoolId) {
  var params = {};
  params.Key = {};
  params.Key[db.partitionKey] = {};
  params.Key[db.partitionKey].S = sub;
  params.Key[db.sortKey] = {};
  params.Key[db.sortKey].S = userPoolId;
  params.TableName = db.tableName;
  return params;
}