'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', '$cookies', '$window',
  function($scope, $http, $cookies, $window) {
  $scope.login = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:5000/LoginUser',
      data: {UserName: $scope.username}
    }).then(function(response) {
      // console.log(response);
      $cookies.put('username', $scope.username)
      $window.location.href = "/#/view2"
    }, function(error) {
      console.log("error", error);
    })
    // console.log($scope.username);
  }
}]);
