(function (angular) {

    var <%= cmpCamelCap %> = function () {
        this.name = '<%= cmpName %>';
    };

    angular.module(noogieApp.ngAppName)
        .controller('<%= cmpCamelCap %>', <%= cmpCamelCap %>)

})(angular);
