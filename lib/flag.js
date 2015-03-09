'use strict';
var yargs = require('yargs');

var argv = yargs.argv;
module.exports = function(name) {
  return process.env.NODE_ENV === name || argv[name] || false;
};
