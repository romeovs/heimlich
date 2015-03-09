'use strict';
var fs  = require('fs')
  ;

// read package.json
// this works, gulp always changes to gulpfile dir!
try {
  var pkg = fs.readFileSync('./package.json');
  module.exports = JSON.parse(pkg.toString());
} catch (err) {
  module.exports = {};
}
