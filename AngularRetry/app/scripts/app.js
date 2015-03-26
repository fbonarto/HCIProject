'use strict';

var app = angular.module('markticle', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/', {
			templateUrl: 'views/search.html'
		}).
		when('/add', {
			templateUrl: 'views/add.html'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);