(function (angular) {

    var <%= cmpCamel %> = function () {
        this.name = '<%= cmpCamel %>';
    };

    angular.module(noogieApp.ngAppName)
        .service('<%= cmpCamel %>', <%= cmpCamel %>)

})(angular);