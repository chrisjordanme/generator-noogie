(function (angular) {

    var <%= cmpCamel %> = function () {
        return {
            name: '<%= cmpCamel %>'
        }
    };

    angular.module(noogieApp.ngAppName)
        .factory('<%= cmpCamel %>', <%= cmpCamel %>)

})(angular);