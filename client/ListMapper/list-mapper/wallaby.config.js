// var wallabyWebpack = require('wallaby-webpack');

// var webpackConfig = require('./webpack.config');
// var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
  return {
    files: [
      // { pattern: '**/*.js', load: true },
      { pattern: 'src/**/modules/*.js', load: false },
      { pattern: 'src/**/modules/**/*.spec.js', ignore: true },
    ],

    tests: [
      { pattern: 'src/**/modules/**/*.spec.js', load: true },
    ],
    env: {
      type: 'node'
    },
    // postprocessor: wallabyPostprocessor,

    debug: true,
    testFramework: "jasmine",
    compilers: {
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
