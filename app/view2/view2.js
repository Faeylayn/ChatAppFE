'use strict';

angular.module('myApp.view2', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', '$cookies', '$window', 'socket',
  function($scope, $http, $cookies, $window, socket) {
    if (!$cookies.get('username')) {
      $window.location.href = "/#/view1";
    }
    $http({
      method: 'POST',
      url: 'http://localhost:5000/RetreiveMessages',
      data: {}
    }).then(function(response) {
      $scope.messages = response.data.Message
    }, function(error) {
      console.log("error", error);
    });

    $scope.sendMessage = function() {
      $http({
        method: 'POST',
        url: 'http://localhost:5000/PostMessage',
        data: {
          UserName: $cookies.get('username'),
          Text: $scope.newMessage
        }
      }).then(function(response) {
        socket.emit('Message Sent', response.data)
        $scope.newMessage = "";
      }, function(error) {
        console.log("error", error);
      })
    }

    $scope.retreiveBacklog = function() {
      console.log($scope.messages[0]);
      $http({
        method: 'POST',
        url: 'http://localhost:5000/RetreiveMessages',
        data: {
          earliest: $scope.messages[0].Time
        }
      }).then(function(response) {
        $scope.messages = response.data.Message.concat($scope.messages)

      }, function(error) {
        console.log("error", error);
      });

    }

    $scope.logEvent = function(event) {
      console.log(event);
    }

    socket.on('Message Posted', function(msg) {
      $scope.messages.push(msg);
    })

}]);
