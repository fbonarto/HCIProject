'use strict';

angular.module('markticle').controller('MainController', ['$scope','$routeParams',  '$location', '$window', 'StorageService', function($scope, $routeParams, $location, $window, StorageService) {
    $scope.marks = StorageService.get();

    $scope.removeMark = function (id) {
        var go = $window.confirm("Are you sure you want to delete this bookmark? This action cannot be undone. ");
        if (go) {
            StorageService.remove(id);
            $scope.marks = StorageService.get();

            if (!$scope.$$phase) {
                $scope.$apply();
            }
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
	        $scope.new_mark.icon = "http://www.google.com/s2/favicons?domain=" + $scope.tab.url;
	        $scope.new_mark.dateAdded = new Date().getTime();
	        $scope.new_mark.dateVisited = new Date().getTime();
	        $scope.new_mark.order = $scope.marks.length;
	        $scope.new_mark.color = "#ffffff";

	        return tabs[0];
	    });
	};
	$scope.new_mark = {};
	$scope.add_success = false;
	$scope.new_mark.tags = '';
	$scope.new_mark.color = '#FFFFFF';
	$scope.add_new = function () {
	    $scope.new_mark.id = new Date().getTime();
	    if ($scope.new_mark.tags.length > 0) {
	        var temp = $scope.new_mark.tags;
	        var temp2 = temp.split(',');
	        $scope.new_mark.tags = [];
	        $.each(temp2, function (i, el) {
	            if ($.inArray(el.trim(), $scope.new_mark.tags) === -1) $scope.new_mark.tags.push(el.trim());
	        });
	    }
	    storageService.add($scope.new_mark);
	    $scope.add_success = true;
	    $scope.marks.push($scope.new_mark);
	    $location.path("/");
	    $scope.new_mark = {};
	};

    // ACTIVE TAB
	$scope.is_active = new function (path) {
	    if ($location.path() == path) return true;
	    else return false;
	};

    // EDIT
	$scope.edit_mark = {};
	$scope.edit_success = false;
	$scope.getMark = function (index) {
	    $scope.edit_mark = $scope.marks[index];
	};
	$scope.edit = function () {
	    $scope.edit_mark.color = $scope.selectedcol;
	    if ( $scope.edit_mark.tags && typeof $scope.edit_mark.tags == 'object') {
	        $scope.edit_mark.tags = $scope.edit_mark.tags.join(',');
	    }
	    if ($scope.edit_mark.tags && $scope.edit_mark.tags.length > 0) {
	        var temp = $scope.edit_mark.tags;
	        var temp2 = temp.split(',');
	        $scope.edit_mark.tags = [];
	        $.each(temp2, function (i, el) {
	            if ($.inArray(el.trim(), $scope.edit_mark.tags) === -1) $scope.edit_mark.tags.push(el.trim());
	        });
	    }
	    if (!$scope.$$phase) {
	        $scope.$apply();
	    }

	    storageService.add($scope.edit_mark);
	    $scope.edit_success = true;
	    $location.path("/");
	};

    // FILTER
	$scope.getDate = function (new_date) {
	    var date = new Date(0);
	    date.setUTCSeconds(new_date/1000);
	    return date.toLocaleDateString();
	};

    //COLORS
	$scope.colorlist = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548','#9E9E9E','#607D8B','#000000','#FFFFFF'];
}]);