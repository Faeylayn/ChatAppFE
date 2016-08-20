'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', '$cookies', '$window', 'socket',
  function($scope, $http, $cookies, $window, socket) {
    if (!$cookies.get('username')) {
      $window.location.href = "/#/view1"
    }
    // socket.connect();
    $http({
      method: 'GET',
      url: 'http://localhost:5000/RetreiveMessages',
      data: {UserName: $scope.username}
    }).then(function(response) {
      // console.log(response);
      $scope.messages = response.data.Message
      console.log($scope.messages);
    }, function(error) {
      console.log("error", error);
    })
    // $scope.messages = ["aghdsfasgfjksdgf"]

    $scope.sendMessage = function() {
      console.log($scope.newMessage);
      $http({
        method: 'POST',
        url: 'http://localhost:5000/PostMessage',
        data: {
          UserName: $cookies.get('username'),
          Text: $scope.newMessage
        }
      }).then(function(response) {
        // response.data.UserName = $cookies.get('username')
        socket.emit('Message Sent', response.data)

      }, function(error) {
        console.log("error", error);
      })
    }

    socket.on('Message Posted', function(msg) {
      console.log(msg);
    })

}]);
