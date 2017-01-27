var db = require('./config').Dynamo;
var getDbParams = require('./getDbParams');
var cognito = require('./config').Cognito;
module.exports = function (dynamodb, sub) {
  var params = getDbParams(sub, cognito.userPoolId);
  return dynamodb.getItem(params).promise()
    .then(function (dbResponse) {
      return (dbResponse && dbResponse.Item && dbResponse.Item[db.appUserKey] && dbResponse.Item[db.appUserKey].S) ? dbResponse.Item[db.appUserKey].S : null;
    });
}