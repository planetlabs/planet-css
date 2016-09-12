var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var gulp = require('gulp');
var insert = require('gulp-insert');
var less = require('gulp-less');
var gutil = require('gulp-util');
var normalize = require('normalize-css/normalize');

var LIB_DIR = './lib/';

gulp.task('default', function() {
  gulp.src('./main.less')
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
