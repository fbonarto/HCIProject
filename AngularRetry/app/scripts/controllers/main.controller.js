'use strict';

angular.module('markticle').controller('MainController', ['$scope', 'StorageService', function($scope, StorageService) {
	$scope.marks = StorageService.get();

	$scope.removeMark = function(url) {
		StorageService.remove(url);
		$scope.marks = StorageService.get();

		if(!$scope.$$phase) {
			$scope.$apply();
		}
	};
	
	// ADD
   	var storageService = new markticleStorageService();
	$scope.new_mark = {};
	$scope.new_mark.dateAdded = new Date();
	$scope.new_mark.dateVisited = new Date();
	$scope.new_mark.order = $scope.marks.length;
	$scope.add_new = function(){
   		storageService.add($scope.new_mark);
	}
}]);