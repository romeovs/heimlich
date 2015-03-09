'use strict';

require('babel/polyfill');

module.exports = {
  alert      : require('./build/alert')
, dest       : require('./build/dest')
, browserify : require('./build/browserify')
};
