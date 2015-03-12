/**
 * gulpfile.js
 * @authors 清泉古雾 (jovex.xu@gmail.com)
 * @date    2015-03-12 21:09:45
 * @version 1.0.0
 */

var gulp = require('gulp');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var concatCss = require('gulp-concat-css');
var rename = require('gulp-rename');
var processhtml = require('gulp-processhtml');
var htmlmin = require('gulp-htmlmin');
var clean = require('gulp-clean');

gulp.task('concatScript', function() {
    return gulp.src([
            'cordova.js',
            'js/index.js',
            'js/jquery-2.1.0.min.js',
            'js/utils.js',
            'js/state.js',
            'js/game.js',
            'js/grid.js',
            'js/tile.js',
            'js/hint.js',
            'js/tutorial.js',
            'js/webfont.js',
            'js/levels.js',
            'js/backgroundservice.js',
            'js/wx-share.js'
        ])
        .pipe(concat('index.min.js', {
            newLine: ';'
        }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('minifyScript', ['concatScript'], function() {
    return gulp.src('./dist/js/index.min.js')

    .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('concatCss', function() {
    return gulp.src(['./css/style.css', 'fonts/fonts.css'])
        .pipe(concatCss('style.min.css'))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minifyCss', ['concatCss'], function() {
    return gulp.src('./dist/style.min.css')
        .pipe(minifyCSS({
            // keepBreaks: true
        }))
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('handleHTML', ['processTHML'], function() {
    return gulp.src('./dist/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('processTHML', function() {
    return gulp.src('./*.html')
        .pipe(processhtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('./dist', {
            read: false
        })
        .pipe(clean());
});

gulp.task('copyImg', function() {
    return gulp.src(['./fonts/*.ttf', './img/*'], {
        })
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('copyFont', function() {
    return gulp.src(['./fonts/*'])
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('default', [
    'minifyScript',
    'minifyCss',
    'handleHTML',
    'copyImg',
    'copyFont'
]);