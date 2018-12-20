module.exports = function (wallaby) {
  return {
    files: [
      // { pattern: '**/*.js', load: true },
      { pattern: 'modules/**/*.js', load: true },
      { pattern: 'modules/**/*spec.js', ignore: true },
    ],

    tests: [
      'modules/**/*.spec.js'
    ],
    testFramework: "jasmine",
    env: {
      type: 'node',
      runner: 'node'
    }
    // for node.js tests you need to set env property as well
    // https://wallabyjs.com/docs/integration/node.html
  };
};