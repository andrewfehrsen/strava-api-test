const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

const nunjucksRender = require('gulp-nunjucks-render');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('default', ['bootstrap', 'sass', 'nunjucks', 'browser-sync'], function () {
});

// Compile bootstrap into CSS & auto-inject into browsers
gulp.task('bootstrap', function () {
	return gulp.src("app/bootstrap/**/*.scss")
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src("app/scss/**/*.scss")
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.stream());
});

gulp.task('nunjucks', function() {
	// Gets .html and .nunjucks files in pages
	return gulp.src("app/pages/**/*.+(html|nunjucks)")
		// Renders template with nunjucks
		.pipe(nunjucksRender({
			path: ["app/templates"]
		}))
		// output files in app folder
		.pipe(gulp.dest("app"))
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
		files: ["app/**/*.*"],
		browser: "safari",
		port: 7000,
	});

	gulp.watch("app/bootstrap/**/*.scss", ['bootstrap']);
	gulp.watch("app/scss/**/*.scss", ['sass']);
	gulp.watch("app/pages/**/*.+(html|nunjucks)", ['nunjucks']);
	gulp.watch("app/templates/**/*.+(html|nunjucks)", ['nunjucks']);
	gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});