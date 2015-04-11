'use strict';
var stringify = require('stringify')
  ;

module.exports = function(options = {}) {
  return function() {
    this.options.extensions = ['.txt'].concat(this.options.extensions || []);
    this.bundler.transform(stringify(this.options.exports));
  };
};
