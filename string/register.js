var fs = require('fs')
  ;

var register = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

require.extensions['.txt'] = register;

module.exports = function (options) {
  options = options || {};

  (options.extensions || []).forEach(function (extension) {
    require.extensions[extension] = register;
  });
};
