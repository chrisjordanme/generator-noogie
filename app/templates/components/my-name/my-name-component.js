(function (angular) {

    var uoMyName = {
        templateUrl: 'components/my-name/my-name.html',
        bindings: {
            name: '='
        }
    };

    angular.module(noogieApp.ngAppName)
        .component('myName', uoMyName);

})(angular);