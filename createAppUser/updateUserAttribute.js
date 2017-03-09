'use strict'
module.exports = function (cognitoidentityserviceprovider, userPoolId, userName, appUserId) {
    let params = {
        UserAttributes: [{
            Name: process.env.COGNITO_USER_ATTRIBUTE_BOX_APPUSER_ID_KEY,
            Value: appUserId
        }],
        UserPoolId: userPoolId,
        Username: userName
    };
    console.log("Updating user attributes...");
    console.log(process.env.COGNITO_USER_ATTRIBUTE_BOX_APPUSER_ID_KEY);
    return cognitoidentityserviceprovider.adminUpdateUserAttributes(params).promise();
}