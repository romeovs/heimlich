'use strict';

var gulp   = require('gulp')
  , flow   = require('gulp-flowtype')
  , watch  = require('gulp-watch')
  , config = require('../config')
  ;

module.exports = function (options = {}) {
  options.extensions = options.extensions || [];
  options.watching   = options.watching !== undefined ? options.watching : flag('watch');

  var files = options.extensions.map(ext => '**/*.' + ext);

  var f = function () {
    gulp.src(files)
      .pipe(flow({
      }));
  };

  if (options.watching) {
    watch(files, f);
  }

  return f;
};
