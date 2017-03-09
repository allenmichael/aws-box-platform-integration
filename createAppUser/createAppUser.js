'use strict';
const fs = require('fs');
const path = require('path');
const Box = require('box-node-sdk');
let BoxSdk = new Box({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET,
  appAuth: {
    keyID: process.env.BOX_PUBLIC_KEY_ID,
    privateKey: (() => {
      return fs.readFileSync(path.resolve(process.env.BOX_PRIVATE_KEY_FILENAME));
    })(),
    passphrase: process.env.BOX_PRIVATE_KEY_PASSWORD
  }
});
module.exports = function (userName) {
  var requestParams = {
    body: {
      name: userName,
      is_platform_access_only: true
    }
  };
  let BoxAdminClient = BoxSdk.getAppAuthClient("enterprise", process.env.BOX_ENTERPRISE_ID);
  return new Promise(function (resolve, reject) {
    BoxAdminClient.post('/users', requestParams, BoxAdminClient.defaultResponseHandler(function (err, boxResponse) {
      if (err) { reject(err) }
      resolve(boxResponse);
    }));
  })
}