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
const babel = require("gulp-babel");
const server = require("browser-sync").create();

const paths = {
  html: {
    input: "src/*.html",
    output: "build/",
  },
  scripts: {
    input: "src/js/*.js",
    output: "build/js/",
  },
  css: {
    input: "src/scss/**/*.scss",
    output: "build/css/",
  },
};

function reload(cb) {
  server.reload();
  cb();
}

function serve(cb) {
  server.init({
    server: {
      baseDir: "./build",
    },
    open: false,
  });
  cb();
}

function watchFiles() {
  watch(paths.css.input, css);
  watch(paths.scripts.input, series(javascript, reload));
  watch(paths.html.input, series(html, reload));
}

function clean() {
  return del("build/");
}

function html() {
  return src(paths.html.input)
    .pipe(dest(paths.html.output));
}

function css() {
  return src(paths.css.input)
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.css.output))
    .pipe(server.stream());
}

function javascript() {
  return src(paths.scripts.input)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(dest(paths.scripts.output));
}

const dev = series(clean, parallel(html, javascript, css), serve, watchFiles);
exports.default = dev;
