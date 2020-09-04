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
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
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
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
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
    .pipe(concat("app.js"))
    .pipe(dest(paths.scripts.output));
}

function cssMinify() {
  return src(paths.css.input)
  .pipe(sass().on("error", sass.logError))
  .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(paths.css.output));
}

function javascriptMinify() {
  return src(paths.scripts.input)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(
      uglify({
        compress: {
          drop_console: true,
        },
      })
    )
    .pipe(concat("app.min.js"))
    .pipe(dest(paths.scripts.output));
}

function copy() {
  return src("src/favicon.png")
    .pipe(dest("build/"))
}

const dist = series(clean, parallel(html, javascriptMinify, cssMinify, copy));
const dev = series(clean, parallel(html, javascript, css, copy), serve, watchFiles);

exports.dist = dist;
exports.default = dev;
