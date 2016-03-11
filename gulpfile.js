var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var insert = require('gulp-insert');
var less = require('gulp-less');
var normalize = require('normalize-css/normalize');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

var SRC_DIR = './src/';
var BUILD_DIR = './build/';
var DIST_DIR = './dist/';

/**
 * Tasks for generating markup and stylesheets in development/debug mode.
 */

gulp.task('dev-markup', function() {
  return gulp.src(SRC_DIR + 'index.html')
      .pipe(gulp.dest(BUILD_DIR))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('dev-style', function() {
  var stream = gulp.src(SRC_DIR + 'planet.less')
      .pipe(sourcemaps.init())
      .pipe(insert.prepend(normalize))
      .pipe(less({
        relativeUrls: true,
        plugins: [new LessPluginAutoPrefix()]
      }))
      .on('error', function(err) {
        gutil.log('LESS compilation failed: ' + err.message);
        browserSync.notify(err.message, 30000);
        stream.end();
      })
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(BUILD_DIR))
      .pipe(browserSync.reload({stream: true}));
  return stream;
});

gulp.task('dev-build', ['dev-markup', 'dev-style']);

gulp.task('dev-serve', ['dev-build'], function() {
  browserSync({
    server: {
      baseDir: BUILD_DIR
    },
    open: false,
    ghostMode: false
  });
});

gulp.task('dev', ['dev-serve'], function() {
  gulp.watch(SRC_DIR + '**/*.less', ['dev-style']);
  gulp.watch(SRC_DIR + '**/*.html', ['dev-markup']);
});

/**
 * Tasks for generating stylesheets for distribution/deployment.
 */

gulp.task('dist', function() {
  gulp.src(SRC_DIR + 'planet.less')
      .pipe(insert.prepend(normalize))
      .pipe(gulp.dest(DIST_DIR))
      .pipe(less({
        relativeUrls: true,
        plugins: [new LessPluginAutoPrefix(), new LessPluginCleanCSS()]
      }))
      .on('error', function(err) {
        gutil.log('LESS compilation failed: ' + err.message);
        process.exit(1);
      })
      .pipe(gulp.dest(DIST_DIR));
});
