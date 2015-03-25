'use strict';
var modernizr = require('modernizr')
  , through   = require('through2')
  ;

module.exports = function(options) {

  options = options || {};

  return through.obj(function(file, enc, callback) {
    // read options file

    // var config = require(file.path);
    var config = {};

    // build the modernizr module
    modernizr.build(config, function (result) {
      file.contents = new Buffer(result);
      this.push(file);
      callback();
    }.bind(this));
  });
};
