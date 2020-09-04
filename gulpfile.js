"use strict";

const { series, parallel, src, dest, watch } = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { sync } = require("del");
sass.compiler = require("node-sass");
const server = require("browser-sync").create();

function reload(cb) {
  server.reload();
  cb();
}

function serve(cb) {
  server.init({
    server: {
      baseDir: "./build",
    },
  });
  cb();
}

function watchFiles() {
  watch("src/scss/**/*.scss", css);
  watch("src/js/*.js", series(javascript, reload));
  watch("src/*.html", series(html, reload));
}

function clean(cb) {
  del.sync("build/");
  cb();
}

function html() {
  return src("src/*.html").pipe(dest("build/"));
}

function css() {
  return src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css/"))
    .pipe(server.stream());
}

function javascript() {
  return src("src/js/*.js")
    .pipe(dest("build/js/"));
}

const dev = series(clean, html, javascript, css, serve, watchFiles);
exports.default = dev;
