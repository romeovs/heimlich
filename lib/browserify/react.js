'use strict';
var reactify = require('babelify')
  ;

module.exports = function(options = {}) {
  options.global = !!options.global;

  return function() {
    this.options.extensions = ['.jsx'].concat(this.options.extensions || []);
    this.bundler.transform({ global: options.global }, reactify);
  };
};
