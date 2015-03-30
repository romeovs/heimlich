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
                  : new gutil.PluginError('NO_NAME', err);

  gutil.log(pluginError.toString());
};

var beep = function () {
  var cmd = options.command || 'beep';
  exec(`which ${cmd} && ${cmd}`);
};

// shows error and plays sound
// the alert task
var alert = function(options = {}) {
  var handler = function(error) {
    // when an error occurs,
    // play beep noise
    if ( !options.silent ) {
      beep();
    }

    // log to screen with name
    log(options.name, error);
  };

  return plumber({
    errorHandler: handler
  });
};

alert.log  = log;
alert.beep = beep;
module.exports = alert;
