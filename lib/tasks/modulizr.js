'use strict';
var gulp     = require('gulp')
  , gif      = require('gulp-if')
  , uglify   = require('gulp-uglify')
  , rename   = require('gulp-rename')
  , modulizr = require('../modulizr')
  , dest     = require('../dest')
  , alert    = require('../alert')
  , defaults = require('../defaults')
  ;

module.exports = function(options) {
  options = options || {};
  var min = options.uglify !== false; // wheter or not to minify

  options.dest   = options.dest   || defaults.dest.js;
  options.uglify = options.uglify || defaults.options.uglify;
  options.rename = options.rename || 'modernizr.js';

  return function() {
    return gulp
      .src('./config/modernizr.js')
      .pipe(alert())
      .pipe(modulizr(options))
      .pipe(gif(min, uglify(options.uglify)))
      .pipe(rename(options.rename))
      .pipe(dest(options.dest));
  };
};
