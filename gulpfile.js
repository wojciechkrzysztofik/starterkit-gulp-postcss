
'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');

// Run webserver
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      port: '8000',
      livereload: true,
      open: true
    }));
});

// Compile css
gulp.task('css', function () {
    var postcss    = require('gulp-postcss');
    var cssnext = require("postcss-cssnext");

    return gulp.src('src/stylesheets/**/*.css')
        .pipe( sourcemaps.init() )
        .pipe(postcss([require('precss'), require('postcss-cssnext')]))
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('assets/stylesheets/') )
        .pipe(notify({
            title: "CSS compiled successfully",
            message: "Jupi!",
            onLast: true
        }));
});

// Build scripts
gulp.task('scripts', function () {
  return gulp.src('src/scripts/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('assets/scripts/'))
      .pipe(notify({
          title: "JavaScript builded successfully",
          message: "Jupi!",
          onLast: true
      }));
});

// Watch changes
gulp.task('watch', function () {
    gulp.watch('src/stylesheets/**/*.css', ['css']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    return gulp.start(['webserver']);
});

gulp.task('default', function() {
    gulp.start(['watch']);
});
