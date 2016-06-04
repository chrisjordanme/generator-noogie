(function (angular) {

    var directiveName = 'aboutMe';

    var directiveDefinition = {
        scope: {
            name: '='
        },
        templateUrl: 'components/about-me/about-me.html',
        link: function ($scope, element, attrs) {
            //alert('test');
        }
    };

    var AboutMe = function () {
        return directiveDefinition;
    };

    angular.module(noogieApp.ngAppName)
        .directive(directiveName, AboutMe);

})(angular);