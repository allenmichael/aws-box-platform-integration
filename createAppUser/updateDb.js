var setDbParams = require("./setDbParams");
module.exports = function (dynamodb, sub, userPoolId, appUserId, name) {
  var params = setDbParams(sub, userPoolId, appUserId, name);
  return dynamodb.putItem(params).promise();
}