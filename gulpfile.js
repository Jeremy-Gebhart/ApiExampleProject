var gulp = require('gulp');

gulp.task('moveJquery', function() {
    return gulp.src('node_modules/jquery/dist/*.js')
        .pipe(gulp.dest('js/lib'));
});

gulp.task('moveRequire', function() {
    return gulp.src('node_modules/requirejs/require.js')
        .pipe(gulp.dest('js/lib'))
});

gulp.task('moveTextJs', function() {
    return gulp.src('node_modules/requirejs-text/text.js')
        .pipe(gulp.dest('js/lib'));
});

gulp.task('default', ['moveJquery', 'moveRequire', 'moveTextJs']);