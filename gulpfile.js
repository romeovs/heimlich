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
          .pipe(eslint.format())
});
// >>

// DEFAULT <<
gulp.task('default', ['lint'], function() {

});
// >>

// vim: foldmethod=marker foldmarker=<<,>>
