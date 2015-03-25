'use strict';
var handle = require('../handle')
  ;

module.exports = function(argv) {

  var name = argv._[1];

  if ( !name ) {
    handle('no project name specified.');
  }

  console.log('not implemented');
};
