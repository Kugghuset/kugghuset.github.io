'use strict'

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var shell = require('shelljs');
var livereload = require('gulp-livereload');

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

// Super simple task to reload the page on changes.
gulp.task('reload', function () {
  livereload.reload();
});

gulp.task('reload-css', function () {
  livereload.changed('./_site/css/main.css');
});

// Watches for changes in the _site folder, as it is what is served
gulp.task('watch', function () {
  gulp.watch('./_site/**/*.{html,js}', ['reload']);
  gulp.watch('./_site/**/*.css', ['reload-css']);
});

// Initiate livereload
livereload.listen();

gulp.task('default', ['serve', 'watch']);

// Kill jekyll if it's still running on shut down.
process.on('exit', function () {
  if (jekyll) jekyll.kill();
});