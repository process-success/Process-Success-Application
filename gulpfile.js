var gulp = require('gulp');
//var jshint = require('gulp-jshint');
//var sass = require('gulp-sass');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var rename = require('gulp-rename');
const shell = require('gulp-shell');
var livereload= require('gulp-livereload');


gulp.task('clearCache', shell.task([
		'pwd',
		'./script.sh'
		],{cwd:''})

);


gulp.task('clearCache2', () => {
  return gulp.src('', {read: false})
  .pipe(shell([
    './scripts/clear_cache.sh',
    'pwd'],{cwd:''}))
  .pipe(livereload());

})


gulp.task('watch', function() {
	livereload.listen();
    gulp.watch(['process_success/templates/**','process_success/www/**' ], ['clearCache2']);

});
// Default Task
gulp.task('default', ['watch','clearCache2']);


//https://travismaynard.com/writing/getting-started-with-gulp
