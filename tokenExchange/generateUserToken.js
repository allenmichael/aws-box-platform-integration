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
module.exports = function (appUserId) {
  return new Promise(function (resolve, reject) {
    BoxSdk.getAppUserTokens(appUserId, (err, userToken) => {
      if (err) {
        throw err;
      }
      resolve(userToken);
    });
  });
}