var gulp = require('gulp'),
    exec = require('child_process').exec,
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    del = require('del'),
    runSequence = require('run-sequence');

gulp.task('default', function(cb) {
    // place code for your default task here
    runSequence('hugo', ['copy-content-assets', 'compress'], cb);
});

gulp.task('no-hugo', ['copy-content-assets', 'compress']);

gulp.task('watch', ['hugo', 'copy-content-assets', 'webserver'], function (cb) {
    var watcherContent = gulp.watch(['content/**', 'static/**', 'layouts/**', 'data/**', 'config.yml'], ['hugo']);
    watcherContent.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    var watcherAssets = gulp.watch('images/**', ['copy-content-assets']);
    watcherAssets.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('hugo', function (cb) {
    return exec('hugo', function (err) {
        if (err) return cb(err); // return error
        return cb(); // finished task
    });
});

gulp.task('webserver', function() {
    return gulp.src('public')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: false,
            fallback: 'index.html'
        }));
});

gulp.task('copy-content-assets', function () {
    return gulp.src('images/**/*.{jpg,jpeg,gif,png,pdf,doc,docx,mp4,m4v,m4a,mp3}')
        .pipe(gulp.dest('public/images'));
});

gulp.task('compress-js', function() {
    return gulp.src('public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('compress-css', function() {
    return gulp.src('public/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/css'));
});

gulp.task('compress-html', function() {
    return gulp.src('public/**/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('public/'));
});

gulp.task('clean', function (cb) {
    del(['public/**'], cb);
});


gulp.task('compress', ['compress-js', 'compress-css', 'compress-html']);
