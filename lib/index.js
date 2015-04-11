'use strict';

require('harmonize')();
require('harmony-reflect');


var flag = require('./flag')
  ;

module.exports = {
  alert       : require('./alert')
, dest        : require('./dest')
, browserify  : require('./browserify')
, flag        : flag
, production  : flag('production')
, lint        : flag('lint')
, tasks       : require('./tasks')
, defaults    : require('./defaults')
, config      : require('./config')
};
