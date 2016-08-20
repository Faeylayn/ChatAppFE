'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'btford.socket-io',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]).factory('socket', function (socketFactory) {
  return socketFactory({
        ioSocket: io('http://localhost:5000')
    });
  // var socket = io.connect();
  // return {
  //   on: function (eventName, callback) {
  //     socket.on(eventName, function () {
  //       var args = arguments;
  //       $rootScope.$apply(function () {
  //         callback.apply(socket, args);
  //       });
  //     });
  //   },
  //   emit: function (eventName, data, callback) {
  //     socket.emit(eventName, data, function () {
  //       var args = arguments;
  //       $rootScope.$apply(function () {
  //         if (callback) {
  //           callback.apply(socket, args);
  //         }
  //       });
  //     })
  //   }
  // };
});
