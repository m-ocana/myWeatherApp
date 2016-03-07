'use strict';

/**
 * @ngdoc function
 * @name yoWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoWeatherApp
 */
angular.module('yoWeatherApp')
  .controller('MainCtrl', ['$scope', '$http', '$timeout', 'geoLocationService', 'weatherService', 
    function ($scope, $http, $timeout, geoLocationService, weatherService) {

      $scope.findLocations = function (val) {
        return geoLocationService.findCitiesByName(val);
      };

      // Get forecast data for location as given in $scope.location
      $scope.getForecastByLocation = function() {

        var errorHandler = function (error) {
          $scope.weatherInfo = null;
          $scope.forecastInfo = null;

          if(error.code == "404" || error.cod == "404"){
            $scope.hasError = { message: "The location couldn't be found. Please type another search term and try again" };
          } else {
            $scope.hasError = { message: "There is a storm in the servers. Please wait for few seconds before and try again" };
          }
          console.log(error);
        },
        // Request #1
        loadCurrentWeather = function () {
          return weatherService.queryWeather({
                    location: $scope.location
                  });
        },
        // Request #2
        loadForecast = function () {
          return weatherService.queryForecastDaily({
                    location: $scope.location
                  }).$promise.then(function(data){
                      $scope.forecastInfo = data;
                    },errorHandler);
        };

        $scope.hasError = null;

        loadCurrentWeather()
          .$promise.then(function(data){
            // Possible bug found. Get 200 response with 400 code. Extra validation added 
            if(data.cod == "200"){
              $scope.weatherInfo = data;
              $timeout(loadForecast,50);
            } else {
              errorHandler(data);
            }
          }, errorHandler);
      };

      // Set $scope.location and get weather data
      $scope.setLocation = function (loc) {
        // Avoids sending requests if location has not changed
        if((loc!="" && loc!=$scope.location) || $scope.hasError){
          $scope.location = loc;
          $scope.getForecastByLocation();
        }
      };

  }]);
