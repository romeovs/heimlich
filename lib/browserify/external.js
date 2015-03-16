'use strict';
var browserify = require('browserify')
  , source     = require('vinyl-source-stream')
  , pkg        = require('../package')
  , alert      = require('../alert')
  , buffer     = require('gulp-buffer')
  , concat     = require('gulp-concat')
  , data       = require('gulp-data')
  , merge      = require('merge-stream')
  , stream     = require('stream')
  , gutil      = require('gulp-util')
  ;

// create a file stream
var file = function (filename, string) {
  var src = new stream.Readable({ objectMode: true });
  src._read = function () {
    this.push(new gutil.File({
      cwd      : ''
    , base     : ''
    , path     : filename
    , contents : new Buffer(string)
    }));
    this.push(null);
  };
  return src;
};

module.exports = function(options = {}) {

  // read the dependencies
  var libs = Object.keys(pkg.dependencies || {});
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
      var strm =
        libbundler
          .bundle()
          .pipe(source(options.rename))
          .pipe(buffer())
          .pipe(data(function(libfile) {
            libdata = libfile.contents.toString();
            console.log('libs bundled!');
            this.rebundle();    // initialize rebundle if possible
          }.bind(this)));

      // replace handler
      var handler = this.done;
      this.done = function(strm) {
        if ( libdata ) {
          var merged =
            merge(file('lib.js', libdata), strm)
              .pipe(alert())
              .pipe(buffer())
              .pipe(concat(options.filename || 'main.js'))
          handler(merged);
        }
      }
    }
  };
};
