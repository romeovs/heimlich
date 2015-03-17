'use strict';
var gulp = require('gulp')
  , path = require('path')
  ;


// OPTIONS <<
var project = {
  paths: {
    js: [
      'gulpfile.js'
    , 'lib/*.js'
    , 'lib/**/*.js'
    , 'bin/*.js'
    , 'bin/**/*.js'
    ]
  },
  options: { }
};
// >>

// LINT <<
var eslint = require('gulp-eslint');

project.options.eslint = {
  configFile: path.join(__dirname, '.eslintrc')
};

gulp.task('lint', function() {
  return gulp
          .src(project.paths.js)
          .pipe(eslint(project.options.eslint))
          .pipe(eslint.format());
});
// >>

// BUILD <<
var babel = require('gulp-babel')
  ;

gulp.task('build', function() {
  var strm =
    gulp
      .src(project.paths.js)
      .pipe(babel())
      .pipe(gulp.dest('build'));

  return strm;
});

// >>

// WATCH <<
var watch = require('gulp-watch')
  ;

gulp.task('watch', ['default'], function() {
  watch(project.paths.js, function() {
    gulp.start('build');
  });
});
// >>

// DEFAULT <<
gulp.task('default', ['lint'], function() {

});
// >>

// vim: foldmethod=marker foldmarker=<<,>>
