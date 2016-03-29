var generators = require('yeoman-generator');
var noogieUtils = require('./../../utils.js');
var fileSync = require('fs');


function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


module.exports = generators.Base.extend({

    prompting: function () {
        var done = this.async();

        var prompts = [
            {
                type    : 'input',
                name    : 'name',
                message : 'Enter the component name',
                default : 'my-noogie-component'
            }
        ];

        this.prompt(prompts, function (answers) {
            this.name = answers.name;
            this.resource = answers.resource;
            this.log(answers);
            done();
        }.bind(this));
    },

    writing: {
        directive: function () {
            this.fs.copyTpl(
                this.templatePath('directive.js'),
                this.destinationPath('app/components/' + this.name + '/' +  this.name + '-directive.js'),
                {
                    cmpName: this.name,
                    cmpCamel:  this.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }),
                    cmpCamelCap: capFirst(this.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }))
                }
            );

            noogieUtils.rewriteFile({
                file: 'app/index.html',
                needle: '<!-- directive:scripts -->',
                splicable: [
                    '\<script src="components/' + this.name + '/' + this.name + '-directive.js"\></script>'
                ]
            });

        },
        controller: function () {
            this.fs.copyTpl(
                this.templatePath('controller.js'),
                this.destinationPath('app/components/' + this.name + '/' +  this.name + '-controller.js'),
                {
                    cmpName: this.name,
                    cmpCamel:  this.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }),
                    cmpCamelCap: capFirst(this.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }))
                }
            );

            noogieUtils.rewriteFile({
                file: 'app/index.html',
                needle: '<!-- controllers:scripts -->',
                splicable: [
                    '\<script src="components/' + this.name + '/' + this.name + '-controller.js"\></script>'
                ]
            });
        },
        html: function () {
            this.fs.copyTpl(
                this.templatePath('component.html'),
                this.destinationPath('app/components/' + this.name + '/' +  this.name + '.html'),
                {
                    cmpName: this.name,
                    cmpCamel:  this.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }),
                    cmpCamelCap: capFirst(this.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }))
                }
            );

        },
        css: function () {
            this.fs.copyTpl(
                this.templatePath('component.scss'),
                this.destinationPath('app/components/' + this.name + '/' +  this.name + '.scss'),
                {
                    cmpName: this.name,
                    cmpCamel:  this.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }),
                    cmpCamelCap: capFirst(this.name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }))
                }
            );

            noogieUtils.rewriteFile({
                file: 'app/styles/main.scss',
                needle: '//-- component:scripts -->',
                splicable: [
                    "@import '../components/" + this.name + "/" + this.name + "';"
                ]
            });
        }
    }
});
