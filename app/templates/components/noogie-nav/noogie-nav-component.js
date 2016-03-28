(function (angular) {

    var noogieNav = {
        templateUrl: 'components/noogie-nav/noogie-nav.html',
        bindings: {

        }
    };

    angular.module(noogieApp.ngAppName)
        .component('noogieNav', noogieNav);

})(angular);