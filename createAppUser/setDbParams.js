var db = require('./config').Dynamo;
module.exports = function (sub, userPoolId, appUserId, name) {
  var params = {};
  params.Item = {};
  params.Item[process.env.DYNAMO_PARTITION_KEY] = {};
  params.Item[process.env.DYNAMO_PARTITION_KEY].S = sub;
  params.Item[process.env.DYNAMO_SORT_KEY] = {};
  params.Item[process.env.DYNAMO_SORT_KEY].S = userPoolId;
  params.Item[process.env.DYNAMO_BOX_APP_USER_ID_KEY] = {};
  params.Item[process.env.DYNAMO_BOX_APP_USER_ID_KEY].S = appUserId;
  params.Item[process.env.DYNAMO_COGNITO_USERNAME_KEY] = {};
  params.Item[process.env.DYNAMO_COGNITO_USERNAME_KEY].S = name;
  params.TableName = process.env.DYNAMO_TABLE_NAME;
  return params;
}