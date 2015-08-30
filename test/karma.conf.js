/*eslint-env node, mocha */

// Karma configuration

module.exports = function karmaConfig( config ) {
  config.set( {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',

    frameworks: [ 'mocha', 'chai' ],

    // list of files / patterns to load in the browser
    files: [
      'test/jspm_packages/system-polyfills.js',
      'test/jspm_packages/system.js',
      'test/jspm.config.js',
      'test/**/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
      'node_modules/*'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'progress' ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'PhantomJS' ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  } );
};
