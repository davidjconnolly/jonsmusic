// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var nodemon = require('gulp-nodemon')
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var paths = {
  scripts: [
    'app/app.js',
    'app/scripts/services/*.js',
    'app/scripts/directives/*.js',
    'app/scripts/controllers/*.js'
  ],
  vendor_scripts: [
    'bower_components/angular/angular.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-moment/angular-moment.js',
    'bower_components/moment/moment.js'
  ],
  styles: [
    'app/styles/**/*.scss'
  ],
  vendor_styles: [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/font-awesome/scss/font-awesome.scss'
  ],
  vendor_fonts: [
    'bower_components/font-awesome/fonts/**/*'
  ],
  views: [
    'app/views/**/*'
  ],
  public: [
    'app/public/**/*'
  ]
}

// Lint Task
gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Scripts
gulp.task('vendor-scripts', function() {
  return gulp.src(paths.vendor_scripts)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(rename('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});


// Styles
gulp.task('vendor-styles', function() {
  return gulp.src(paths.vendor_styles)
    .pipe(sass())
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/css'));
});
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass())
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./public/css'));
});

// Fonts
gulp.task('vendor-fonts', function () {
  return gulp.src(paths.vendor_fonts)
    .pipe(gulp.dest('./public/fonts'))
});

// Public
gulp.task('html-public', function () {
  return gulp.src(paths.public)
    .pipe(gulp.dest('./public'))
})

// Views
gulp.task('html-views', function () {
  return gulp.src(paths.views)
    .pipe(gulp.dest('./public/views'))
})

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['jshint', 'scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.public, ['html-public']);
  gulp.watch(paths.views, ['html-views']);
});

// Nodemon
gulp.task('nodemon', function () {
  nodemon({
    script: 'api/server.js',
    watch: ['api'],
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
})

// Default Task
gulp.task('default', [
  'jshint', 'watch', 'nodemon',
  'vendor-scripts', 'scripts',
  'vendor-styles', 'styles',
  'vendor-fonts',
  'html-public', 'html-views'
]);
