angular.module('app').component('preferencesEdit', {
    templateUrl: '/preferences/edit.html',
    bindings: {
        userPreferencesData: '=userPreferences'
    },
    controller: function (fbRef, $scope, $location) {
        this.themes = ['light', 'dark'];
        this.userPreferencesData.$bindTo($scope, '$ctrl.userPreferences').then((function () {
            if (!this.userPreferences.theme)
                this.userPreferences.theme = this.themes[0];
        }).bind(this));
        // this.save = function () {
        //     this.userPreferences.$save().then(function () {
        //         $location.path('/home');
        //     }).catch((function (err) {
        //         this.errorMessage = err;
        //     }).bind(this));
        // };
    }
});