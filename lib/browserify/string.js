'use strict';
var stringify = require('stringify')
  ;

module.exports = function(options = {}) {
  options.extensions = ['.txt'].concat(options.extensions || []);
  return function() {
    this.options.extensions = options.extensions.concat(this.options.extensions || []);
    this.bundler.transform(stringify(options.extensions));
  };
};
