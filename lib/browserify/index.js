'use strict';
var browserify = require('browserify')
  , watchify   = require('watchify')
  , gutil      = require('gulp-util')
  , source     = require('vinyl-source-stream')
  , alert      = require('../alert')
  ;

var bs = gutil.colors.cyan('browserify');

var logtime = function(time) {
  var tm = gutil.colors.magenta(`${time}ms`);
  gutil.log(`Finished ${bs} build after ${tm}.`);
};

var logfiles = function(files) {
  (files || [])
    .map(gutil.colors.magenta)
    .forEach(function(file) {
      gutil.log(`${file} was changed`);
    });
    gutil.log(`Starting ${bs} build...`);
};

module.exports = function(entrypoints, options) {

  options.watching = !!options.watching;    // default to not watching
  options.delay    = options.delay || 60;   // 60ms delay after file changed
  options.filename = options.filename || 'main.js';

  // default done handler logs error
  var done = function() {
    console.log(gutil.colors.yellow('no done handler specified for browserify!'));
  };

  // default changer does nothing
  var middleware = [];
  var change = function(b) {
    // call all changers
    return middleware
            .reduce(function(wrapped, fn) {
              return fn(wrapped);
            }, b);
  };

  // override some options
  var bopts = Object.assign(options || {}, {
      cache        : {}
    , packageCache : {}
    , fullpaths    : options.watching
    });

  // create the bundler
  var bundler = browserify(entrypoints, bopts);


  // set up watchify if necessary
  if ( options.watching ) {
    bundler = watchify(bundler, {
      delay: options.delay
    });
  }


  // bundler = transform(bundler);
  var rebundle = function(files) {
    logfiles(files);

    var stream =
      bundler
        .bundle()
        .on('error', function(err) {
          alert.log('Browserify', err);
          this.emit('end');
        })
        .pipe(source(options.filename));

    // continue with stream
    done(stream);
    return stream;
  };

  if ( options.watching ) {
    bundler.on('update', rebundle);
    bundler.on('time',   logtime);
  }

  // end the chain and add done handler
  var end = function(fn) {
    // apply middleware
    bundler = change(bundler);

    if (bundler && bundler.bundle) {
      done = fn;
      rebundle(); // start bundling!
    } else {
      alert.log('browserify', new Error('browserify "configure" functions must return a bundler!'));
    }
  };

  // change the bundler with extra stuff
  var configure = function(fn) {
    middleware.push(fn);

    // return for chaining
    return {
      configure : configure
    , done      : end
    };
  };

  return {
    configure : configure
  , done      : end
  };
};
