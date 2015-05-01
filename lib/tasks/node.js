'use strict';
var nodemon = require('gulp-nodemon')
  , config  = require('../config')
  ;

module.exports = function (options = {}) {
  options.harmony = options.harmony !== false;
  options.entry   = options.entry || 'index.js';
  options.files   = options.files || config.heimlich.watch.js || [];
  options.env     = options.env || process.env.NODE_ENV;
  options.port    = options.port  || 3000;

  options.files =
    options.files.concat([options.entry])
      .map(function(glob) {
        // remove leading ./
        return glob.replace(/^\.\//, '');
      });

  var args = options.harmony ? ['--harmony'] : [];

  var env = {
    NODE_ENV : options.env
  , PORT     : options.port
  };

  return function () {
    nodemon({
      script   : options.entry
    , nodeArgs : args
    , watch    : options.files
    , env      : env
    });
  };
};
