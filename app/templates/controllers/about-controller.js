(function (angular) {

    var AboutCtrl = function () {
        this.name = 'About me component';
    };

    angular.module(noogieApp.ngAppName)
        .controller('AboutCtrl', AboutCtrl)

})(angular);
