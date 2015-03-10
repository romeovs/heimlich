'use strict';
var fs       = require('fs')
  , yaml     = require('yamljs')
  , defaults = require('./defaults')
  ;

// reads config from the ./config folder
// tries files in this order:
// - name.yaml
// - name.js
// - name.json
// if no file was found it tries to use
// the default from heimlich.defaults.options[name]

module.exports = function(name, path) {

  path = path || './config';
  defaults.options = defaults.options || {};

  var config;
  try {
    // read ./config/name.yaml
    config = yaml.parse(fs.readFileSync(`${path}/${name}.yaml`).toString());
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
