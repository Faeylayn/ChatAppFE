'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.login = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:5000/LoginUser',
      data: {UserName: 'ajdobbasdfs.sm@gmail.com'}
    }).then(function(response) {
      console.log(response);
    }, function(error) {
      console.log("error", error);
    })
    console.log($scope.username);
  }
}]);
