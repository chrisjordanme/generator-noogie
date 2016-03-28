(function (angular) {

    var HelloWorldCtrl = function () {
        this.componentName = 'hello-world';
        this.name = 'what?'
    };

    angular.module(noogieApp.ngAppName)
        .controller('HelloWorldCtrl', HelloWorldCtrl)

})(angular);
