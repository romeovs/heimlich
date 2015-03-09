'use strict';

require('babel/polyfill');

module.exports = {
  alert      : require('./alert')
, dest       : require('./dest')
, browserify : require('./browserify')
};
