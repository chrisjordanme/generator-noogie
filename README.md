# Noogie Generator - Component-based Angular applications

> [Yeoman](http://yeoman.io) generator that scaffolds out Angular apps using a component-based architecture

## Getting Started

- Install dependencies: `npm install --global yo gulp bower`
- Install the generator: `npm install --global generator-noogie`
- Run `yo noogie` to scaffold your webapp
- Run `gulp serve` to preview and watch for changes
- Run `bower install --save <package>` to install frontend dependencies
- Run `gulp` to build your webapp for production * This is currently not working completely
- Run `gulp serve:dist` to preview the production build * This is currently not working completely

## Noogie Fundamentals
Noogie was created to help developers build Angular 1.5+ applications using a component-based approach similar to the forthcoming [Angular 2.0](https://angular.io/).

Noogie doesn't currently have an option for building Angular 2.0 apps... yet. Noogie is new and the short-term goal is to aid developers in building component-based applications with what's available in Angular 1.5 and to help developers start working in a component-based way to help enhance understanding the component-based approach in Angular 2.0. Incorporating Angular 2.0 with Noogie is one of the next things on the project roadmap. 

The generator scaffolds applications based on the concept of "root" and "nested" components. Details on this coming soon.

A Directive Component bundle contains HTML, Sass, Controller and Directive files.

Angular 1.5 Component bundles contain HTML, Sass and Component files.

## Available Generators
- `yo noogie:directive` Builds a directive component bundle
- `yo noogie:component` Builds an Angular 1.5 component bundle
- `yo noogie:controller` Builds an Angular 1.5 component bundle
- `yo noogie:factory` Builds an Angular service (factory)
- `yo noogie:service` Builds an Angular service

## Docs
* [getting started](docs/README.md) with this generator

## Known Issues

## Contribute

See the [contributing docs](contributing.md).

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
