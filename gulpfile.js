var gulp         = require('gulp');
var jshint       = require('gulp-jshint');
var sass         = require('gulp-sass');
var less         = require('gulp-less');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
const shell      = require('gulp-shell');
var livereload   = require('gulp-livereload');
const filter     = require('gulp-filter');
var newer        = require('gulp-newer');
var eslint       = require('gulp-eslint');
var babel        = require('gulp-babel');
var tap          = require('gulp-tap');
var reactify     = require('reactify');
var babelify     = require ('babelify');
var path = require('path');
 


var plugins     = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
  replaceString: /\bgulp[\-.]/
});


//For browserify setup
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var watchify = require('watchify');
var browserify = require('browserify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');



//--------------------------
//     TEST STUFFFF
//--------------------------
// var customOpts = {
//   entries: ['./src/index.js'],
//   debug: true
// };

// var opts = assign({}, watchify.args, customOpts);
// var b = watchify(browserify(opts)); 

// gulp.task('jsb', bundle); // so you can run `gulp js` to build the file
// b.on('update', bundle); // on any dep update, runs the bundler
// b.on('log', gutil.log);

// function bundle() {
//   return b.bundle()
//     // log errors if they happen
//     .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(gulp.dest('./dist'));
// }



// gulp.task('browserify2', function() {
//     console.log("________browserify______");
//     return browserify('process_success/public/js/modules')
//         .bundle()
//         //Pass desired output filename to vinyl-source-stream
//         .pipe(source('bundle.js'))
//         // Start piping stream to tasks!
//         .pipe(gulp.dest('/process_success/public/dist/build/'));
// });



// gulp.task('browserify', function () {
//   console.log("________browserify 2______");
//   //https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-multiple-destination.md
//   return gulp.src('process_success/public/js/modules/**/*.jsx', {read: false}) // no need of reading file because browserify does.
//     // transform file objects using gulp-tap plugin
//     .pipe(tap(function (file) {
//       gutil.log('bundling ' + file.path);
//       console.log('bundling ' + file.path);
//       // replace file contents with browserify's bundle stream
//       file.contents = browserify({
//         extensions: ['.jsx'],
//         entries: file.path,
//         debug: true
//       })
//       .transform(babelify.configure({
//           presets: ['es2015', 'react']
//       }))
//       .bundle();
//     }))
//     .pipe(rename(function (path) {
//       console.log(path);
//       path.extname = ".js";
//     }))
//     .pipe(gulp.dest('process_success/public/js/dist/modules'));
//});
//--------------------------
//     TEST END
//--------------------------

var dev = true;

var dest='process_success/public/dist/';
var bowerpaths={
    paths: {
        bowerDirectory: 'process_success/public/vendor',
        bowerrc: '.bowerrc',
        bowerJson: 'bower.json'
    }
};
//---------------------
//     Manifest
//---------------------
var manifest={
  lib:[
    'process_success/public/js/lib/react.js',
    'process_success/public/js/lib/react-dom.js'
  ],
  modules:[
    'process_success/public//js/modules/**/*.jsx'
  ],
  jsx:[
    'process_success/www/**/*.jsx',
    'process_success/templates/**/*.jsx'
  ],
  less:{
      source:[
        'process_success/public/less/**/*.less'
      ],
      'dest':'process_success/public/css'
  },
  main:[
    'process_success/public/js/core/ps.js',
    'process_success/public/js/core/ps.socket.js',
    'process_success/public/js/core/ps.storage.js',
    'process_success/public/js/core/ps.obj.js',
    'process_success/public/js/core/ps.init_obj.js',
    'process_success/public/js/core/ps.user.js'
  ]
};

//---------------------
//     LESS
//---------------------


gulp.task('less', function () {
  return gulp.src(manifest.less.source)
    .pipe(concat('ps.css'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(manifest.less.dest));
});

//---------------------
//     js scripts
//---------------------


gulp.task('scripts', function() {
    return gulp.src(manifest.main)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('process_success/public/dist'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('process_success/public/dist'));
});

//---------------------
//     Browserfy
//---------------------


gulp.task('browserify', function () {
  console.log("________browserify 2______");
  //https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-multiple-destination.md
  return gulp.src('process_success/www/**/*.jsx', {read: false}) // no need of reading file because browserify does.
    // transform file objects using gulp-tap plugin
    .pipe(tap(function (file) {
      gutil.log('bundling ' + file.path);
      console.log('bundling ' + file.path);
      // replace file contents with browserify's bundle stream
      file.contents = browserify({
        extensions: ['.jsx'],
        entries: file.path,
        debug: true
      })
      .transform(babelify.configure({
          presets: ['es2015', 'react']
      }))
      .bundle();
    }))
    .pipe(rename(function (path) {
      console.log(path);
      path.extname = ".js";
    }))
    .pipe(gulp.dest('process_success/www/'));
});


//---------------------
//     Bower
//---------------------

console.log(plugins.mainBowerFiles(bowerpaths));
gulp.task('js', function() {
  var jsFilter = filter('**/*.js', {restore: true});
  gulp.src(plugins.mainBowerFiles(bowerpaths))
  .pipe(jsFilter)
  .pipe(gulp.dest('process_success/public/js/lib'))
  .pipe(concat('all.js'))
  .pipe(gulp.dest('process_success/public/js/lib'));
});


//---------------------
//     Lint Task
//---------------------

gulp.task('lint', function() {
    console.log('HINT');
    return gulp.src(manifest.main)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('eslint', function() {
  return gulp.src(manifest.modules)
    .pipe(eslint({
        "plugins": [
          "react"
        ],
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


//---------------------
//     LIB FIles
//---------------------

gulp.task('copy-react', function() {
  return gulp.src('node_modules/react/dist/react.js')
    .pipe(newer('process_success/public/js/lib/react.js'))
    .pipe(gulp.dest('process_success/public/js/lib/'));
});

gulp.task('copy-react-dom', function() {
  return gulp.src('node_modules/react-dom/dist/react-dom.js')
    .pipe(newer('process_success/public/js/lib/react-dom.js'))
    .pipe(gulp.dest('process_success/public/js/lib/'));
});



gulp.task('lib', ['copy-react', 'copy-react-dom'], function() {
  return gulp.src(manifest.lib)
    //.pipe(sourcemaps.init())
    // .pipe(babel({
    //   plugins: ['transform-react-jsx'],
    //   only: [
    //     'process_success/public/modules',
    //   ],
    //   compact: false
    // }))
    .pipe(concat('lib.js'))
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('process_success/public/dist'));
});



gulp.task('clearCache', () => {
  return gulp.src('', {read: false})
  .pipe(shell([
    './scripts/clear_cache.sh',
    'pwd'],{cwd:''}))
  .pipe(livereload());

});


gulp.task('watch', function() {
	livereload.listen();
  gulp.watch([
    'process_success/public/js/core/**/*.js',
    'process_success/template/**/*.js',
    'process_success/www/**/*.js',
    'process_success/public/**/*.js',
    'process_success/public/**/*.css',
    'process_success/**/*.js',
    'process_success/**/*.html',
    'process_success/**/*.template',
    'process_success/template/**/*.css',
    'process_success/**/*.css',
    'process_success/**/*.py' ], ['clearCache']
  );
  gulp.watch(['process_success/public/js/**/*.jsx','process_success/public/js/**/*.js'], ['scripts']);
  gulp.watch([manifest.less.source], ['less']);
  gulp.watch(['process_success/www/**/*.jsx',manifest.modules],['browserify']);
});

// Default Task
gulp.task('default', ['browserify','lib','lint','scripts','js','less','clearCache','watch']);


//https://travismaynard.com/writing/getting-started-with-gulp
