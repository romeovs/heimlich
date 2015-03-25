'use strict';

module.exports = function(str = '', cols = 80, keepBreaks = false) {

  // if we do not need to keep the breaks,
  // replace them for spaces
  if ( !keepBreaks ) {
    str = str.replace('\n', ' ');
  }

  // split str into lines
  var lines = str.split('\n');

  var formatted =
    lines.reduce(function(prev, line) {
      // split line into words
      var words = line.split(/ |\t/);

      var split =
        words.reduce(function(ln, word) {
          var last = ln[ln.length - 1];

          var space = last.length === 0 ? '' : ' ';

          if ( (word.length + last.length) <= cols ) {
            // add word to last ln
            ln[ln.length - 1] = ln[ln.length - 1].concat(space + word);
          } else {
            // create new ln (if word.lenght > 80, this overflows)
            ln = ln.concat([word]);
          }

          return ln;
        }, ['']);

    return prev.concat(split);

  }, []);

  return formatted.join('\n');

};
