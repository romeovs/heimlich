'use strict';

require('babel/register');
require('babel/polyfill');

module.exports = {
  alert      : require('./lib/alert')
, dest       : require('./lib/dest')
, browserify : require('./lib/browserify')
};
