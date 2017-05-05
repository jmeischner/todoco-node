module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js'
    ],

    tests: [
      'test/**/*Spec.js'
    ],

    env: {
        type: 'node',
        runner: 'node'
    },

    testFramework: 'jasmine'
  };
};