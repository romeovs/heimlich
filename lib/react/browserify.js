"use strict";
var browserify = require('browserify')
  , reactify   = require('reactify')
  , watchify   = require('watchify')

  , reactifyES6   = function (f) {
      return reactify(f, { es6: true });
    }
  ;

var reactBrowserify = function (entry) {
  return watchify(browserify(
    { cache        : {}
    , packageCache : {}
    , debug        : ! (process.env.NODE_ENV == "production")
    , entries      : [entry]
    }))
      .transform(reactifyES6);
};

module.exports = reactBrowserify;
