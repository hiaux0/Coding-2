var wallabyWebpack = require('wallaby-webpack');

var webpackConfig = require('./webpack.config');
var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
  return {
    files: [
      // { pattern: '**/*.js', load: true },
      { pattern: 'src/**/*.js', load: false },
      { pattern: 'src/**/*.spec.js', ignore: true },
    ],

    tests: [
      { pattern: 'src/**/*.spec.js', load: true },
      { pattern: 'node_modules/', ignore: true }
    ],
    env: {
      type: 'browser'
    },
    postprocessor: wallabyPostprocessor,

    debug: true,
    testFramework: "jasmine",
    compilers: {
      // '**/*.js': wallaby.compilers.babel({
      //   // babelrc: true,
      //   presets: ['es2015-loose', 'stage-1'],
      //   plugins: ['transform-decorators-legacy']
      // })
      '**/*.js': wallaby.compilers.babel({
        babelrc: true,
        presets: ['es2015', 'stage-1'],
        plugins: [
          "transform-decorators-legacy",
          "transform-class-properties",
        ]
      })
    },
  };
};
