var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

var paths = {
  sass: ['./scss/**/*.scss'],
  script: ['./www/js/**/*.js']
};

gulp.task('default', ['concat-scripts']);

gulp.task('jshint', function() {
  return gulp.src('./www/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('concat-scripts', ['jshint'], function () {
  return gulp.src(paths.script)
    .pipe(concat('poc.all.js'))
    .pipe(gulp.dest('www/build/script'));
});

gulp.task('watch', function() {
  gulp.watch(paths.script, ['concat-scripts']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('build', function () {
  return gulp.src(paths.script)
    .pipe(ngAnnotate({
      single_quotes: true,
      add: true,
      remove: true
    }))
    .pipe(uglify())
    .pipe(concat('poc.min.js'))
    .pipe(gulp.dest('www/build/script'));
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
