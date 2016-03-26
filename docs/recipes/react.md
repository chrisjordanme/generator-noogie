# Setting up React and JSX

This recipe gets you set up with React, including precompilation of JSX into JavaScript, integrated with LiveReload.

## Steps

### 1. Add dependencies

Install [gulp-react](https://github.com/sindresorhus/gulp-react), a gulp plugin for transforming JSX templates into real JavaScript:

```sh
$ npm install --save-dev gulp-react
```

Install [React](https://github.com/facebook/react) itself as a Bower component:

```sh
$ bower install --save react
```

Run the wiredep task to insert a script tag into your `app/index.html`:

```sh
$ gulp wiredep
```

### 2. Create a `templates` task

This task preprocesses `.jsx` files into pure JavaScript and outputs them in `.tmp/scripts`.

```js
gulp.task('templates', function () {
  return gulp.src('app/scripts/**/*.jsx')
    .pipe($.react())
    .pipe(gulp.dest('.tmp/scripts'));
});
```

### 3. Add `templates` as a dependency of `html` and `serve`

```js
gulp.task('html', ['styles', 'templates'], function () {
  ...
```

```js
gulp.task('serve', ['styles', 'templates', 'fonts'], function () {
  ...
```

* The `serve` dependency means the generated `.js` files will be ready in `.tmp/scripts` before the server starts up
* The `html` dependency means your JSX also gets compiled as part of the `gulp build` sequence – before the `html` task starts, so that the `.js` files are generated in time for [gulp-useref](https://github.com/jonkemp/gulp-useref) to concatenate them.

### 4. Edit your `serve` task

Edit your `serve` task so that (a) editing a `.jsx` file triggers the `templates` task, and (b) the browser is refreshed whenever a `.js` file is generated in `.tmp/scripts`:

```diff
 gulp.task('serve', ['styles', 'templates', 'fonts'], function () {
   ...
   gulp.watch([
     'app/*.html',
     '.tmp/styles/**/*.css',
     'app/scripts/**/*.js',
+    '.tmp/scripts/**/*.js',
     'app/images/**/*'
   ]).on('change', reload);

   gulp.watch('app/styles/**/*.scss', ['styles', reload]);
+  gulp.watch('app/scripts/**/*.jsx', ['templates', reload]);
   gulp.watch('bower.json', ['wiredep', 'fonts', reload]);
 });
```


## Usage

- Put your `.jsx` files anywhere in `app/scripts`, but include them in your HTML as if they're `.js` files – e.g. for `app/scripts/foo.jsx`, use `<script src="scripts/foo.js"></script>`.

- It's fine to have a mixture of `.js` and `.jsx` files in your `app/scripts`.
