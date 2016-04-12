(function (angular) {

    var HelloWorldCtrl = function () {
        this.componentName = 'hello-world';
        this.name = 'Noogie'
    };

    angular.module(noogieApp.ngAppName)
        .controller('HelloWorldCtrl', HelloWorldCtrl)

})(angular);
