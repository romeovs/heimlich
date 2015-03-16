'use strict';
var fs    = require('fs')
  , path  = require('path')
  ;

module.exports = function(argv) {
  var cmd = argv._[1];
  if ( !cmd ) {
    cmd = 'help';
  }

  fs.readFile(path.join(__dirname, '../help/' + cmd), function(err, content) {
    console.log(content.toString());
  });
};
