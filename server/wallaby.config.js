module.exports = function (wallaby) {
  return {
    files: [
      // { pattern: '**/*.js', load: true },
      { pattern: 'lambda-calculus/**/*.js', load: true },
      { pattern: '**/*intro.spec.js', ignore: true },
    ],

    tests: [
      '**/*intro.spec.js'
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