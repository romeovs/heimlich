'use strict';
var config = require('../config')
  ;

// holds the default configuration
// for most of the used gulp-plugins

module.exports = {
  dest: {
    js:  './public/js'
  , css: './public/css'
  }

, options: {
    uglify    : config('uglify', __dirname)
  , modernizr : config('modernizr', __dirname)
  }

};
