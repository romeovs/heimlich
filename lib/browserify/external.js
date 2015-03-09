'use strict';
var browserify = require('browserify')
  , gutil      = require('gulp-util')
  , source     = require('vinyl-source-stream')
  , pkg        = require('../package')
  ;

module.exports = function(options) {

  // read the dependencies
  var libs = Object.keys(pkg.dependencies || {});
  options.libs   = options.libs || libs || [];
  options.rename = options.rename || 'lib.js';

  return function(bundler, opts) {

    // externalize all the external libs
    if ( !opts.production && !options.disable ) {

      // bundle libs separatly
      var libbundler = browserify();

      options.libs.forEach(function(lib) {
        bundler.external(lib);    // make lib external
        libbundler.require(lib);  // require it in libs
      });

      // bundle external libs
      var strm =
        libbundler
          .bundle()
          .pipe(source(options.rename))

      var handler = options.done || opts.done;  // reuse done handler from heimlich
      handler(strm);
    }

    return bundler;
  };
};
