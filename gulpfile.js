// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var nodemon = require('gulp-nodemon')
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var dependencies = {
  js: [
    'bower_components/angular/angular.js',
    'bower_components/angular-bootstrap/ui-bootstrap.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-route/angular-route.js'
  ],
  css: [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/font-awesome/scss/font-awesome.scss',
  ],
  fonts: [
    'bower_components/font-awesome/fonts/**/*'
  ],
  views: [
    'app/views/**/*'
  ]
}

// Nodemon
gulp.task('nodemon', function () {
  nodemon({
    script: 'api/server.js',
    watch: ['api', 'app'],
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
})

// Lint Task
gulp.task('lint', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(rename('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});
gulp.task('vendor-scripts', function() {
  return gulp.src(dependencies.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

// Styles
gulp.task('styles', function() {
  return gulp.src('app/styles/**/*.scss')
    .pipe(sass())
    .pipe(concat('application.css'))
    .pipe(gulp.dest('./public/css'));
});
gulp.task('vendor-styles', function() {
  return gulp.src(dependencies.css)
    .pipe(sass())
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/css'));
});

// Fonts
gulp.task('vendor-fonts', function () {
  return gulp.src(dependencies.fonts)
    .pipe(gulp.dest('./public/fonts'))
});

// Views
gulp.task('views', function () {
  return gulp.src(dependencies.views)
    .pipe(gulp.dest('./public/views'))
})

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('app/scripts/**/*.js', ['lint', 'scripts']);
 gulp.watch('app/styles/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', [
  'lint',
  'styles', 'vendor-styles',
  'scripts', 'vendor-scripts',
  'vendor-fonts',
  'views',
  'watch', 'nodemon'
]);
