'use strict';
var browserify = require('browserify')
  , watchify   = require('watchify')
  , gutil      = require('gulp-util')
  , source     = require('vinyl-source-stream')
  , alert      = require('../alert')
  , flag       = require('../flag')
  ;

var bs = gutil.colors.cyan('browserify');

var logtime = function(time) {
  var tm = gutil.colors.magenta(`${time}ms`);
  gutil.log(`Finished ${bs} build after ${tm}.`);
};

var logfiles = function(files) {
  (files || [])
    .map(function(file) {
      return gutil.colors.magenta(file);
    })
    .forEach(function(file) {
      gutil.log(`${file} was changed`);
    });
    gutil.log(`Starting ${bs} build...`);
};

var change = function(b, middleware, opts) {
  // call all changers
  return middleware
          .reduce(function(prev, fn) {
            var wrapped = fn.apply(this, [prev, opts]);
            if (wrapped && wrapped.bundle) {
              return wrapped;
            } else {
              alert.log('browserify', new Error('browserify "configure" functions must return a bundler!'));
            }
          }.bind(this), b);
};

var Browserify = function(entrypoints, options={}) {

  options.watching   = !!options.watching;              // default to not watching
  options.delay      = options.delay || 60;             // 60ms delay after file changed
  options.filename   = options.filename || 'main.js';   // the name of the bundler file

  options.production = options.production !== undefined
                     ? options.production
                     : flag('production');

  // default done handler logs error
  this.done = function() {
    console.log(gutil.colors.yellow('no done handler specified for browserify!'));
  };

  // default middleware does nothing
  var middleware = [];

  // override some options
  var bopts = Object.assign(options, {
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
    this.done(stream);
    return stream;
  }.bind(this);

  this.rebundle = rebundle;

  if ( options.watching ) {
    bundler.on('update', rebundle);
    bundler.on('time',   logtime);
  }

  // end the chain and add done handler
  var end = function(fn) {
    // set done handler
    this.done = fn;

    // apply middleware (bind this to this so it
    // can access properties)
    bundler = change.bind(this)(bundler, middleware, options);

    // start bundling!
    rebundle();
  }.bind(this);

  // configure the bundler with extra stuff
  var configure = function(fn) {

    // add to middleware
    middleware.push(fn);

    // return for chaining
    return this;
  };

  return {
    configure : configure
  , done      : end
  };
};


module.exports = function(entrypoints, options = {}) {
  return new Browserify(entrypoints, options);
};
