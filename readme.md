# Web starter kit

Small boilerplate kit to build static websites.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [Gulp](https://gulpjs.com/) Uses Gulp 4.x.

## Usage

- Clone repository and run `npm i`
- Run `gulp`

## Folder structure

```
|- build/
|- src/
  |- js/
  |- scss/
|- gulpfile.js
|- package.json
|- editorconfig.json
|- node_modules/
```

## CSS

- Files and folder structure based on [inuitcss](https://github.com/inuitcss/inuitcss)
- Added `postcss`, `sourcemaps`
- postcss plugins: `autoprefixer`, `cssnano`
- `sass-mq` to handle [media queries](https://github.com/sass-mq/sass-mq)

## JavaScript

- Added `gulp-babel` to transpile ES6 modern syntax

## Browser support

- `defaults`: Browserslist’s default browsers (`> 0.5%, last 2 versions, Firefox ESR, not dead`).
- `Not IE 11`

## Live reload

Live reload with Browser Sync, inject CSS and reload page on HTML or JavaScript changes. Support and test multiple devices at the same time, scroll, click, etc.

## EditorConfig

[EditorConfig](https://editorconfig.org/) helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.

Install the plugin for your editor: [View list](https://editorconfig.org/#download)