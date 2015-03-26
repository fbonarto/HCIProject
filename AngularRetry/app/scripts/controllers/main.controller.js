'use strict';

angular.module('markticle').controller('MainController', ['$scope','$routeParams',  '$location', 'StorageService', function($scope, $routeParams, $location, StorageService) {
    $scope.marks = StorageService.get();

	$scope.removeMark = function(id) {
		StorageService.remove(id);
		$scope.marks = StorageService.get();

		if(!$scope.$$phase) {
			$scope.$apply();
		}
	};

	
    // ADD
	var storageService = new markticleStorageService();
	$scope.tab = {};
	$scope.getTab = function () {
	    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	        $scope.tab = tabs[0];
	        $scope.new_mark.title = $scope.tab.title;
	        $scope.new_mark.url = $scope.tab.url;
	        $scope.new_mark.image = $scope.tab.image;
	        $scope.new_mark.dateAdded = new Date();
	        $scope.new_mark.dateVisited = new Date();
	        $scope.new_mark.order = $scope.marks.length;
	        $scope.new_mark.id = new Date().getTime();
	        return tabs[0];
	    });
	};
	$scope.new_mark = {};
	$scope.add_success = false;
	$scope.add_new = function () {
	    storageService.add($scope.new_mark);
	    $scope.add_success = true;
	    $scope.marks.push($scope.new_mark);
	    $location.path("/");
	    $scope.new_mark = {};
	}

    // ACTIVE TAB
	$scope.is_active = new function (path) {
	    if ($location.path() == path) return true;
	    else return false;
	}

    // EDIT
	$scope.edit_mark = {};
	$scope.edit_success = false;
	$scope.getMark = function (index) {
	    $scope.edit_mark = $scope.marks[index];
	}
	$scope.edit = function () {
	    if (!$scope.$$phase) {
	        $scope.$apply();
	    }
	    storageService.add($scope.edit_mark);
	    $scope.edit_success = true;
	    $location.path("/");
	}
}]);