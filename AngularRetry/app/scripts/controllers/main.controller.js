angular.module('hcibookmarks').controller('MainController', function($scope) {
	$scope.bookmarks = [
	{
		title: 'Smashing magazine',
  	url: 'http://www.smashingmagazine.com/'
	},
	{
  	title: 'Markticle',
	  url: 'https://markticle.com'
	}
	];
});
