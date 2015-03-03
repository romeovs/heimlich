"use strict";
/**
 * ALERT.JS
 * fix pipes so they can keep going when an
 * error occurs. Also plays a sound when an error
 * occurs.
 */

var exec    = require('child_process').exec
  , gutil   = require('gulp-util')
  , plumber = require('gulp-plumber')
  ;

// shows error and plays sound
// the alert task
var alert = function(options) {

  var handler = function(error) {

    // when an error occurs,
    // play beep noise
    if ( !options.silent ) {
      var cmd = options.command || 'beep';
      exec('which ' + cmd + ' && ' + cmd);
    }

    // transform error to PluginError for bettor logging
    var pluginError = new gutil.PluginError(error);
    gutil.log(pluginError.toString());
  };

  return plumber({
    errorHandler: handler,
  });
};

module.exports = alert;
