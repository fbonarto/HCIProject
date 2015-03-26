'use strict';

console.log("gotcha");


angular.module('markticle').directive("gotcha", function ($document) {
    return {
        restrict: "E",
        template: {'<a>click me</a>'},
        link: function(scope, elem, attrs) {
            //On click
            console.log("gotcha2");
            elem.bind('click', function() {
                console.log("gotcha2");
            });
        }
    }
});
angular.module('markticle').directive("gotcha2", function ($document) {
    return function(scope, elem, attr){
            //On click
            elem.on('click', function () {
                console.log("gotcha2");
            });
    }
});