'use strict';
var fs     = require('fs')
  , path   = require('path')
  , handle = require('../handle')
  ;

module.exports = function(argv) {
  var cmd = argv._[1];
  if ( !cmd ) {
    cmd = 'help';
  }

  fs.readFile(path.join(__dirname, '../help/' + cmd), function(err, content) {
    handle(err);
    console.log(content.toString());
  });
};
