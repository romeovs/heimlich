'use strict';
var gulp       = require('gulp')
  , concat     = require('gulp-concat')
  , csscss     = require('gulp-csscss')
  , csso       = require('gulp-csso')
  , gif        = require('gulp-if')
  , mincss     = require('gulp-minify-css')
  , myth       = require('gulp-myth')
  , rename     = require('gulp-rename')
  , sourcemaps = require('gulp-sourcemaps')
  , stylus     = require('gulp-stylus')
  , util       = require('gulp-util')
  , alert      = require('../alert')
  , config     = require('../config')
  , dest       = require('../dest')
  , flag       = require('../flag')
  ;

module.exports = function (options = {}) {

  var heim = config('heimlich');
  var conf = config('css');
  var lint = flag('lint');
  var prod = flag('production');

  options.csso     = options.csso     || conf.csso || {};
  options.dest     = options.dest     || heim.dest.css;
  options.filename = options.filename || 'main.css';
  options.minify   = options.minify   || conf['minify-css'] || {};
  options.source   = options.source   || heim.src.stylus;
  options.stylus   = options.stylus   || config.stylus;

  return function() {
    return gulp
      .src(options.source)
      .pipe(alert())
      .pipe(sourcemaps.init())
      .pipe(stylus())
      .pipe(myth(conf.myth || {}))
      .pipe(gif(prod, csso(options.csso.restructure)))
      .pipe(gif(prod, mincss(options.minify)))
      .pipe(gif(lint, csscss()))
      .pipe(gif(!prod, sourcemaps.write()))
      .pipe(gif(options.rename, rename(options.filename)))
      .pipe(concat(options.filename))
      .pipe(dest(options.dest))
  };
};
