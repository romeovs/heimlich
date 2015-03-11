'use strict';
var gulp       = require('gulp')
  , concat     = require('gulp-concat')
  , filter     = require('gulp-filter')
  , sourcemaps = require('gulp-sourcemaps')
  , stylus     = require('gulp-stylus')
  , util       = require('gulp-util')
  , alert      = require('./alert')
  ;

module.exports = function (stylesheets, options = {}) {

  options.filename = options.filename || 'main.css';

  var error = function (err) {
    alert.log('Stylus', err);
    this.emit('end');
  };

  var filtered = filter('**/*.styl');

  return gulp.src(stylesheets)
    .pipe(filtered)
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .on('error', error)
    .pipe(sourcemaps.write())
    .pipe(filtered.restore())
    .pipe(concat(options.filename));
};
