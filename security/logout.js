angular.module('app').component('logout', {
    controller: function (auth, $location) {
        auth.$signOut().then(function () {
            $location.path('/login');
        });
    }
})