'use strict';
var yaml = require('yamljs')
  , fs   = require('fs')
  ;

module.exports = function(path) {
  return yaml.parse(fs.readFileSync(path).toString());
};

