const { src, dest, series, watch, parallel } = require('gulp');

const gulpWebpack = require('webpack-stream'),
	gulpBabel = require('gulp-babel'),
	gulpPug = require('gulp-pug'),
	gulpUglifyJs = require('gulp-uglify'),
	gulpScss = require('gulp-sass')(require('sass')),
	gulpBrowserSync = require('browser-sync').create();

const webpackConfig = require('./webpack.config.js');

const path = {
	src: {
		html: './src/**/*.html',
		pug: './src/**/*.pug',
		scss: './src/scss/**/*.scss',
		js: './src/js/**/*.js',
		fonts: './src/fonts/**/*.+(woff2|woff|svg|ttf|otf|eot)',
		favicon: './src/images/favicon/**/*'
	}
}

function pug() {
	return src('./src/*.pug')
		.pipe(gulpPug({
			pretty: true
		}))
		.pipe(dest('./build/'));
}

function fonts() {
	return src(path.src.fonts, { encoding: false })
		.pipe(dest('./build/fonts/'));
}

function scss() {
	return src(path.src.scss)
		.pipe(gulpScss())
		.pipe(dest('./build/css/'));
}

function js() {
	return src(webpackConfig.entry)
		.pipe(gulpWebpack( webpackConfig))
		.pipe(gulpBabel({
			presets: ['@babel/preset-env'],
			targets: {
				"chrome": "58",
				"ie": "11"
			}
		}))
		.pipe(gulpUglifyJs())
		.pipe(dest(webpackConfig.output.path));
}

function static() {
	return src('./src/static/**/*', { encoding: false })
		.pipe(dest('./build/'));
}

function favicon() {
	return src('./src/images/favicon/**/*', { encoding: false })
		.pipe(dest('./build/favicon/'));
}

function watcher() {
	watch([path.src.pug], pug).on('change', gulpBrowserSync.reload);
	watch([path.src.scss], scss).on('change', gulpBrowserSync.reload);
	watch([path.src.js], js).on('change', gulpBrowserSync.reload);
	watch([path.src.fonts], fonts).on('change', gulpBrowserSync.reload);
	watch([path.src.favicon], favicon).on('change', gulpBrowserSync.reload);
}

function browserSync() {
	gulpBrowserSync.init({
		server: {
			baseDir: 'build/'
		},
		notify: false
	});
}

exports.pug = pug;
exports.scss = scss;
exports.fonts = fonts;
exports.js = js;
exports.favicon = favicon;
exports.static = static;
exports.watcher = watcher;
exports.browserSync = browserSync;

exports.build = series(pug, scss, fonts, js, static, favicon);
exports.default = series(pug, scss, fonts, js, static, favicon, parallel(browserSync, watcher));
