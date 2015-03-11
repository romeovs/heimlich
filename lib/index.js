'use strict';

require('babel/polyfill');

var flag = require('./flag')
  ;

module.exports = {
  alert       : require('./alert')
, dest        : require('./dest')
, browserify  : require('./browserify')
, reactify    : require('./browserify/react')
, externalize : require('./browserify/external')
, flag        : flag
, production  : flag('production')
, lint        : flag('lint')
, tasks       : require('./tasks')
, defaults    : require('./defaults')
, config      : require('./config')
, modulizr    : require('./modulizr')
, stylus      : require('./stylus')
};
