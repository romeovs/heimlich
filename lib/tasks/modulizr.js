'use strict';
var gif      = require('gulp-if')
  , uglify   = require('gulp-uglify')
  , rename   = require('gulp-rename')
  , modulizr = require('../modulizr')
  , dest     = require('../dest')
  , alert    = require('../alert')
  , defaults = require('../defaults')
  , config   = require('../config')
  , file     = require('../file')
  ;

module.exports = function(options) {
  options = options || {};
  var min = options.uglify !== false; // wether or not to minify

  // tdo: use config instead of defaults
  options.dest   = options.dest   || config('heimlich').dest.js || defaults.dest.js;
  options.uglify = options.uglify || config('uglify') || defaults.options.uglify;
  options.rename = options.rename || 'modernizr.js';

  return function() {
    return file('modernizr.json', JSON.stringify(config.options.modulizr))
      .pipe(alert())
      .pipe(modulizr(options))
      .pipe(gif(min, uglify(options.uglify)))
      .pipe(rename(options.rename))
      .pipe(dest(options.dest));
  };
};
