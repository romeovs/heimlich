# Heimlich
A collection of utilities for gulp.

## `heimlich.alert`

`alert` is a small wrapper around
[`gulp-plumber`](https://github.com/floatdrop/gulp-plumber).  It basically just
configures `gulp-plumber` to play a sound when an error occurs in the `gulp`
pipeline, and it cleans up the error output to match the `gulp` log style.

### usage
```
var gulp     = require('gulp')
  , heimlich = reqreui('heimlich');

gulp.src('./src/file.ext')
    .pipe(heimlich.alert())
    .pipe(/* other plugin */)
    // etc.
```

`alert` will look for a shell command named `beep` and call this
to play the alert sound.

### options

#### `options.silent`
Set this to `true` to make `alert` silent.  It will not play a beep
sound anymore.  Defaults to `false`.

#### `options.print`
Set this to `false` to shut up `alert`.  It will not print any error
message anymore.  Defaults to `true`.


