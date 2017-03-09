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
"use strict";
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
let updateUserAttribute = require('./updateUserAttribute');
let createAppUser = require('./createAppUser');
let getAppUserProp = require('./getAppUserProp');
let AWS = require('./aws-service');

exports.handler = function (event, context) {
  asyncFunc(function* () {
    try {
      let cognitoidentityserviceprovider = AWS.getCognitoClient();
      let params = {
        UserPoolId: event.userPoolId,
        Username: event.userName
      };
      let cognitoResponse = yield cognitoidentityserviceprovider.adminGetUser(params).promise();
      let boxAppUserId = getAppUserProp(cognitoResponse.UserAttributes);
      if (boxAppUserId !== null) {
        context.done(null, event);
      } else {
        let appUser = yield createAppUser(event.userName);
        let updated = yield updateUserAttribute(cognitoidentityserviceprovider, event.userPoolId, event.userName, appUser.id);
        context.done(null, event);
      }
    } catch (e) {
      context.done(e);
    }
  })();
}

