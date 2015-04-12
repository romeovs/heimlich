'use strict';

require('harmonize')();
require('harmony-reflect');


var flag = require('./flag')
  ;

module.exports = {
  alert       : require('./alert')
, browserify  : require('./browserify')
, config      : require('./config')
, defaults    : require('./defaults')
, dest        : require('./dest')
, flag        : flag
, lint        : flag('lint')
, production  : flag('production')
, tasks       : require('./tasks')
};
