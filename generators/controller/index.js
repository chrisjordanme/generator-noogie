var generators = require('yeoman-generator');
var noogieUtils = require('./../../utils.js');
var fileSync = require('fs');

// todo-cj : move to utils..
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
                message : 'Enter the name of your controller:',
                default : 'noogie-controller'
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
        controller: function () {
            this.fs.copyTpl(
                this.templatePath('controller.js'),
                this.destinationPath('app/scripts/controllers/' + this.name + '-controller.js'),
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
                    '\<script src="scripts/controllers/' + this.name + '-controller.js"\></script>'
                ]
            });
        }
    }
});
