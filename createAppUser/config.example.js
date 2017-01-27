"use strict";
var fs = require('fs');
var path = require('path');
module.exports.BoxConfig = {
  clientId: "",
  clientSecret: "",
  enterpriseId: "",
  jwtPrivateKeyFileName: "private_key.pem",
  jwtPrivateKeyPassword: "password",
  jwtPrivateKey: () => {
    let certPath = path.resolve(this.BoxConfig.jwtPrivateKeyFileName)
    return fs.readFileSync(certPath);
  },
  jwtPublicKeyId: "",
  enterprise: "enterprise",
  user: "user"
}

module.exports.Dynamo = {
  tableName: "CognitoBoxAppUsersMap",
  partitionKey: "UserSubId",
  sortKey: "UserPoolId",
  appUserKey: "BoxAppUserId",
  userNameKey: "Username"
}