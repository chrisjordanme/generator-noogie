'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
  constructor: function () {
    var testLocal;

    generators.Base.apply(this, arguments);

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });

    this.option('test-framework', {
      desc: 'Test framework to be invoked',
      type: String,
      defaults: 'mocha'
    });

    if (this.options['test-framework'] === 'mocha') {
      testLocal = require.resolve('generator-mocha/generators/app/index.js');
    } else if (this.options['test-framework'] === 'jasmine') {
      testLocal = require.resolve('generator-jasmine/generators/app/index.js');
    }

    this.composeWith(this.options['test-framework'] + ':app', {
      options: {
        'skip-install': this.options['skip-install']
      }
    }, {
      local: testLocal
    });
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('\'Noogie. The best way to "ng".'));
    }

    // todo-cj : redo prompts for Angular 1 vs. 2 - right now is automatically including 1.5
    var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What is the name of your app? (camelCase)'
      }, {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Sass (Recommended for Noogie)',
        value: 'includeSass',
        checked: true
      }, {
        name: 'Bootstrap (Recommended for Noogie)',
        value: 'includeBootstrap',
        checked: true
      }, {
        name: 'Modernizr (Recommended for Noogie)',
        value: 'includeModernizr',
        checked: true
      }]
    }, {
      type: 'confirm',
      name: 'includeJQuery',
      message: 'Would you like to include jQuery?',
      default: true,
      when: function (answers) {
        return answers.features.indexOf('includeBootstrap') === -1;
      }
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      };

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.includeSass = hasFeature('includeSass');
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includeJQuery = answers.includeJQuery;
      this.appName = answers.appName;

      console.log(this.appName);

      done();
    }.bind(this));
  },

  writing: {
    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js'),
        {
          date: (new Date).toISOString().split('T')[0],
          name: this.pkg.name,
          version: this.pkg.version,
          includeSass: this.includeSass,
          includeBootstrap: this.includeBootstrap,
          testFramework: this.options['test-framework']
        }
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          includeSass: this.includeSass
        }
      );
    },

    git: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'));

      this.fs.copy(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes'));
    },

    bower: function () {
      var bowerJson = {
        name: _s.slugify(this.appName),
        private: true,
        dependencies: {}
      };

      if (this.includeBootstrap) {
        if (this.includeSass) {
          bowerJson.dependencies['bootstrap-sass'] = '~3.3.5';
          bowerJson.overrides = {
            'bootstrap-sass': {
              'main': [
                'assets/stylesheets/_bootstrap.scss',
                'assets/fonts/bootstrap/*',
                'assets/javascripts/bootstrap.js'
              ]
            }
          };
        } else {
          bowerJson.dependencies['bootstrap'] = '~3.3.5';
          bowerJson.overrides = {
            'bootstrap': {
              'main': [
                'less/bootstrap.less',
                'dist/css/bootstrap.css',
                'dist/js/bootstrap.js',
                'dist/fonts/*'
              ]
            }
          };
        }
      } else if (this.includeJQuery) {
        bowerJson.dependencies['jquery'] = '~2.1.1';
      }

      if (this.includeModernizr) {
        bowerJson.dependencies['modernizr'] = '~2.8.1';
        // todo-cj - here... make this dynamic
        // todo-cj - this is totally in the wrong place. oops.
        bowerJson.dependencies['angular'] = '^1.5.0';
        bowerJson.dependencies['angular-route'] = '^1.5.2';
      }

      this.fs.writeJSON('bower.json', bowerJson);
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    },

    editorConfig: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    h5bp: function () {
      this.fs.copy(
        this.templatePath('favicon.ico'),
        this.destinationPath('app/favicon.ico')
      );

      this.fs.copy(
        this.templatePath('apple-touch-icon.png'),
        this.destinationPath('app/apple-touch-icon.png')
      );

      this.fs.copy(
        this.templatePath('robots.txt'),
        this.destinationPath('app/robots.txt'));
    },

    styles: function () {
      var css = 'main';

      if (this.includeSass) {
        css += '.scss';
      } else {
        css += '.css';
      }

      this.fs.copyTpl(
        this.templatePath(css),
        this.destinationPath('app/styles/' + css),
        {
          includeBootstrap: this.includeBootstrap
        }
      );
    },

    scripts: function () {
      this.fs.copyTpl(
        this.templatePath('main.js'),
        this.destinationPath('app/scripts/main.js'),
          {
            appName: this.appName
          }
      );
    },

    html: function () {
      var bsPath;

      // path prefix for Bootstrap JS files
      if (this.includeBootstrap) {
        bsPath = '/bower_components/';

        if (this.includeSass) {
          bsPath += 'bootstrap-sass/assets/javascripts/bootstrap/';
        } else {
          bsPath += 'bootstrap/js/';
        }
      }

      // todo-cj : The following is ugly, I know.... Need to learn how copyTpl works with (or doesnt) globs. Or see if there is another method to copy all the templates.
      // cowboy coding this to get it out the door..
      this.fs.copyTpl(
          this.templatePath('routes/about.html'),
          this.destinationPath('app/routes/about.html')
      );

      this.fs.copyTpl(
          this.templatePath('routes/main.html'),
          this.destinationPath('app/routes/main.html')
      );

      this.fs.copyTpl(
          this.templatePath('components/about-me/about-me.html'),
          this.destinationPath('app/components/about-me/about-me.html')
      );
      this.fs.copyTpl(
          this.templatePath('components/about-me/about-me.scss'),
          this.destinationPath('app/components/about-me/about-me.scss')
      );
      this.fs.copyTpl(
          this.templatePath('components/about-me/about-me-controller.js'),
          this.destinationPath('app/components/about-me/about-me-controller.js')
      );
      this.fs.copyTpl(
          this.templatePath('components/about-me/about-me-directive.js'),
          this.destinationPath('app/components/about-me/about-me-directive.js')
      );

      this.fs.copyTpl(
          this.templatePath('components/hello-world/hello-world.html'),
          this.destinationPath('app/components/hello-world/hello-world.html')
      );

      this.fs.copyTpl(
          this.templatePath('components/hello-world/hello-world.scss'),
          this.destinationPath('app/components/hello-world/hello-world.scss')
      );

      this.fs.copyTpl(
          this.templatePath('components/hello-world/hello-world-controller.js'),
          this.destinationPath('app/components/hello-world/hello-world-controller.js')
      );

      this.fs.copyTpl(
          this.templatePath('components/hello-world/hello-world-directive.js'),
          this.destinationPath('app/components/hello-world/hello-world-directive.js')
      );

      this.fs.copyTpl(
          this.templatePath('components/my-name/my-name.html'),
          this.destinationPath('app/components/my-name/my-name.html')
      );

      this.fs.copyTpl(
          this.templatePath('components/my-name/my-name.scss'),
          this.destinationPath('app/components/my-name/my-name.scss')
      );

      this.fs.copyTpl(
          this.templatePath('components/my-name/my-name-component.js'),
          this.destinationPath('app/components/my-name/my-name-component.js')
      );

      this.fs.copyTpl(
          this.templatePath('components/noogie-nav/noogie-nav.html'),
          this.destinationPath('app/components/noogie-nav/noogie-nav.html')
      );

      this.fs.copyTpl(
          this.templatePath('components/noogie-nav/noogie-nav.scss'),
          this.destinationPath('app/components/noogie-nav/noogie-nav.scss')
      );

      this.fs.copyTpl(
          this.templatePath('components/noogie-nav/noogie-nav-component.js'),
          this.destinationPath('app/components/noogie-nav/noogie-nav-component.js')
      );
      // endKludge...

      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        {
          appName: this.appName,
          appname: this.appname,
          includeSass: this.includeSass,
          includeBootstrap: this.includeBootstrap,
          includeModernizr: this.includeModernizr,
          includeJQuery: this.includeJQuery,
          bsPath: bsPath,
          bsPlugins: [
            'affix',
            'alert',
            'dropdown',
            'tooltip',
            'modal',
            'transition',
            'button',
            'popover',
            'carousel',
            'scrollspy',
            'collapse',
            'tab'
          ]
        }
      );
    },

    misc: function () {
      mkdirp('app/images');
      mkdirp('app/fonts');
    }
  },

  install: function () {
    this.installDependencies({
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });
  },

  end: function () {
    var bowerJson = this.fs.readJSON(this.destinationPath('bower.json'));
    var howToInstall =
      '\nAfter running ' +
      chalk.yellow.bold('npm install & bower install') +
      ', inject your' +
      '\nfront end dependencies by running ' +
      chalk.yellow.bold('gulp wiredep') +
      '.';

    if (this.options['skip-install']) {
      this.log(howToInstall);
      return;
    }

    // wire Bower packages to .html
    wiredep({
      bowerJson: bowerJson,
      directory: 'bower_components',
      exclude: ['bootstrap-sass', 'bootstrap.js'],
      ignorePath: /^(\.\.\/)*\.\./,
      src: 'app/index.html'
    });

    if (this.includeSass) {
      // wire Bower packages to .scss
      wiredep({
        bowerJson: bowerJson,
        directory: 'bower_components',
        ignorePath: /^(\.\.\/)+/,
        src: 'app/styles/*.scss'
      });
    }
  }
});
