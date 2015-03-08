"use strict";

// es6 all the things!
require('babel/register');

module.exports = {
  alert      : require('./lib/alert')
, dest       :  require('./lib/dest')
, browserify : require('./lib/browserify')
};
