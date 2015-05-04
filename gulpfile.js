var gulp = require('gulp'),
	connect = require('gulp-connect'),
	open = require('opn'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	minifyHTML = require('gulp-minify-html'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-rimraf'),
	usemin = require('gulp-usemin'),
	jade = require('gulp-jade'),
	livereload = require('gulp-livereload');

// connect
gulp.task('connect', function () {
	connect.server({
		root: './app',
		livereload: true
	});
	open('http://shop.local/index.html');
});

// php
gulp.task('php', function () {
	gulp.src('./app/*.php')
});

// html
gulp.task('html', function () {
	gulp.src('./app/*.html')
		.pipe(livereload())
});

// jade
gulp.task('jade', function() {
	gulp.src(['./app/jade/*.jade', '!./app/jade/_*.jade'])
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./app/'))
});

// css
gulp.task('css', function () {
	gulp.src('./app/css/*.css')
		.pipe(livereload())
});

// compile sass
gulp.task('sass', function() {
	return gulp.src('./app/scss/*.scss')
		.pipe(sass({
			noCache: true,
			style: "expanded",
			lineNumbers: true,
			errLogToConsole: true
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 8', 'ie 9'],
			cascade: false
		}))
		.pipe(gulp.dest('./app/css'));
});

// js
gulp.task('js', function () {
	gulp.src('./app/js/*.js')
		.pipe(livereload())
});

// watcher
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(['./app/jade/**/*.jade'], ['jade']);
	gulp.watch(['./app/*.php'], ['php']);
	gulp.watch(['./app/scss/*.scss'], ['sass']);
	gulp.watch(['./app/css/*.css'], ['css']);
	gulp.watch(['./app/js/*.js'], ['js']);
	gulp.watch(['./app/*.html'], ['html','build']);
});

// default task
gulp.task('default', ['connect', 'watch']);


// Build
var path = {
	build: {
		html: './dist/',
		js: './dist/js/',
		jsvendor: './dist/js/vendor/',
		plugins: './dist/plugins/',
		img: './dist/img/',
		fonts: './dist/fonts/'
	},
	src: {
		php: './app/*.php',
		html: './app/*.html',
		js: './app/js/*.js',
		jsvendor: './app/js/vendor/*',
		plugins: './app/plugins/**/*.*',
		img: './app/img/**/*.*',
		fonts: './app/fonts/**/*.*'
	},
	watch: {
		html: './app/*.html',
		php: './app/*.php',
		js: './app/js/**/*.js',
		img: './app/img/**/*.*',
		fonts: './app/fonts/*.*'
	},
	clean: './dist'
};

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(minifyHTML({
			empty:true,
			conditionals:true,
			quotes:true,
			comments:true
		}))
		.pipe(usemin({
			css: [minifyCSS()]
		}))
		.pipe(gulp.dest(path.build.html));
});

gulp.task('php:build', function () {
	gulp.src(path.src.php)
		.pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function () {
	gulp.src(path.src.jsvendor)
		.pipe(gulp.dest(path.build.jsvendor));
	gulp.src(path.src.plugins)
		.pipe(gulp.dest(path.build.plugins));
});

gulp.task('img:build', function () {
	gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img));
});

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
});

// build cleaner
gulp.task('clean', function () {
	return gulp.src('./dist', {read: false})
		.pipe(clean());
});

gulp.task('build', ['html:build','php:build','js:build','img:build','fonts:build']);