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
  , copy: [
      'bin/**/*'
    , '!bin/**/*.js'
    , 'lib/**/*'
    , '!lib/**/*.js'
    ]
  }
, dest: 'build'
, options: { }
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
      .pipe(gulp.dest(project.dest));

  return strm;
});

// >>

// COPY <<
gulp.task('copy', function() {
  var strm =
    gulp
      .src(project.paths.copy)
      .pipe(gulp.dest(project.dest));
});
// >>

// WATCH <<
var watch = require('gulp-watch')
  ;

gulp.task('watch', ['default'], function() {
  watch(project.paths.js, function() {
    gulp.start('build');
  });

  watch(project.paths.copy, function() {
    gulp.start('copy');
  });
});
// >>

// DEFAULT <<
gulp.task('default', ['lint', 'build', 'copy'], function() {

});
// >>

// vim: foldmethod=marker foldmarker=<<,>>
