'use strict';
var yargs  = require('yargs')
  , fs     = require('fs')
  , path   = require('path')
  , findup = require('findup')
  ;

var argv = yargs.argv
  , cmd  = argv._[0];

var gulpdir = findup.sync('.', 'package.json');

try {
  if ( cmd ) {
    switch( cmd ) {
      case 'init':
        require('./cmds/init')(argv);
        break;
      case 'config':
        require('./cmds/config')(argv, gulpdir);
        break;
      case 'help':
        require('./cmds/help')(argv);
        break;
      default:
        throw "unknown command '" + cmd + "'";
    }
  } else {
    fs.readFile(path.join(__dirname, 'help/usage'), function(err, content) {
      console.log(content.toString());
    });
  }
} catch ( e ) {
  console.log(e);
  process.exit(1);
}
