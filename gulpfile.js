'use strict'

var gulp = require('gulp');
var spawn = require('child_process').spawn;
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

// Super simple task to reload the page on changes.
gulp.task('reload', function () {
  livereload.reload();
});

// Watches for changes in the _site folder, as it is what is served
gulp.task('watch', function () {
  gulp.watch(['./_site/**/*.html'], ['reload']);
});

// Initiate livereload
livereload.listen();

gulp.task('default', ['serve', 'watch']);

// Kill jekyll if it's still running on shut down.
process.on('exit', function () {
  if (jekyll) jekyll.kill();
});