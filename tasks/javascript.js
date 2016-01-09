const gulp = require('gulp');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

const config = require('../config');

gulp.task('js:bundle', (callback) => {
    if (config.watching) {
        config.webpack.watch = true;
    }

    return gulp.src('')
        .pipe(plumber())
        .pipe(webpack(config.webpack))
        .pipe(gulp.dest('public/js'));
});

gulp.task('js:minify', () => {
    return gulp.src('public/js/**/*')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
});

gulp.task('js', (callback) => {
    if (config.production) {
        runSequence('js:bundle', 'js:minify', callback);
    }
    
    runSequence('js:bundle', callback);
});
