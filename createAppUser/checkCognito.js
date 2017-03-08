'use strict';
let getAppUserProp = require('./getAppUserProp');
module.exports = function (cognitoidentityserviceprovider, params) {
  return cognitoidentityserviceprovider.adminGetUser(params).promise()
    .then(function (cognitoResponse) {
      let boxAppUserId = getAppUserProp(cognitoResponse.UserAttributes);
      if (boxAppUserId === null) {
        return true;
      } else {
        return false;
      }
    });
}