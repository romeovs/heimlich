'use strict';
var fs    = require('fs')
  , path  = require('path')
  , yargs = require('yargs')
  , gutil = require('gulp-util')
  , ncp   = require('ncp')
  ;

module.exports = function(argv) {

  var name = argv._[1];

  if ( !name ) {
    console.log('no project name specified.');
    process.exit(1);
  }

  console.log('not implemented');
};
