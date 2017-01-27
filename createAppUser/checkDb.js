var db = require('./config').Dynamo;
var getDbParams = require('./getDbParams');
module.exports = function (dynamodb, sub, userPoolId) {
  var params = getDbParams(sub, userPoolId);
  return dynamodb.getItem(params).promise()
    .then(function (dbResponse) {
      return (dbResponse && dbResponse.Item && dbResponse.Item[db.appUserKey] && dbResponse.Item[db.appUserKey].S) ? dbResponse.Item[db.appUserKey].S : null;
    });
}