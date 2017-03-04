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
var AWS = require('./aws-service');
var getSubProp = require('./getSubProp');
var checkDb = require('./checkDb');
var generateUserToken = require('./generateUserToken');
exports.handler = function (event, context, callback) {
  try {
    var token = JSON.parse(event.body).token;

    if (!token) {
      callback(null, { body: JSON.stringify({ "message": "No token found.", statusCode: '401' }) });
    }
    
    var cognitoidentityserviceprovider = AWS.getCognitoClient();
    var dynamodb = AWS.getDynamoClient();
    var foundSub;
    var params = {
      AccessToken: token
    };
    cognitoidentityserviceprovider.getUser(params).promise()
      .then(function (cognitoResponse) {
        var sub = getSubProp(cognitoResponse.UserAttributes);
        if (!sub) throw new Error("Error retrieving user information...");
        return checkDb(dynamodb, sub);
      })
      .then(function (boxAppUserId) {
        return generateUserToken(boxAppUserId, callback);
      })
      .then(function (token) {
        callback(null, { statusCode: "200", body: JSON.stringify(token) });
      })
      .catch(function (err) {
        callback(null, { body: JSON.stringify({ "error": err.message }), statusCode: err.statusCode || "500" });
      });
  } catch (e) {
    callback(null, { body: JSON.stringify({ "error": e.message }), statusCode: "500" });
  }
}