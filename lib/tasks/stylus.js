'use strict';
var gulp       = require('gulp')
  , filter     = require('gulp-filter')
  , sourcemaps = require('gulp-sourcemaps')
  , stylus     = require('gulp-stylus')
  , myth       = require('gulp-myth')
  , csso       = require('gulp-csso')
  , mincss     = require('gulp-minify-css')
  , csscss     = require('gulp-csscss')
  , util       = require('gulp-util')
  , rename     = require('gulp-rename')
  , gif        = require('gulp-if')
  , alert      = require('../alert')
  , config     = require('../config')
  , dest       = require('../dest')
  , flag       = require('../flag')
  ;

module.exports = function (stylesheets, options = {}) {

  var heim = config('heimlich');
  var conf = config('css');
  var lint = flag('lint');
  var prod = flag('production');

  console.log(heim);

  return function() {
    return gulp
      .src(heim.src.stylus)
      .pipe(alert())
      .pipe(filter('**/*.styl'))
      .pipe(sourcemaps.init())
      .pipe(stylus(config.stylus))
      .pipe(myth(conf.myth || {}))
      .pipe(gif(lint, csscss()))
      .pipe(gif(prod, csso(conf.csso && conf.csso.restructure)))
      .pipe(gif(prod, mincss(conf['minify-css'] || {})))
      .pipe(gif(!prod, sourcemaps.write()))
      .pipe(gif(options.rename, rename(options.filename)))
      .pipe(dest(heim.dest.css))
  };
};
