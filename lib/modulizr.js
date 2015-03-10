'use strict';
var modernizr = require('modernizr')
  , through   = require('through2')
  , rename   = require('gulp-rename')
  ;

module.exports = function(options) {

  options = options || {};

  return through.obj(function(file, enc, callback) {
    // read options file

    var options = require(file.path);

    // build the modernizr module
    modernizr.build(options, function (result) {
      file.contents = new Buffer(result);
      this.push(file);
      callback();
    }.bind(this));
  });
};
