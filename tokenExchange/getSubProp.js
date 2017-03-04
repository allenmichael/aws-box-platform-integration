'use strict';
var _ = require('lodash');
module.exports = function (attributes) {
  var sub = _.find(attributes, function (attr) {
    return attr.Name === "sub";
  });
  return (sub && sub.Value) ? sub.Value : null;
}