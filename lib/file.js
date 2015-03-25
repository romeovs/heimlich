'use strict';
var stream = require('stream')
  , gutil  = require('gulp-util')
  ;

// create a file stream
var file = function (filename, string) {
  console.log(string);
  var src = new stream.Readable({ objectMode: true });
  src._read = function () {
    this.push(new gutil.File({
      cwd      : ''
    , base     : ''
    , path     : filename
    , contents : new Buffer(string)
    }));
    this.push(null);
  };
  return src;
};

module.exports = file;
