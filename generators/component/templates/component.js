(function (angular) {

    var uo<%= cmpCamelCap %> = {
        templateUrl: 'components/<%= cmpName %>/<%= cmpName %>.html',
        bindings: {

        }
    };

    angular.module(noogieAppName.ngAppName)
        .component('uo<%= cmpCamelCap %>', uo<%= cmpCamelCap %>);

})(angular);