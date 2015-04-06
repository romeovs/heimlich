'use strict';
var browserify = require('browserify')
  , source     = require('vinyl-source-stream')
  , pkg        = require('../package')
  , alert      = require('../alert')
  , buffer     = require('gulp-buffer')
  , concat     = require('gulp-concat')
  , data       = require('gulp-data')
  , merge      = require('merge-stream')
  , gutil      = require('gulp-util')
  , watch      = require('gulp-watch')
  , sourcemaps = require('gulp-sourcemaps')
  , file       = require('../file')
  ;


module.exports = function(options = {}) {

  // read the dependencies
  var libs = Object.keys(pkg.dependencies || {});
  var libsgiven = !!options.libs;
  options.libs   = options.libs || libs || [];
  options.rename = options.rename || 'lib.js';

  return function() {
    // externalize all the external libs
    if ( !this.options.production && !options.disable ) {

      // bundle libs separatly
      var libbundler = browserify();

      options.libs.forEach(function(lib) {
        this.bundler.external(lib);    // make lib external
        libbundler.require(lib);  // require it in libs
      }.bind(this));

      // store libdata
      var libdata;

      // bundle external libs
      var bundlelibs = function() {
        var strm =
          libbundler
            .bundle()
            .pipe(source(options.rename))
            .pipe(buffer())
            .pipe(data(function(libfile) {
              libdata = libfile.contents.toString();
              gutil.log(gutil.colors.cyan('browserify') + ' externals bundled');
              this.rebundle();    // initialize rebundle if possible
            }.bind(this)));
      }.bind(this);

      // start bundling now!
      bundlelibs();

      if ( this.options.watching && !libsgiven ) {
        // rebundle libs when package.json changes
        watch('./package.json', bundlelibs);
      }

      // replace handler
      var handler = this.done;
      this.done = function(strm) {
        if ( libdata ) {
          var merged =
            merge(file('lib.js', libdata), strm)
              .pipe(alert())
              .pipe(buffer())
              .pipe(sourcemaps.init({ loadMaps: true }))
              .pipe(concat(options.filename || 'main.js'))
              .pipe(sourcemaps.write());
          handler(merged);
        }
      };
    }
  };
};
