(function (angular) {

    var HelloWorldCtrl = function () {
        this.appName = noogieApp.ngAppName;
        this.componentName = 'hello-world';
    };

    angular.module(noogieApp.ngAppName)
        .controller('HelloWorldCtrl', HelloWorldCtrl)

})(angular);
