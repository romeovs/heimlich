'use strict';

require('babel/register')({
  sourceMap  : 'inline'
, compact    : false
});

module.exports = require('../lib');
