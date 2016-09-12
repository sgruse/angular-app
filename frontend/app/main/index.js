'use strict';

const angular = require('angular');

require(__dirname + '/../services/user-service/user-service');

(function() {
    angular.module('App', [
    'ngRoute',
    'HomeModule',
    'UserService',
    'InfoModule'
  ])
  .controller('MainController', [
    '$scope',
    MainController
  ])
  .config([
    '$routeProvider',
    '$locationProvider',
    Router
  ])

  function Router($routeProvider, $locationProvider) {
    $routeProvider
    .when('/home', {
      template: require('../../src/components/home/home.html'),
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    })
    .when('/info', {
      template: require('../../src/components/info/info.html'),
      controller: 'InfoController',
      controllerAs: 'infoCtrl'
    })
  };

  function MainController($scope) {
    $scope.lucy = 'lucy';
  };

})();
