'use strict';

/*eslint-disable no-process-exit */
module.exports = function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
};
