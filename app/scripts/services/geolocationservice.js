'use strict';

/**
 * @ngdoc service
 * @name yoWeatherApp.geoLocationService
 * @description
 * # geoLocationService
 * Service in the yoWeatherApp.
 */
angular.module('yoWeatherApp')
  .service('geoLocationService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var apiBaseUrl = '//maps.googleapis.com/maps/api/geocode/json';

    this.findCitiesByName = function (value) {
	  	return $http.get(apiBaseUrl, {
	  	  params: {
	  	    address: value,
	        language: 'en',
	  	    sensor: false
	  	  }
	  	}).then(function(response){
	  	  return response.data.results.map(function(item){
	  	    return item.formatted_address;
	  	  });
	  	});    	
    }

  });
