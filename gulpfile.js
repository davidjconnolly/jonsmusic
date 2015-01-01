// Include gulp
var gulp = require('gulp');

// Include Plugins
var nodemon = require('gulp-nodemon')
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mocha = require('gulp-spawn-mocha');
var karma = require('gulp-karma');
var haml = require('gulp-ruby-haml');

var paths = {
  api_scripts: ['api/**/*.js'],
  app_scripts: ['app/**/*.js'],
  styles: ['app/styles/**/*.scss'],
  views: ['app/views/**/*.haml'],
  favicon: ['app/public/**/*.ico'],

  vendor_scripts: [
    'bower_components/ng-file-upload-shim/angular-file-upload-html5-shim.min.js',
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
    'bower_components/angular-flash/dist/angular-flash.js',
    'bower_components/underscore/underscore.js',
    'bower_components/angular-underscore/angular-underscore.js',
    'bower_components/angular-ui-select/dist/select.min.js',
    'bower_components/ng-sortable/dist/ng-sortable.js',
    'bower_components/ng-file-upload/angular-file-upload.min.js',
    'bower_components/x2js/xml2json.js',
    'bower_components/angular-x2js/src/x2js.js',
    'bower_components/angular-media-player/dist/angular-media-player.js'
  ],
  vendor_styles: [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/font-awesome/scss/font-awesome.scss',
    'bower_components/angular-ui-select/dist/select.min.css',
    'bower_components/ng-sortable/dist/ng-sortable.min.css',
    'bower_components/ng-sortable/dist/ng-sortable.style.min.css'
  ],
  vendor_fonts: [
    'bower_components/font-awesome/fonts/**/*'
  ],
  vendor_scripts_test: [
    'bower_components/angular-mocks/angular-mocks.js'
  ],
  api_tests: ['test/api/**/*.js'],
  app_tests: ['test/app/**/*.js']
}

// -- JSHint -----------------------------------------------------------------

// Server
gulp.task('jshint-api', function() {
  return gulp.src(paths.api_scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('jshint-test-api', function() {
  return gulp.src(paths.api_tests)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Client
gulp.task('jshint-app', function() {
  return gulp.src(paths.app_scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('jshint-test-app', function() {
  return gulp.src(paths.app_tests)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// -- Compile Assets ---------------------------------------------------------

// Scripts
gulp.task('vendor-scripts', function() {
  return gulp.src(paths.vendor_scripts)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./deploy/public/js'))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./deploy/public/js'));
});
gulp.task('app_scripts', function() {
  return gulp.src(paths.app_scripts)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./deploy/public/js'))
    .pipe(rename('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./deploy/public/js'));
});

// Styles
gulp.task('vendor-styles', function() {
  return gulp.src(paths.vendor_styles)
    .pipe(sass())
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./deploy/public/css'));
});
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass())
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./deploy/public/css'));
});

// Fonts
gulp.task('vendor-fonts', function () {
  return gulp.src(paths.vendor_fonts)
    .pipe(gulp.dest('./deploy/public/fonts'))
});

// Public
gulp.task('icon-public', function () {
  return gulp.src(paths.favicon)
    .pipe(gulp.dest('./deploy/public'))
})

// Views
gulp.task('haml-views', function () {
  return gulp.src(paths.views)
    .pipe(haml())
    .pipe(gulp.dest('./deploy/public/views'))
})

// -- Test ------------------------------------------------------------------

// Server
gulp.task('run-api-tests', function () {
  gulp.src(paths.api_tests, {read: false}).pipe(mocha({
    r: 'test/api/test_helper.js',
    R: 'spec',
    c: true,
    debug: false
  })).on('error', console.warn.bind(console));
});

// Client
gulp.task('run-app-tests', function () {
  gulp.src(paths.vendor_scripts.concat(paths.app_scripts, paths.vendor_scripts_test, paths.app_tests))
    .pipe(karma({
      configFile: 'test/app/karma.conf.js'
    })).on('error', console.warn.bind(console));
});

// -- Watch -----------------------------------------------------------------

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.app_scripts, ['jshint-app', 'app_scripts']);
  gulp.watch(paths.api_scripts, ['jshint-api']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.public, ['haml-public']);
  gulp.watch(paths.public, ['icon-public']);
  gulp.watch(paths.views, ['haml-views']);
});

// -- Sub-Tasks --------------------------------------------------------------

// Nodemon
gulp.task('nodemon', function () {
  nodemon({
    script: 'api/server.js',
    watch: ['app', 'api'],
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
})

// -- Tasks -----------------------------------------------------------------

// Default - Start Server
gulp.task('default', [
  'jshint-api', 'jshint-app',
  'vendor-styles', 'styles',
  'vendor-fonts',
  'vendor-scripts', 'app_scripts',
  'haml-views',
  'watch', 'nodemon'
]);

// Build
gulp.task('build', [
  'vendor-styles', 'styles',
  'vendor-fonts',
  'vendor-scripts', 'app_scripts',
  'haml-views'
]);

// Test
gulp.task('test-api', [
  'jshint-test-api',
  'run-api-tests'
]);
gulp.task('test-app', [
  'jshint-test-app',
  'run-app-tests'
]);

