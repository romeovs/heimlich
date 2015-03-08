'use strict';
var browserify = require('browserify')
  , watchify   = require('watchify')
  , gutil      = require('gulp-util')
  , source     = require('vinyl-source-stream')
  , alert      = require('../alert')
  ;

var bs = gutil.colors.cyan("browserify");

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

module.exports = function(files, options) {

  options.watching = !!options.watching;    // default to not watching
  options.delay    = options.delay || 60;   // 60ms delay after file changed
  options.filename = options.filename || 'main.js';

  // default done handler logs error
  var done = function() {
    console.log(gutil.colors.yellow('no done handler specified for browserify!'));
  };

  // default changer does nothing
  var change = function(b) {
    // call all changers
    changers.reduce(function(bundler, fn) {
      return fn(bundler);
    }, bundler);
  };

  var bopts = Object.assign(options.browserify || {}, {
      cache        : {}
    , packageCache : {}
    , fullpaths    : options.watching
    });

  var bundler = browserify(files, bopts);

  if ( options.watching ) {
    bundler = watchify(bundler, {
      delay: options.delay
    });
  }

  // bundler = transform(bundler);
  var rebundle = function(files) {
    logfiles(files);

    var stream =
      change(bundler)
        .bundle()
        .on('error', function(err) {
          alert.log(err);
          this.emit('end');
        });

    // continue with stream
    this.done(stream);
    return stream;
  };

  if ( options.watching ) {
    bundler.on('update', rebundle);
    bundler.on('time',   logtime);
  }


  // end the chain and add done handler
  var done = function(fn) {
    done = fn;
    rebundle();
  };

  // change the bundler
  var change = function(fn) {
    changers.push(fn);
    return {
      change: change
    , done:   done
    }
  };

  return {
    change: change
  , done:   done
  }
};