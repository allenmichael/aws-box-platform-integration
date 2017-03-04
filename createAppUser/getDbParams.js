'use strict';
module.exports = function (sub, userPoolId) {
  var params = {};
  params.Key = {};
  params.Key[process.env.DYNAMO_PARTITION_KEY] = {};
  params.Key[process.env.DYNAMO_PARTITION_KEY].S = sub;
  params.Key[process.env.DYNAMO_SORT_KEY] = {};
  params.Key[process.env.DYNAMO_SORT_KEY].S = userPoolId;
  params.TableName = process.env.DYNAMO_TABLE_NAME;
  return params;
}