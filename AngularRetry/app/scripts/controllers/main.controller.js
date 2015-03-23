angular.module('hcibookmarks').controller('MainController', function($scope, StorageService) {
  $scope.bookmarks = StorageService.get();
  $scope.removeBookmark = function(url) {
    StorageService.remove(url);
    $scope.bookmarks = StorageService.get();
    if(!$scope.$$phase) {
      $scope.$apply();
    }
  };
});
