import browserify from 'gulp-browserify'
import config     from '../config'
import flag       from '../flag'

var Browserify = function(entries = [], options) {
  if ( options ) {
    options.entries = entries.concat(options.entries || []);
  } else {
    options = entries || {};
  }

  options.watching   = options.watching !== undefined ? options.watching : flag('watch');
  options.entries    = options.entries || config.src;

  return browserify(options);
};

Browserify.external = require('./external');
Browserify.string   = require('./string');
Browserify.react    = require('./react');

export default Browserify;
