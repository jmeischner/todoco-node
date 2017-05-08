module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      { pattern: 'test/**/test-files/**/.*', instrument: false, load:false, ignore: false }
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