"use strict";

/**
 * @ngdoc overview
 * @name yoWeatherApp
 * @description
 * # yoWeatherApp
 *
 * Main module of the application.
 */
angular
  .module("yoWeatherApp", [
    "ngAnimate",
    "ngAria",
    "ngCookies",
    "ngMessages",
    "ngResource",
    "ngRoute",
    "ngSanitize",
    "ngTouch",
    "ui.bootstrap",
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl",
        controllerAs: "main",
      })
      .otherwise({
        redirectTo: "/",
      });
  })
  .config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      "self",
      // Allow loading from our assets domain. **.
      "http://api.openweathermap.org/**",
    ]);
  });
