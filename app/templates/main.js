console.log('\'Allo, Noogie!');

var <%= appName %> = (function (<%= appName %>) {
    <%= appName %> = {};
    return <%= appName %>;
})(<%= appName %> || {});

<%= appName %>.ngAppName = '<%= appName %>';

var noogieApp = {} || window.noogieApp;
noogieApp.ngAppName = '<%= appName %>';

'use strict';
/*global angular*/

(function (angular) {
    angular.module(<%= appName %>.ngAppName, []);
})(angular);
