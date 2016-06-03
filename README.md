# NooGie - AngularJS Component Generator

![](noogie-screenshot.png)

## Methodology & Fundamentals
[Noogie](http://noogie.io) is a [Yeoman](http://yeoman.io) generator that was created to help developers build Angular 1.5+ applications using a component-first approach.

What about Angular 2.0? We'll get to that momentarily.

The generator scaffolds "component bundles". These bundles contain the HTML, CSS and (Directive/Component) JS files that make up Angular "components". This leads to a more manageable and reusable codebase and will help developers begin paving the way for Angular 2.0 adoption.

Noogie scaffolds Angular components in one of two ways, (1) using the new 1.5 Component API or also using (2) traditional Angular Directives.

Sample Component Bundle (as a traditional Directive):
```
├── components/
│   ├── my-noogie-directive
│   │   ├── my-noogie-component.html
│   │   ├── my-noogie-component.scss
│   │   ├── my-noogie-directive.js
```
Sample Component Bundle (as an Anguar 1.5 Component):
```
├── components/
│   ├── my-noogie-component
│   │   ├── my-noogie-component.html
│   │   ├── my-noogie-component.scss
│   │   ├── my-noogie-component-component.js
```

Noogie does not yet support Angular 2.0. The short-term goal of this project is to build Angular 1.x projects in a way that provides an upgrade path in accordance with [Angular's incremental hybrid approach to upgrading](https://angular.io/docs/ts/latest/guide/upgrade.html). Though there is some work and fundamental understanding that needs to occur before this can happen. But work is underway.

## Installation & Getting Started

- Install dependencies: `npm install --global yo gulp bower`
- Install the generator: `npm install --global generator-noogie`
- Run `yo noogie` to scaffold your webapp
- Run `gulp serve` to preview and watch for changes
- Run `bower install --save <package>` to install frontend dependencies
- Run `gulp` to build your webapp for production * This is currently not working completely
- Run `gulp serve:dist` to preview the production build * This is currently not working completely

## Available Generators
- `yo noogie:directive` Builds a Directive Component bundle
- `yo noogie:component` Builds an Angular 1.5 Component bundle
- `yo noogie:controller` Builds an Angular controller
- `yo noogie:factory` Builds an Angular factory 
- `yo noogie:service` Builds an Angular service
- `yo noogie:route` Stubs out an HTML template file, automatically writes the new route into the main.js router, links the HTML and creates a corresponding controller

## Features
- Newly genereated component bundle files are auto-injected into the index.html
- Component Sass partials are auto-imported into a main.scss
- Includes Sass and Bootstrap
- It's called Noogie. What's not to love about that?

## Coming Soon...
- Dynamic module loading (currently, all JS is included in the app)
- ES2015 style
- TypeScript integration

## Contribute
Contributors are welcome. Please use the dev branch and fork/submit pull requests. Approved PR's will be merged into master on a forthcoming release cadence.

## License
[BSD license](http://opensource.org/licenses/bsd-license.php)
