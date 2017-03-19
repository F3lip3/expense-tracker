angular.module('app').component('login', {
	templateUrl: '/security/login.html',
	bindings: {
		currentAuth: '='
	},
	controller: function(auth, $location) {
		this.loggedIn = !!this.currentAuth;
    	// anonymous login
		this.anonLogin = function() {
			auth.$signInAnonymously().then(function() {
            	$location.path('/home');
            }).catch((function (err) {
				console.log('error object:', err);
            	this.errorMessage = err.code;
            }).bind(this));
			
        };
		// facebook login
		this.fbLogin = function () {
			auth.$signInWithPopup('facebook').then(function() {
            	$location.path('/home');
            }).catch((function (err) {
				console.log('error object:', err);
            	this.errorMessage = err.code;
            }).bind(this));
		};
    }
});