'use strict';

require('babel/polyfill');

var flag = require('./flag')
  ;

module.exports = {
  alert      : require('./alert')
, dest       : require('./dest')
, browserify : require('./browserify')
, reactify   : require('./browserify/react')
, flag       : flag
, production : flag('production')
, lint       : flag('lint')
};
