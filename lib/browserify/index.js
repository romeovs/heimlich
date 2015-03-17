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

class stub {
  constructor() {
    this.commands = [];
  }

  // save a new configuration
  push(name, args) {
    this.commands.push([name, args]);
  }

  // apply all configurations
  build(options) {
    var bundler = browserify(options);

    this.commands.forEach(function(cmd) {
      var name = cmd[0];
      var args = cmd[1];

      if ( name === "__set" ) {
        bundler[args[0]] = args[1];
      } else {
        bundler[name].apply(bundler, args);
      }
    });

    return bundler;
  }
};

// create an empty stub with proxy
var empty = function() {
  var target = new stub();
  var proxy  = {
    build:    target.build.bind(target)
    // rebundle:
  };

  // copy all the api functions that matter
  [
    'transform'
  , 'add'
  , 'require'
  , 'external'
  , 'exclude'
  , 'ignore'
  , 'plugin'
  , 'on'
  ].forEach(function(name) {
    proxy[name] = function() {
      target.push(name, arguments);
    };
  });

  // error for other api functions
  [
    'bundle'
  , 'reset'
  ].forEach(function(name) {
    proxy[name] = function() {
      throw new Error(`you cannot call .${name}() in heimlich middleware`);
    };
  });

  // error for pipeline
  proxy.pipeline = {
    get() {
      throw new Error(`you cannot call .pipeline.get() in heimlich middleware`);
    }
  };

  return proxy;
};

// merge middleware
var merge = function(middleware, options, done, rebundle) {
  var conf = {
    bundler: empty()
  , options
  , done
  , rebundle
  };

  middleware.forEach(function(fn) {
    fn.apply(conf);
  })

  return conf;
};

var Browserify = function (options = {}) {

  options.watching   = !!options.watching;              // default to not watching
  options.delay      = options.delay || 60;             // 60ms delay after file changed
  options.filename   = options.filename || 'main.js';   // the name of the bundler file

  options.production = options.production !== undefined
                     ? options.production
                     : flag('production');

  // override some options
  var bopts = Object.assign(options, {
      cache        : {}
    , packageCache : {}
    , fullpaths    : options.watching
    , watching     : options.watching
    });

  // initial middleware is empty
  var middleware = [];
  var configure = function(fn) {
    // add to middleware
    middleware.push(fn);

    // return for chaining
    return this;
  };

  this.rebundle = function() {
    // do nothing as we haven't finished bootstrapping yet
    // after the bootstrapping rebunle will be called
    // anyways.
  };

  // end config chain, add done handler
  var done = function(fn) {
    var re = function() {
      this.rebundle();
    }.bind(this);
    var merged = merge(middleware, bopts, fn, re);
    var bundler = merged.bundler.build(merged.options);
    start(bundler, merged.done);
  }.bind(this);

  var start = function(bundler, handler) {
    // set up watchify if necessary
    if ( options.watching ) {
      bundler = watchify(bundler, {
        delay: options.delay
      });
    }

    // rebundle files
    this.rebundle = function(files) {
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
      handler(stream);
    };

    if ( options.watching ) {
      bundler.on('update', this.rebundle);
      bundler.on('time',   logtime);
    }

    // call rebundle to sart ping-pong
    this.rebundle();
  }.bind(this);

  return {
    configure
  , done
  };
};


module.exports = function(entries, options) {

  // allow browserify(entries, opts);
  if ( options ) {
    options.entries = entries.concat(options.entries || []);
  } else {
    options = entries;
  }

  return new Browserify(options);
};

module.exports.react    = require('./react');
module.exports.external = require('./external');
