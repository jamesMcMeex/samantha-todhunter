'use strict';

const gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    data = require('gulp-data');

// clean up the build folder
gulp.task('clean', function() {
    return del(['build']);
});

// TODO - write a task to copy and minify third-party CSS files

// copy third-party CSS files
gulp.task('css-copy', function() {
    return del(['build/css']), gulp.src('node_modules/flexslider/flexslider.css')
        .pipe(gulp.dest('build/css'));
});

// copy and minify third-party CSS files
gulp.task('css-copy-minify', function() {
    return del(['build/css']), gulp.src('node_modules/flexslider/flexslider.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('build/css'));
});

// copy third-party JS files
gulp.task('js-copy', function() {
    return del(['build/js']), gulp.src(['node_modules/flexslider/jquery.flexslider.js', 'app/js/scripts.js'])
        .pipe(gulp.dest('build/js'));
});

// copy and minify third-party JS files
gulp.task('js-copy-minify', function() {
    return del(['build/js']), gulp.src(['node_modules/flexslider/jquery.flexslider.js', 'app/js/scripts.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// copy image files
gulp.task('img-copy', function() {
    return del(['build/img']), gulp.src(['app/img/**/*', 'app/svg/**/*'])
        .pipe(gulp.dest('build/img'));
});

// copy compressed image files
gulp.task('img-compress-copy', function() {
    return del(['build/img']), gulp.src(['app/img/**/*', 'app/svg/**/*'])
        .pipe(imagemin([
            imagemin.jpegtran({
                progressive: true,
                optimizationLevel: 3
            }),
        ]))
        .pipe(gulp.dest('build/img'));
});

// copy docs
gulp.task('docs-copy', function() {
    return del(['build/docs']), gulp.src('app/docs/**/*')
        .pipe(gulp.dest('build/docs'));
});

// copy font files
gulp.task('font-copy', function() {
    return del(['build/fonts']), gulp.src(['app/fonts/**/*', 'node_modules/flexslider/fonts/*'])
        .pipe(gulp.dest('build/fonts'));
});

// nunjucks template compiling stuff
gulp.task('nunjucks', function() {
    // Get .html and .nunjucks files in pages
    return gulp.src('app/pages/**/*.+(html|nunjucks)')
    // get all the data
        .pipe(data(function() {
            return require('./app/data/data.json');
        }))
    // Render templates with nunjucks
        .pipe(nunjucksRender({
            path: ['app/templates']
        }))
        .pipe(gulp.dest('build'));
});

// sass preprocessing - expanded
gulp.task('sass-expanded', function() {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('build/css'));
});

// sass preprocessing - compressed
gulp.task('sass-compressed', function() {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('build/css'));
});

// concatenate javascript
gulp.task('scripts', function(cb) {
    // TODO - use pump elsewhere
    pump([
        gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/popper.js/dist/umd/popper.js', 'node_modules/bootstrap/dist/js/bootstrap.js']),
        concat('frameworks.js'),
        gulp.dest('build/js')
    ],
    cb
    );
});

// concatenate and minify javascript
gulp.task('scripts', function(cb) {
    pump([
        gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js']),
        concat('frameworks.js'),
        gulp.dest('build/js')
    ],
    cb
    );
});

// watch
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass-expanded']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch(['app/templates/**/*.nunjucks', 'app/pages/*.+(html|nunjucks)'], ['nunjucks']);
    gulp.watch('app/img/**/*', ['img-copy']);

});

// browser sync task
gulp.task('browser-sync', ['default'], function() {
    var files = [
        'app/templates/**/*.nunjucks',
        'app/img/**/*',
        'app/sass/**/*.scss',
        'app/js/**/*.js',
        'build/**/*'
    ];
    // initialise browserSync server
    browserSync.init(files, {
        server: {
            baseDir: 'build',
            index: 'index.html',
            reloadDelay: 9000
        }
    });
    // watch any files in build, reload on change
    gulp.watch(['build/**']).on('change', browserSync.reload);
});

// Default gulp task
gulp.task('default', ['clean'], function() {
    gulp.start('css-copy', 'js-copy', 'img-copy', 'docs-copy', 'font-copy', 'sass-expanded', 'scripts', 'nunjucks');
});

// Prepare site for shipping
gulp.task('ship', ['clean'], function() {
    gulp.start('css-copy-minify', 'js-copy-minify', 'img-compress-copy', 'docs-copy', 'font-copy', 'sass-compressed', 'scripts', 'nunjucks');
});
