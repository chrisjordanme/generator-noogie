(function (angular) {

    var directiveName = 'helloWorld';

    var directiveDefinition = {
        controller: 'HelloWorldCtrl',
        controllerAs: 'helloWorld',
        scope: {
            // isolate scope bindings
        },
        templateUrl: 'components/hello-world/hello-world.html',
        link: function ($scope, element, attrs) {
            //alert('test');
        }
    };

    var HelloWorld = function () {
        return directiveDefinition;
    };

    angular.module(noogieApp.ngAppName)
        .directive(directiveName, HelloWorld);

})(angular);