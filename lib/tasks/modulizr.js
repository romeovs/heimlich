'use strict';
var gif      = require('gulp-if')
  , uglify   = require('gulp-uglify')
  , rename   = require('gulp-rename')
  , modulizr = require('gulp-modulizr')
  , dest     = require('../dest')
  , alert    = require('../alert')
  , config   = require('../config')
  , file     = require('../file')
  ;

module.exports = function(options) {
  options = options || {};
  var min = options.uglify !== false; // wether or not to minify

  // tdo: use config instead of defaults
  options.dest   = options.dest   || config.heimlich.dest.js;
  options.uglify = options.uglify || config.uglify || false;
  options.filename = options.filename || 'modernizr.js';

  var conf = config.modulizr;
  conf.filename = options.filename;

  return function() {
    return modulizr(conf)
      .pipe(alert())
      .pipe(gif(min, uglify(options.uglify)))
      .pipe(dest(options.dest));
  };
};
