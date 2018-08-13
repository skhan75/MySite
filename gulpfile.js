const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss',
      'src/scss/*.scss']) // Take all the bootstrap sass file
        .pipe(sass()) // Compile it
        .pipe(gulp.dest("src/css")) // place the compiled css it under src/css in our project
        .pipe(browserSync.stream()); // And refresh the browser
});

// 2. Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// 3. The serve task launches a simple server and watches our sass files,
// and if any are changed, it calls the sass task.
// It also calls browser-sync when any * .html file is saved.
gulp.task('serve', ['sass'], function() {

    // Launch a local host on port 3000
    browserSync.init({
        server: "./src"
    });

    // Its going to watch for any changes
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// 1. When we type gulp in the command line,
// this is telling it to run both the js and serve tasks.
gulp.task('default', ['js', 'serve']);
