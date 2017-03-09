'use strict';
const _ = require('lodash');
module.exports = function (attributes) {
    console.log("Searching for Box Id...");
    console.log(process.env.COGNITO_USER_ATTRIBUTE_BOX_APPUSER_ID_KEY);
    var appUserId = _.find(attributes, function (attr) {
        return attr.Name === process.env.COGNITO_USER_ATTRIBUTE_BOX_APPUSER_ID_KEY;
    });
    return (appUserId && appUserId.Value) ? appUserId.Value : null;
}
