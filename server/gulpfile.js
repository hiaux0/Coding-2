var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('default', ['watch']);

gulp.task('jasmine', function () {
  gulp.src('**/*.spec.js')
    .pipe(jasmine())
});

gulp.task('watch', function () {
  gulp.watch(['**/*.spec.js'], function (event) {
    gulp.run('jasmine');
  });
});