(function (angular) {

    var <%= cmpCamel %> = {
        templateUrl: 'components/<%= cmpName %>/<%= cmpName %>.html',
        bindings: {

        }
    };

    angular.module(noogieApp.ngAppName)
        .component('<%= cmpCamel %>', <%= cmpCamel %>);

})(angular);