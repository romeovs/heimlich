'use strict';
var reactify   = require('reactify')
  , browserify = require('./index.js');

module.exports = (entrypoints, options={}) => {

  var reactifyWrapper = (f) => reactify(f, { es6: options.es6 !== false });

  return browserify(entrypoints, Object.assign(options, {
    extensions : ['.jsx'].concat(options.extensions || [])
  }))
    .configure(bundler => bundler.transform({ global: true }, reactifyWrapper));
};
