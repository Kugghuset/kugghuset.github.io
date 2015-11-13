var gulp = require('gulp');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var livereload = require('gulp-livereload');

var jekyll;
// process name for jekyll - 
var _jekyll = process.platform === 'win32'
  ? 'jekyll.bat'
  : 'jekyll';

gulp.task('serve', function () {
  if (jekyll) { jekyll.kill(); }
  
  jekyll = spawn(_jekyll, ['serve', '--config', '_config.yml,_config_dev.yml'], { stdio: 'inherit' });
  
  jekyll.on('close', function (code) {
    console.log(code);
  });
});

gulp.task('reload', function () {
  livereload.reload();
});

gulp.task('watch', function () {
  gulp.watch(['./_site/**/*'], ['reload']);
});

livereload.listen();
gulp.task('default', ['serve', 'watch']);

process.on('exit', function () {
  if (jekyll) jekyll.kill();
});