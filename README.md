# Heimlich
> Choking on the same gulp stuff? Use heimlich!

A collection of utilities for gulp.

## Installation
Install the package and add it to your development dependencies:
```sh
npm install --save-dev romeovs/heimlich
```


## Utilities
- [`heimlich.alert`](https://github.com/romeovs/heimlich/wiki/heimlich.alert)
- [`heimlich.dest`](https://github.com/romeovs/heimlich/wiki/heimlich.alert)
- [`heimlich.browserify`](https://github.com/romeovs/heimlich/wiki/heimlich.browserify)
- [`heimlich.reactify`](https://github.com/romeovs/heimlich/wiki/heimlich.reactify)
- [`heimlich.flag`](https://github.com/romeovs/heimlich/wiki/heimlich.flag)
    - `heimlich.production`
    - `heimlich.lint`


## Caveats

- `node v0.12.0` requires [`harmonize`](https://github.com/dcodeIO/node-harmonize) `> 1.4.1`, currently only available on github.

## Contributing
Heimlich uses a lot of ES6 features that are not in `node` yet.  Therefore the project
needs to be transpiled to `node`-compatible javascript using [`babel`](https://babeljs.io).

This is done automatically when the package is installed using `npm` but during development
you need to do this yourself.

There is already a `gulp` task just for this, just run 
```sh
gulp watch
```
when you start developing and it will rebuild everything when somthing
is changed.  You can then just use `npm link` or something like that
to have the local development version of `heimlich`.

This is the preferable method because this is as close as possible
to how the code will be used in development.

Another method uses polyfills to create the same effect but is less preferable
because it deviates more from how the code will be used in production.  To use
the devel build in another project use:
```sh
ln -s ~/path/to/heimlich/devel node_modules/heimlich
```



