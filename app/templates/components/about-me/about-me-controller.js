(function (angular) {

    var AboutMeCtrl = function () {
        this.name = 'about-me';
    };

    angular.module(noogieApp.ngAppName)
        .controller('AboutMeCtrl', AboutMeCtrl)

})(angular);
