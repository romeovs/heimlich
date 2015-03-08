"use strict";
var gulp = require('gulp')
  , path = require('path');

module.exports = function () {
  return gulp.dest(path.join.apply(path, arguments));
};
