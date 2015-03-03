"use strict";
var gulp = require('gulp')
  , path = require('path');

module.exports = function(args) {
  return gulp.dest(path.join(args));
};
