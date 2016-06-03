(function (angular) {

    var <%= cmpCamelCap %>Ctrl = function () {
        this.name = '<%= cmpName %>';
    };

    angular.module(noogieApp.ngAppName)
        .controller('<%= cmpCamelCap %>Ctrl', <%= cmpCamelCap %>Ctrl)

})(angular);
