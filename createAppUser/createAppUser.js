var Box = require('box-node-sdk');
var BoxConfig = require('./config').BoxConfig;
var BoxSdk = new Box({
  clientID: BoxConfig.clientId,
  clientSecret: BoxConfig.clientSecret,
  appAuth: {
    keyID: BoxConfig.jwtPublicKeyId,
    privateKey: BoxConfig.jwtPrivateKey(),
    passphrase: BoxConfig.jwtPrivateKeyPassword
  }
});
module.exports = function (userName) {
  var requestParams = {
    body: {
      name: userName,
      is_platform_access_only: true
    }
  };
  var BoxAdminClient = BoxSdk.getAppAuthClient(BoxConfig.enterprise, BoxConfig.enterpriseId);
  return new Promise(function (resolve, reject) {
    BoxAdminClient.post('/users', requestParams, BoxAdminClient.defaultResponseHandler(function (err, boxResponse) {
      if (err) { reject(err) }
      resolve(boxResponse);
    }));
  })
}