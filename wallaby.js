module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      { pattern: './.todoco', instrument: false, load:false, ignore:false },
      { pattern: './.gitignore', instrument: false, load:false, ignore:false },
      { pattern: 'test/**/test-files/**/.*', instrument: false, load:false, ignore: false },
      { pattern: 'test/**/test-files/*.js', instrument: false, load:false, ignore: false }
    ],

    tests: [
      'test/**/*Spec.js'
    ],

    env: {
        type: 'node',
        runner: 'node'
    },

    testFramework: "jasmine"
  };
};
