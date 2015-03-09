'use strict';
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

var log = function(name, error) {
  var err = error || name;


  // transform error to PluginError for bettor logging
  var pluginError = error && name
                  ? new gutil.PluginError(name, err)
                  : new gutil.PluginError(err);

  gutil.log(pluginError.toString());
};

// shows error and plays sound
// the alert task
var alert = function(options) {
  var handler = function(error) {
    // when an error occurs,
    // play beep noise
    if ( !options.silent ) {
      var cmd = options.command || 'beep';
      exec(`which ${cmd} && ${cmd}`);
    }

    // log to screen with name
    log(options.name, error);
  };

  return plumber({
    errorHandler: handler
  });
};

alert.log = log;
module.exports = alert;
