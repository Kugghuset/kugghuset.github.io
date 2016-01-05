'use strict'

var os = require('os');
var gulp = require('gulp');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var shell = require('shelljs');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel')
var concat = require('gulp-concat');
var open = require('gulp-open');

var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

var jekyll;
// process name for jekyll
var _jekyll = process.platform === 'win32'
  ? 'jekyll.bat'
  : 'jekyll';

// Serve task
gulp.task('serve', function () {
  if (jekyll) { jekyll.kill(); }
  
  // Run the jekyll command with the --config and --incremental flags
  jekyll = spawn(_jekyll, ['serve', '--config', '_config.yml,_config_dev.yml', '--incremental'], { stdio: 'inherit' });
  
  jekyll.on('close', function (code) {
    console.log(code);
  });
});

// Builds the jekyll page with the --config flag set to _config.yml,_config_dev.yml
gulp.task('build', function () {
  
  shell.exec('jekyll build --config _config.yml,_config_dev.yml');
  // Without this, gulp never closes.
  shell.exit(0);
});

gulp.task('babel', function () {
  gulp.src('./assets/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.compiled.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./_site/assets/scripts'))
});

// Super simple task to reload the page on changes.
gulp.task('reload', function () {
  livereload.reload();
});

gulp.task('reload-css', function () {
  livereload.changed('./_site/css/main.css');
});

// Watches for changes in the _site folder, as it is what is served
gulp.task('watch', function () {
  gulp.watch('./_site/**/*.{html}', ['reload']);
  gulp.watch('./assets/**/*.js', ['babel']);
  gulp.watch('./_site/**/*.css', ['reload-css']);
});

gulp.task('open', function () {
  gulp.src(__filename)
    .pipe(open({ uri: 'http://localhost:4000', app: browser }));
});

// Initiate livereload
livereload.listen();

gulp.task('default', ['serve', 'babel', 'watch', 'open']);

// Kill jekyll if it's still running on shut down.
process.on('exit', function () {
  if (jekyll) jekyll.kill();
});