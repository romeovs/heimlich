# Heimlich
> Choking on on the same gulp stuff?

A collection of utilities for gulp.

## Installation
Install the package and add it to your development dependencies:
```
npm install --save-dev romeovs/heimlich
```

## Utilities
- [`heimlich.alert`](#heimlichalert)
- [`heimlich.dest`](#heimlichdest)

### `heimlich.alert`

`alert` is a small wrapper around
[`gulp-plumber`](https://github.com/floatdrop/gulp-plumber).  It basically just
configures `gulp-plumber` to play a sound when an error occurs in the `gulp`
pipeline, and it cleans up the error output to match the `gulp` log style.

#### Usage
```
var gulp     = require('gulp')
  , heimlich = require('heimlich');

gulp.src('./src/file.ext')
    .pipe(heimlich.alert())
    .pipe(/* other plugin */)
    // etc.
```

#### Options

##### `options.silent`
Set this to `true` to make `alert` silent.  It will not play a beep
sound anymore.  Defaults to `false`.

##### `options.print`
Set this to `false` to shut up `alert`.  It will not print any error
message anymore.  Defaults to `true`.

##### `options.command`
The name of the shell command `alert` looks for to play the error sound.
Defaults to `"beep"`.


### `heimlich.dest`
A really simple tool: combines `gulp.dest` with `path.join` so you never
have to use `+` to join paths ever again.

#### Usage
```
var gulp     = require('gulp')
  , heimlich = require('heimlich');

gulp.src('./src/file.ext')
    .pipe(heimlich.dest('out', 'files', 'folder'))
    // pipes files to out/files/folder
```
