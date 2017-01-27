var getSubProp = require('./getSubProp');
module.exports = function (cognitoidentityserviceprovider, params) {
  return cognitoidentityserviceprovider.adminGetUser(params).promise()
    .then(function (cognitoResponse) {
      var sub = getSubProp(cognitoResponse.UserAttributes);
      return sub;
    });
}