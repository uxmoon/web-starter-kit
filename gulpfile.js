"use strict";

const { series, parallel, src, dest, watch } = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
sass.compiler = require("node-sass");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const handlebars = require("gulp-hb");
const rename = require("gulp-rename");
const server = require("browser-sync").create();

const paths = {
  html: {
    input: "src/*.html",
    output: "build/",
  },
  templates: {
    assets: "src/assets/**/*.hbs",
    input: "src/*.hbs",
    output: "build/",
    watch: "src/**/*.hbs",
  },
  scripts: {
    input: "src/js/*.js",
    output: "build/js/",
  },
  css: {
    input: "src/scss/**/*.scss",
    output: "build/css/",
  },
  images: {
    input: "src/images/*",
    output: "build/images/",
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
    open: false, // disable open browser each time you run gulp
    // ui: false, // allows to controls all devices, push sync updates and much more
    // notify: false, // The small pop-over notifications in the browser are not always needed/wanted
    // online: false, // if you're working offline, you can reduce start-up time by setting this option to false
  });
  cb();
}

function watchFiles() {
  watch(paths.css.input, css);
  watch(paths.scripts.input, series(javascript, reload));
  watch(paths.html.input, series(html, reload));
  watch(paths.templates.watch, series(templates, reload));
  watch(paths.images.input, series(images));
}

function clean() {
  return del("build/");
}

function html() {
  return src(paths.html.input)
    .pipe(dest(paths.html.output));
}

function templates() {
  return src(paths.templates.input)
    .pipe(handlebars()
        .partials(paths.templates.assets)
    )
    .pipe(
      rename(function (path) {
        return {
          dirname: path.dirname,
          basename: path.basename,
          extname: ".html",
        };
      })
    )
    .pipe(dest(paths.templates.output));
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

function images() {
  return src(paths.images.input)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(paths.images.output));
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
  return src("src/favicon.png").pipe(dest("build/"));
}

const dist = series(clean, parallel(html, javascriptMinify, cssMinify, images, copy));
const dev = series(
  clean,
  parallel(templates, javascript, css, copy),
  images,
  serve,
  watchFiles
);

exports.images = images;
exports.dist = dist;
exports.default = dev;
