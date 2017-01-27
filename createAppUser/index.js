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
var AWS = require('aws-sdk');
var _ = require('lodash');

var checkCognito = require('./checkCognito');
var checkDb = require('./checkDb');
var updateDb = require('./updateDb');
var createAppUser = require('./createAppUser');

exports.handler = function (event, context) {
  AWS.config.loadFromPath('./aws-config.json');
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  var dynamodb = new AWS.DynamoDB();
  var foundSub;
  var params = {
    UserPoolId: event.userPoolId,
    Username: event.userName
  };
  checkCognito(cognitoidentityserviceprovider, params)
    .then(function (sub) {
      foundSub = sub;
      return checkDb(dynamodb, sub, event.userPoolId);
    })
    .then(function (boxAppUserId) {
      if (!boxAppUserId) {
        return createAppUser(event.userName)
          .then(function (appUser) {
            return updateDb(dynamodb, foundSub, event.userPoolId, appUser.id, event.userName);
          });
      } else {
        return boxAppUserId;
      }
    })
    .then(function (data) {
      context.done(null, event);
    });
}
