'use strict';
var browserify = require('browserify')
  , reactify   = require('reactify')
  , watchify   = require('watchify')
  ;

var reactBrowserify = function (entry, options) {
  options     = options     || {};
  options.es6 = options.es6 || true;

  options.debug = options.debug !== undefined
    ? options.debug
    : !(process.env.NODE_ENV === 'production');

  var reactifyWrapper = options.es6
        ? function (f) {
            return reactify(f, { es6: true });
          }
        : reactify;

  return watchify(browserify(
    { cache        : {}
    , packageCache : {}
    , debug        : options.debug
    , entries      : [entry]
    }))
      .transform(reactifyWrapper);
};

module.exports = reactBrowserify;
