'use strict';

/**
 * @ngdoc filter
 * @name yoWeatherApp.filter:temperature
 * @function
 * @description
 * # temperature
 * Filter in the yoWeatherApp.
 */
angular.module('yoWeatherApp')
  .filter('temperature', function () {
    return function (input, scale, label) {
    	var value = parseInt(input, 10),
    		convertedValue;

    	if (isNaN(value)){ 
    		throw new Error('Input is not a number');
    	}

		if (scale === 'F') {
			convertedValue = Math.round(value * 9.0 / 5.0 + 32);
		} else if (scale === 'C') {
            convertedValue = Math.round(value); // Celsius by default
        } else {
            throw new Error('Not a valid scale');
        }

		return label ? convertedValue += '\u00B0' : convertedValue;

    };
  });
