const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

// File moving tasks
gulp.task('moveJquery', () => {
    return gulp.src('node_modules/jquery/dist/*.js')
        .pipe(gulp.dest('js/lib'));
});
gulp.task('moveRequire', () => {
    return gulp.src('node_modules/requirejs/require.js')
        .pipe(gulp.dest('js/lib'))
});
gulp.task('moveTextJs', () => {
    return gulp.src('node_modules/requirejs-text/text.js')
        .pipe(gulp.dest('js/lib'));
});

// Typescript tasks
gulp.task('scripts', () => {
    const tsResult = tsProject.src()
    .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist'));
});
gulp.task('watch', ['scripts'], () => {
    gulp.watch('api/nodejs/**/*.ts', ['scripts']);
});


gulp.task('default', ['moveJquery', 'moveRequire', 'moveTextJs']);