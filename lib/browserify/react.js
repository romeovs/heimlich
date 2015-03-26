'use strict';
var babelify = require('babelify')
  ;

module.exports = function(options = {}) {
  options.global = !!options.global;
  options.experimental = options.experimental !== false;

  return function() {
    this.options.extensions = ['.jsx'].concat(this.options.extensions || []);
    this.bundler.transform({ global: options.global }, babelify({
      experimental: options.experimental
    }));
  };
};
