'use strict';

Array.prototype.last = function(el) {
  if ( el ) {
    this[this.length - 1] = el;
  }
  return this[this.length - 1];
};


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
        words.reduce(function(prev, word) {
          var last   = prev.last();
          var lenght = last.length;

          var space = last.length === 0 ? '' : ' ';

          if ( (word.length + last.length) <= cols ) {
            // add word to last line
            prev.last(last.concat(space + word));
          } else {
            // create new line (if word.lenght > 80, this overflows)
            prev = prev.concat([word]);
          }

          return prev;
        }, ['']);

    return prev.concat(split);

  }, []);

  return formatted.join('\n');

};
