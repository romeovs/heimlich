'use strict';
var fs       = require('fs')
  , path     = require('path')
  , readyaml = require('./readyaml')
  , defaults = require('./defaults')
  ;

// reads config from the ./config folder
// tries files in this order:
// - name.yaml
// - name.js
// - name.json
// if no file was found it tries to use
// the default from heimlich.defaults.options[name]

var getConfig = function(name, path) {

  path = path || './config';
  defaults.options = defaults.options || {};

  var config;
  try {
    // read ./config/name.yaml
    config = readyaml(`${path}/${name}.yaml`);
  } catch (err) {
    try {
      // read ./config/name.js
      var src = fs.readFileSync(`${path}/${name}.js`).toString();
      var Module = module.constructor;
      var m = new Module();
      m._compile(src, `${path}/${name}.js`);
      config = m.exports;
    } catch (e) {
      try {
        // read ./config/name.json
        config = JSON.parse(fs.readFileSync(`${path}/${name}.json`).toString());
      } catch (e) {
        // use defaults
        config = defaults.options[name];
        if ( !config ) {
          throw new Error(`neither ${name}.yaml, ${name}.js or ${name}.json were found in ${path}`);
        }
      }
    }
  }

  return config;
};

var conf = Object.assign(getConfig, defaults);

// read all config files
module.exports =
  fs.readdirSync('./config')
    .reduce(function(prev, file) {
      var name = path.basename(file, path.extname(file));
      var obj = { };
      obj[name] = getConfig(name);
      prev.options = Object.assign(prev.options, obj);
      if ( name === "heimlich" ) {
        prev = Object.assign(prev, getConfig(name));
      }
      return prev;
    }, conf);
