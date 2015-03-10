'use strict';
var browserify = require('browserify')
  , source     = require('vinyl-source-stream')
  , pkg        = require('../package')
  , alert      = require('../alert')
  , merge      = require('merge-stream')
  , concat     = require('gulp-concat')
  , buffer     = require('gulp-buffer')
  , data       = require('gulp-data')
  , gutil      = require('gulp-util')
  , stream     = require('stream')
  ;

// create a gulp-like file stream
// from a string
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

  return function(bundler, opts) {

    // externalize all the external libs
    if ( !opts.production && !options.disable ) {

      // bundle libs separatly
      var libbundler = browserify();

      console.log('externalizing libs:');
      options.libs.forEach(function(lib) {
        bundler.external(lib);    // make lib external
        libbundler.require(lib);  // require it in libs
        console.log(` - ${lib}`);
      });

      var libdata;

      // bundle external libs
      libbundler
        .bundle()                        // bundle
        .pipe(source('lib.js'))          // make it useable by gulp
        .pipe(buffer())                  // make sure it is a buffer
        .pipe(data(function(libfile) {  // extract data as string
          libdata = libfile.contents.toString(); // save the libs into libdata
          this.rebundle();                       // rebundle to make sure we have
                                                 // concated the right contents
        }.bind(this)));

      // get the done handler
      var done = this.done;

      // replace the done handler with a new handler
      this.done = function(strm) {
        // only call when libdata is set
        if ( libdata ) {
          // add libdata to stream and concatenate
          // libdata and the jsut built file
          var merged =
            merge(file('lib.js', libdata), strm)  // put libdata into a file and merge with strm
              .pipe(alert())
              .pipe(buffer())                     // make everything a buffer for concat
              .pipe(concat(opts.filename));           // concat into main.js
          done(merged);
        }
      };
    }
    return bundler;
  };
};
