'use strict';
var babelify   = require('babelify')
  , browserify = require('./index');

module.exports = function (entrypoints, options = {}) {
  return browserify(entrypoints, Object.assign(options, {
    extensions : ['.jsx'].concat(options.extensions || [])
  }))
    .configure(bundler => bundler.transform({ global: true }, babelify));
};
