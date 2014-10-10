module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['mocha'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    autoWatch: true,

    // these are default values anyway
    singleRun: false,
    colors: true,

    files : [
      //3rd Party Code
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',

      //App-specific Code
      'app/app.js',
      'app/scripts/**/*.js',

      //Test-Specific Code
      'test/app/**/*.js'
    ]
  });
};
