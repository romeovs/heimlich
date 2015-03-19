'use strict';
var nodemon = require('gulp-nodemon')
  ;

module.exports = function (options = {}) {
  options.harmony = options.harmony !== false;
  options.entry   = options.entry || 'index.js';
  options.files   = options.files || [];
  options.port    = options.port  || 3000;

  options.files = options.files.concat([options.entry]);

  var args = options.harmony ? ['--harmony'] : [];

  var env = {
    NODE_ENV : 'development'
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
