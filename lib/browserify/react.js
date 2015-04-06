'use strict';
var babelify = require('babelify')
  ;

module.exports = function(options = {}) {
  options.experimental = options.experimental !== false;

  return function() {
    this.options.extensions = ['.jsx'].concat(this.options.extensions || []);

    this.bundler.transform(babelify.configure({
      experimental: options.experimental
    }));
  };
};
