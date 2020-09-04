"use strict";

const { series, parallel, src, dest, watch } = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
sass.compiler = require("node-sass");

function clean(cb) {
  del.sync('build/');
  cb();
}

function html() {
  return src("src/*.html")
    .pipe(dest("build/"));
}

function css() {
  return src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css/"));
}

function javascript() {
  return src("src/js/*.js")
    .pipe(dest("build/js/"));
}

exports.html = html;
exports.css = css;
exports.javascript = javascript;
exports.default = series(clean, parallel(html, css, javascript));
