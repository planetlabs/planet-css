var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var gulp = require('gulp');
var sequence = require('run-sequence');
var clean = require('gulp-clean');
var insert = require('gulp-insert');
var less = require('gulp-less');
var gutil = require('gulp-util');
var normalize = require('normalize-css/normalize');
var googleWebFonts = require('gulp-google-webfonts');

var LIB_DIR = './lib/';

// Google Web Font Options
var fontOptions = {
    fontsDir: './assets/fonts',
    cssDir: './',
    cssFilename: 'fonts.less'
};

// Clean lib (dist) folder before processing
gulp.task('clean', function () {
    return gulp.src(LIB_DIR, {read: false})
        .pipe(clean());
});

// Process main less file
gulp.task('main', function() {
  return gulp.src('./main.less')
    .pipe(insert.prepend(normalize))
    .pipe(gulp.dest(LIB_DIR))
    .pipe(less({
      relativeUrls: true,
      plugins: [new LessPluginAutoPrefix(), new LessPluginCleanCSS()]
    }))
    .on('error', function(err) {
      gutil.log('LESS compilation failed: ' + err.message);
      process.exit(1);
    })
    .pipe(gulp.dest(LIB_DIR));
});

// Download fonts from Google Web Fonts and generate css
gulp.task('fonts-google', function () {
    return gulp.src('./fonts.list')
        .pipe(googleWebFonts(fontOptions))
        .pipe(gulp.dest(LIB_DIR));
});

// Move variabes.less file
gulp.task('variables', function() {
  return gulp.src('./variables.less').pipe(gulp.dest(LIB_DIR));
});

// Default Gulp Task
gulp.task('default', function(done) {
  sequence('clean', 'fonts-google', [
    'main',
    'variables'
  ], done);
});