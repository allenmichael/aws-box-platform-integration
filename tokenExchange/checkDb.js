'use strict';
var getDbParams = require('./getDbParams');
module.exports = function (dynamodb, sub) {
  var params = getDbParams(sub, process.env.COGNITO_USER_POOL_ID);
  return dynamodb.getItem(params).promise()
    .then(function (dbResponse) {
      return (
        dbResponse && 
        dbResponse.Item && 
        dbResponse.Item[process.env.DYNAMO_TABLE_NAME] && 
        dbResponse.Item[process.env.DYNAMO_TABLE_NAME].S) ? dbResponse.Item[process.env.DYNAMO_TABLE_NAME].S : null;
    });
}