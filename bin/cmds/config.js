'use strict';
var fs    = require('fs')
  , path  = require('path')
  , yargs = require('yargs')
  , yaml  = require('yamljs')
  , gutil = require('gulp-util')
  ;


module.exports = function() {
  var argv =
    yargs
      .boolean('overwite')
      .nargs('format', 1)
      .argv
    ;


  var plugins = argv._.slice(1);
  var format  = argv.format || 'yaml';

  if ( !fs.existsSync('./config')) {
    fs.mkdirSync('./config');
  }

  if ( plugins.length === 0 ) {
    // read all config files
    plugins =
      fs.readdirSync(path.join(__dirname, '../../lib/defaults'))
        .filter(function(file) {
          return path.extname(file) === '.yaml';
        });
  }

  plugins.forEach(function(plugin) {
    var loc = './config/' + plugin + '.' + format;
    fs.exists(loc, function(exists) {
      if ( exists && !argv.overwrite ) {
        console.log(gutil.colors.red('! ') + 'file exists:', gutil.colors.magenta(loc) + ',',
                   'not overwriting it');
        return;
      }

      var pth = path.join(__dirname, '../../lib/defaults', plugin + '.yaml')
      fs.readFile(pth, function(err, content) {
        var conf;
        switch ( format ) {
          case 'yaml':
            conf = content;
            break;
          case 'js':
            var util = require('util');
            var data = yaml.parse(content.toString());
            conf = 'module.exports =\n' + util.inspect(data, {depth: null}) + ";";
            break;
          case 'json':
            conf = JSON.stringify(yaml.parse(content.toString()), null, 2);
            break;
          default:
            console.log("No such format '" + format + "'.");
            process.exit(1);
        }
        fs.writeFile(loc, conf, function(err) {
          if (err) {
            console.log(err);
            process.exit(1);
          }
          console.log(gutil.colors.green('✓ ') + plugin + ' config written to ' + gutil.colors.magenta(loc));
        });
      });
    });
  });
};
