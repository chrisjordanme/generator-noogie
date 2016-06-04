(function (angular) {

    var MainCtrl = function () {
        this.appName = noogieApp.ngAppName;
        this.name = 'Noogie';
    };

    angular.module(noogieApp.ngAppName)
        .controller('MainCtrl', MainCtrl)

})(angular);
