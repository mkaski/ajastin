"use strict";

var app = angular.module("ajastin", ["ui.router"]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      });

    $stateProvider
      .state('countdown', {
        url: '/:minutes',
        templateUrl: 'views/countdown.html',
        controller: 'CountdownCtrl'
      });
    $urlRouterProvider.otherwise('/home');

  }]);

// Home controller
app.controller("HomeCtrl", function ($scope, Sound) {

  $scope.sound = Sound;
});

// Countdown controller
app.controller("CountdownCtrl", function ($scope, $timeout, $stateParams, Sound) {

  // minutes from url parameter
  var minutes = Math.ceil($stateParams.minutes * 100) / 100;
  // make total seconds
  var seconds = minutes * 60;

  // paused state
  $scope.paused = false;

  // sound on/off
  $scope.sound = Sound;

  // request permission for desktop notifications
  Notification.requestPermission();

  // countdown function, count down if seconds > 0 and counter is not paused
  var countdown = function () {

    setTime();
    if (seconds > 0 && !$scope.paused) {
      seconds--;
      timeoutPromise = $timeout(countdown, 1000);
    }
    else if (seconds <= 0) {
      timeUp();
      return false;
    }
  };

  // pause timer
  $scope.pause = function () {
    $scope.paused = true;
  };

  // start timer
  $scope.start = function () {
    if ($scope.paused) {
      $scope.paused = false;
      timeoutPromise = $timeout(countdown, 1000);
    }
  };

  // add minute
  $scope.addTime = function () {
    seconds = seconds + 30;
    setTime();
  };

  // take minute
  $scope.reduceTime = function () {
    if (seconds > 30) {
      seconds -= 30;
      setTime();
    }
  };

  $scope.soundToggle = function () {
    $scope.sound = !sound;
  };

  // set time to scope variables
  var setTime = function () {
    $scope.currentMinutes = Math.floor(seconds / 60);
    $scope.currentSeconds = seconds % 60;
  };

  // time is up
  var timeUp = function () {

    if ($scope.sound.getSound()) {
      Sound.playAlarm();
    }

    // notify user
    if (Notification.permission === "granted") {
      var options = {
        body: $stateParams.minutes + " min kulunut!",
        dir : "ltr"
      };
      var notification = new Notification("Aika loppu!",options);
    }
    alert("Aika loppu!");
  };

  // start timer on page load, cancel on state change
  var timeoutPromise = $timeout(countdown, 1000);
  $scope.$on('$stateChangeStart', function(){
    $timeout.cancel(timeoutPromise);
  });
});

// Sound service
app.service("Sound", function Sound() {

  var Sound = this;
  var sound = true;
  var alarm = document.createElement('audio');
  alarm.setAttribute('src', 'alert.ogg');

  Sound.setSound = function () {
    sound = !sound;
  };

  Sound.getSound = function () {
    return sound;
  };

  // play alarm
  Sound.playAlarm = function () {
    alarm.play();
  };

});