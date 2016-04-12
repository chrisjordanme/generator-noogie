'use strict';
console.log('\'Allo, Noogie!');

var <%= appName %> = {} || <%= appName %>;
var noogieApp = {} || window.noogieApp;
noogieApp.ngAppName = '<%= appName %>';

'use strict';
/*global angular*/

(function (angular) {

    <%= appName %>.ngRoutes = ['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'routes/main.html'
            }).
            when('/about', {
                templateUrl: 'routes/about.html'
            }).
            otherwise('/');
    }];

    angular.module(noogieApp.ngAppName, ['ngRoute'])
        .config(<%= appName %>.ngRoutes);

})(angular);
