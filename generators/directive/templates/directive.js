(function (angular) {

    var directiveName = '<%= cmpCamel %>';

    var directiveDefinition = {
        scope: {
            title: '=',
            content: '='
        },
        templateUrl: 'components/<%= cmpName %>/<%= cmpName %>.html',
        link: function ($scope, element, attrs) {
            //alert('test');
        }
    };

    var <%= cmpCamelCap %> = function () {
        return directiveDefinition;
    };

    angular.module(noogieApp.ngAppName)
        .directive(directiveName, <%= cmpCamelCap %>);

})(angular);