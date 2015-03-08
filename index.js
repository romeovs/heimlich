"use strict";

// es6 all the things!
require('node-babel')({
  whitelist: [
    "es6.templateLiterals"
  ]
});

module.exports = {
  alert      : require('./lib/alert')
, dest       :  require('./lib/dest')
, browserify : require('./lib/browserify')
};
