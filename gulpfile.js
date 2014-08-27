var gulp = require('gulp'),
    path = require('path'),
    jshint = require('gulp-jshint'),
    csslint = require('gulp-csslint'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    paths = {

      src: {
        js    : './src/js/*.js',
        sass  : './sass',
        sass_files : './sass/*.scss' 
      },

      dist : {
        js  : './dist/js',
        css : './dist/css'
      }

    };

/**
  Concat & Minify Task
*/
gulp.task('compress', function() {
    /* Gera o arquivo JS concatenado */
    gulp.src(paths.src.js)
        .pipe(uglify())
        .pipe(rename('slider.min.js'))
        .pipe(gulp.dest(paths.dist.js));
});

/**
  JSHint Task
*/
gulp.task('jshint', function() {
    gulp.src(paths.src.js)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

/**
  CSSLint Task
*/
gulp.task('csslint', function() {
    gulp.src(paths.dist.css + '/*.css').pipe(csslint('.csslintrc')).pipe(csslint.reporter());
});


/**
  COMPASS Task
*/
gulp.task('compass', function() {
    gulp.src(paths.src.sass_files)
        .pipe(compass({
            config_file: './config.rb',
            css: paths.dist.css,
            sass: paths.src.sass
        }))
        .pipe(gulp.dest('./dist/css'));
});

/**
  WATCH Task
*/
gulp.task('watch', function() {
    gulp.watch( paths.src.js, ['compress','jshint'] );
    gulp.watch(paths.src.sass_files, ['compass', 'csslint']);
});

/**
  WATCH Test
*/
gulp.task('test', ['jshint','csslint']);

/**
  WATCH Build
*/
gulp.task('build', ['compress','compass']);


/**
  WATCH Deploy
*/
gulp.task('deploy', ['test','build']);