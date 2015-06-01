"use strict";

var app = angular.module("ajastin", ["ui.router"]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: './views/home.html',
                controller: 'HomeCtrl'
            });

        $stateProvider
            .state('countdown', {
                url: '/:seconds',
                templateUrl: './views/countdown.html',
                controller: 'CountdownCtrl'
            });
        $urlRouterProvider.otherwise('/home');
    }]);

// Home controller
app.controller("HomeCtrl", function ($scope) {
    $scope.message = "message";
});

//
app.controller("TitleCtrl", function ($scope, timeService) {
    $scope.title = timeService.mins;
});

// Countdown controller
app.controller("CountdownCtrl", function ($scope, $timeout, $stateParams, timeService) {

    // minutes from url parameter
    var minutes = $stateParams.seconds;
    // make total seconds
    var seconds = minutes * 60;

    // current minutes and seconds to display on page
    $scope.currentMinutes = timeService.mins;
    $scope.currentSeconds = timeService.secs;

    $scope.paused = false;

    // countdown function, count down if seconds > 0 and counter is not paused
    $scope.countdown = function () {

        $scope.currentMinutes = Math.floor(seconds / 60);
        $scope.currentSeconds = seconds % 60;
        if (seconds > 0 && !$scope.paused) {
            seconds--;
            $timeout($scope.countdown, 1000);
        }
        else if (seconds <= 0){
            $scope.timeUp();
        }
    };

    // pause timer
    $scope.pause = function() {
        $scope.paused = true;
    };

    // start timer
    $scope.start = function() {
        if ($scope.paused) {
            $scope.paused = false;
            $timeout($scope.countdown, 1000);
        }
    };

    // watch if time is up
    $scope.timeUp = function() {
        alert("Aika loppu!");
    };

    // start timer on page load
    $timeout($scope.countdown, 1000);
});

app.factory("timeService", function() {
    var timeService = {};

    return timeService;
});