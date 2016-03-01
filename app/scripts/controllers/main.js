'use strict';

/**
 * @ngdoc function
 * @name yoWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoWeatherApp
 */
angular.module('yoWeatherApp')
  .controller('MainCtrl', ['$scope', '$http', '$timeout', 'weatherService', function ($scope, $http, $timeout, weatherService) {

  /*$scope.onSelect = function ($item, $model, $label, $event) {
    $scope.$selection_made = $item;
  };*/

	// Find Location info. Supports the autosuggest component
	$scope.findLocation = function(val) {
  	return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
  	  params: {
  	    address: val,
        language: 'en',
  	    sensor: false
  	  }
  	}).then(function(response){
  	  return response.data.results.map(function(item){
  	    return item.formatted_address;
  	  });
  	});
	};


  // Get forecast data for location as given in $scope.location
  $scope.getForecastByLocation = function() {

    /*if ($scope.location === '' || $scope.location === undefined) {
      $scope.hasState = 'has-warning';
      $scope.message = 'Please provide a location';
      return;
    }

    $scope.hasState = 'has-success';*/

    $scope.weather = weatherService.queryWeather({
      location: $scope.location
    }).$promise.then(function (result){
      $scope.weatherInfo = result;
    }, function(reason){
      console.log(reason);
    });

    $scope.forecast = weatherService.queryForecastDaily({
      location: $scope.location
    }).$promise.then(function (result){
      $scope.forecastInfo = result;
    }, function(reason){
      console.log(reason);
    });

  };

  // Set $scope.location and execute search on API
  $scope.setLocation = function(loc) {
    $scope.location = loc;
    $scope.getForecastByLocation();
  };

  }]);
