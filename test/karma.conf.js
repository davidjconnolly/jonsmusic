module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['mocha', 'chai'],
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    autoWatch: true,

    // these are default values anyway
    singleRun: false,
    colors: true,

    files : [
      //3rd Party Code
      'bower_components/angular/angular.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-http-auth/src/http-auth-interceptor.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-moment/angular-moment.js',

      'bower_components/angular-mocks/angular-mocks.js',

      //App-specific Code
      'app/app.js',
      'app/scripts/**/*.js',

      //Fixtures
      'test/app/fixtures.js',
      'test/app/fixtures/*.js',

      //Test-Specific Code
      'test/app/controllers/*.js'
    ]
  });
};
