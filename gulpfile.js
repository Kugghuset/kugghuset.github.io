var gulp = require('gulp');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

var jekyll;
// process name for jekyll - 
var _jekyll = process.platform === 'win32'
  ? 'jekyll.bat'
  : 'jekyll';

gulp.task('serve', function () {
  if (jekyll) { jekyll.kill(); }
  
  jekyll = spawn(_jekyll, ['serve'], { stdio: 'inherit' });
  
  jekyll.on('close', function (code) {
    console.log(code);
  });
});

gulp.task('watch', function () {
  gulp.watch(['*'], ['serve']);
});

gulp.task('default', ['serve']);

process.on('exit', function () {
  if (jekyll) jekyll.kill();
})