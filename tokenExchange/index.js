/*
 * Copyright 2017. AMSXBG. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/
"use strict"
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
let AWS = require('./aws-service');
let getAppUserProp = require('./getAppUserProp');
let generateUserToken = require('./generateUserToken');
exports.handler = function (event, context, callback) {
  try {
    var token = JSON.parse(event.body).token;

    if (!token) {
      callback(null, { body: JSON.stringify({ "message": "No token found.", statusCode: '401' }) });
    }
    asyncFunc(function* () {
      let cognitoidentityserviceprovider = AWS.getCognitoClient();
      let params = {
        AccessToken: token
      };
      let cognitoResponse = yield cognitoidentityserviceprovider.getUser(params).promise();
      var boxAppUserId = getAppUserProp(cognitoResponse.UserAttributes);
      if (!boxAppUserId) throw new Error("Error retrieving user information...");
      let token = yield generateUserToken(boxAppUserId);
      callback(null, { statusCode: "200", body: JSON.stringify(token) });
    })();
  } catch (e) {
    callback(null, { body: JSON.stringify({ "error": e.message }), statusCode: "500" });
  }
}