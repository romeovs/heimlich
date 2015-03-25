'use strict';
var readyaml = require('../readyaml')
  ;

// holds the default configuration
// for most of the used gulp-plugins
var heimlich = readyaml(`${__dirname}/heimlich.yaml`);

// extend with defaults for plugins
heimlich.options = {
  heimlich  : heimlich
, uglify    : readyaml(`${__dirname}/uglify.yaml`)
, modulizr  : readyaml(`${__dirname}/modulizr.yaml`)
, css       : readyaml(`${__dirname}/css.yaml`)
};

module.exports = heimlich;
