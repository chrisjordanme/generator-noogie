# Noogie Generator - Component-based Angular

> A [Yeoman](http://yeoman.io) generator that scaffolds out Angular apps using a component-based architecture

## Installation & Getting Started

- Install dependencies: `npm install --global yo gulp bower`
- Install the generator: `npm install --global generator-noogie`
- Run `yo noogie` to scaffold your webapp
- Run `gulp serve` to preview and watch for changes
- Run `bower install --save <package>` to install frontend dependencies
- Run `gulp` to build your webapp for production * This is currently not working completely
- Run `gulp serve:dist` to preview the production build * This is currently not working completely

## Fundamentals
Noogie was created to help developers build Angular 1.5+ applications using a component-based approach similar to the forthcoming [Angular 2.0](https://angular.io/).

Noogie doesn't currently have an option for building Angular 2.0 apps... yet. Noogie is new and the short-term goal is to help developers build component-based applications with what's available today in Angular 1.5. Incorporating Angular 2.0 with Noogie is definitely on the project roadmap. 

The generator scaffolds applications based on the concept of "root" and "nested" components. Supporting details are coming soon but the project was insprired by the new Component API available in Angular 1.5 and the need to move towards component-based development. I also highly recommend reading [this article](http://teropa.info/blog/2015/10/18/refactoring-angular-apps-to-components.html) by [Tero Parviainen](https://twitter.com/teropa).

Noogie scaffolds Angular apps using Angular 1.5 Components and Directive Components. Think of these as "component bundles". Each bundle is generated with it's own HTML, Sass, and Component or Directive/Controller files. Use of ng-controller and binding controllers to routes is not recommended.

Sample Component Bundle:
```
├── components/
│   ├── my-new-component
│   │   ├── my-noogie-component.html
│   │   ├── my-noogie-component.scss
|   |   ├── my-noogie-component-controller.js
|   |   ├── my-noogie-component-directive.js
```

## Available Generators
- `yo noogie:directive` Builds a Directive Component bundle
- `yo noogie:component` Builds an Angular 1.5 Component bundle
- `yo noogie:controller` Builds an Angular controller should you need one separately from a component bundle
- `yo noogie:factory` Builds an Angular factory (services and providers coming soon)

## Contribute
Contributors welcome. Just fork and submit pull requests or contact me directly [@chrisjordanme](http://twitter.com/chrisjordanme)

## License
[BSD license](http://opensource.org/licenses/bsd-license.php)
