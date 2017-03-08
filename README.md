## NooGie - AngularJS Component Generator
[Noogie](https://www.npmjs.com/package/generator-noogie) is a [Yeoman](http://yeoman.io) generator that was created to help developers build Angular 1.5+ applications using a component-first approach.

What about Angular 2.0? We'll get to that momentarily...

The generator scaffolds "component bundles".  These bundles contain the HTML, CSS (Noogie requires [Sass](http://sass-lang.com/)) and JS files that make up Angular "components".  This leads to a more manageable and reusable codebase and will help developers pave the way for Angular 2.0 adoption.

Noogie scaffolds component bundles in one of two ways, (1) using the new 1.5 Component API or also using (2) traditional Angular Directives.

Sample Component Bundle (as an Anguar 1.5 Component):
```
├── components/
│   ├── my-noogie-component
│   │   ├── my-noogie-component.html
│   │   ├── my-noogie-component.scss
│   │   ├── my-noogie-component-component.js
```

Sample Component Bundle (as a traditional Directive):
```
├── components/
│   ├── my-noogie-directive
│   │   ├── my-noogie-component.html
│   │   ├── my-noogie-component.scss
│   │   ├── my-noogie-directive.js
```

## Angular 2.0

Noogie does not yet support Angular 2.0.  The short-term goal of this project is to build Angular 1.x projects in a way that provides a 2.0 upgrade path in accordance with [Angular's incremental hybrid approach to upgrading](https://angular.io/docs/ts/latest/guide/upgrade.html).  There is some work and fundamental understanding on our end that needs to occur before this can happen.  In the meantime, please take advantage of the generators Noogie provides.

## Available Generators
- `yo noogie:directive` Builds a Directive Component bundle
- `yo noogie:component` Builds an Angular 1.5 Component bundle
- `yo noogie:controller` Builds an Angular controller
- `yo noogie:factory` Builds an Angular factory 
- `yo noogie:service` Builds an Angular service
- `yo noogie:route` Builds an HTML template and automatically wires up the new route into the app router.  This also creates and associates a boilerplate controller file.

## Installation & Getting Started

The generator uses yeoman, gulp and bower.  If you do not have these dependencies installed, please install them using: `npm install --global yo gulp bower`

- Install the generator:  `npm install --global generator-noogie`
- Once complete, run  `yo noogie`  to scaffold your webapp
- Run  `gulp serve`  to serve, preview and watch for changes
- Run  `bower install --save <package>`  to install frontend dependencies
- Run  `gulp`  to build your webapp for production
- Run  `gulp serve:dist`  to preview the production build

## Features
- Follows (very closely) the code conventions found in the Angular endorsed [Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
- Newly generated component bundle files are auto-injected into the index.html
- Component Sass partials are auto-imported into a main.scss file
- Includes Sass and Bootstrap (currently Sass is required)
- It's called Noogie. What's not to love about that?

## Coming Soon
- Dynamic module loading (we are currently evaluating [SystemJS](https://github.com/systemjs/systemjs) and [webpack](https://webpack.github.io/))
- ES2015 style and compilation using [Babel](https://babeljs.io/)
- [TypeScript](https://www.typescriptlang.org/) support

## Contribute
Contributors are welcome. Please use the dev branch and fork/submit pull requests. Approved PR's will be merged into master on a forthcoming release cadence.

## License
[BSD license](http://opensource.org/licenses/bsd-license.php)
