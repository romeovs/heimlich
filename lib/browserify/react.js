'use strict';
var reactify = require('babelify')
  ;

module.exports = function() {
  return function() {
    this.options.extensions = ['.jsx'].concat(this.options.extensions || []);
    this.bundler.transform(reactify);
  };
};
