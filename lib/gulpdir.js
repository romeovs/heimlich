'use strict';
var findup = require('findup')
  ;

module.exports = findup.sync('.', 'package.json');
