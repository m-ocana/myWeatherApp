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

      $scope.getCurrentPosition = function () {
        var callback = function(position){
          var coords = {lat: position.coords.latitude, lon: position.coords.longitude};
          localStorage.setItem("geoCoords", JSON.stringify(coords));
          $scope.getForecast(coords);
        };

        if(typeof(Storage) !== "undefined") {
            if(localStorage.getItem("geoCoords")){
              $scope.getForecast(JSON.parse(localStorage.getItem("geoCoords")));
            } else {
              geoLocationService.getCurrentCoords(callback);
            }
        } else {
            // Sorry! No Web Storage support..
        }        
      };

      // Get Forecast by coordinates or by location name
      $scope.getForecast = function( coords ) {

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
        loadCurrentWeather = function (params) {
          return weatherService.queryWeather(params);
        },
        // Request #2
        loadForecast = function (params) {
          return weatherService.queryForecastDaily(params).$promise.then(function(data){
                      $scope.forecastInfo = data;
                    },errorHandler);
        };

        $scope.hasError = null;
        var params = null;

        // Define request parameters wether if it is coordinates or location name
        if( coords ) {
          params = { coords: 'lat=' + coords.lat + '&lon=' + coords.lon };
        } else {
          params = { location: 'q=' + $scope.location };
        }

        // Due to API restrictions, we need to nest the requests
        loadCurrentWeather(params)
          .$promise.then(function(data){
            // Possible bug found. Get 200 response with 400 code. Extra validation added 
            if(data.cod == "200"){
              $scope.weatherInfo = data;
              $timeout(loadForecast(params),100);
            } else {
              errorHandler(data);
            }
          }, errorHandler);
      };

      $scope.findLocations = function (val) {
        return geoLocationService.findCitiesByName(val);
      };

      // Set $scope.location and get weather data
      $scope.setLocation = function (loc) {
        // Avoids sending requests if location has not changed
        if((loc!="" && loc!=$scope.location) || $scope.hasError){
          $scope.location = loc;
          $scope.getForecast();
        }
      };

  }]);
