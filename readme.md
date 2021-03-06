`Work In Progress`

# Web starter kit

Small boilerplate kit to build static websites using Handlebars, Sass and JavaScript with support for modern syntax.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Gulp](https://gulpjs.com/) Uses Gulp 4.x.

## Usage

- Clone repository and run `npm i`
- Run `gulp` for development
- Run `gulp dist` to bundle and minify css and js files

## Folder structure

```
|- build/
|- src/
  |- assets/
    |- layouts/
    |- partials/
  |- images/
  |- js/
  |- scss/
    |- elements/
    |- settings/
|- gulpfile.js
|- package.json
|- editorconfig.json
|- readme.md
```

## HTML

Use [handlebars](https://handlebarsjs.com/) to build page using a templating engine.
- Partials and layouts files are stored in `assets` folder.

## CSS

- Use `sass` preprocessor
- Files and folder structure based on [inuitcss](https://github.com/inuitcss/inuitcss)
- Added `postcss`, `sourcemaps`
- postcss plugins: `autoprefixer`, `cssnano`
- `sass-mq` to handle [media queries](https://github.com/sass-mq/sass-mq)

## JavaScript

- Use `gulp-babel` to transpile ES6 modern syntax
- Minify with `gulp-uglify`

## Images

Minify images seamlessly with [imagemin](https://www.npmjs.com/package/imagemin).

- Images must be placed in `src/images` folder.

## Browser support

- `defaults`: Browserslist’s default browsers (`> 0.5%, last 2 versions, Firefox ESR, not dead`).
- `Not IE 11`

## Live reload

Live reload with [Browser Sync](https://github.com/Browsersync/browser-sync), inject CSS and reload page on HTML or JavaScript changes. Support and test multiple devices at the same time, scroll, click, etc.

## EditorConfig

[EditorConfig](https://editorconfig.org/) helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

Install the plugin for your editor: [View list](https://editorconfig.org/#download)