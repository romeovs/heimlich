# Heimlich
> Choking on the same gulp stuff? Use heimlich!

A collection of utilities for gulp.

## Installation
Install the package and add it to your development dependencies:
```bash
npm install --save-dev romeovs/heimlich
```

## Development
Using a local clone requires rebuilding with babel, unless you use the development version:
```bash
ln -s ~/path/to/heimlich/devel node_modules/heimlich
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

- `node v0.12.0` requires [harmonize](https://github.com/dcodeIO/node-harmonize) `> 1.4.1`, currently only available on github.
