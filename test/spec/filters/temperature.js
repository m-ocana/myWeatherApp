'use strict';

describe('Filter: temperature', function () {

  // load the filter's module
  beforeEach(module('yoWeatherApp'));

  // initialize a new instance of the filter before each test
  var temperature;
  beforeEach(inject(function ($filter) {
    temperature = $filter('temperature');
  }));

  it('should return the input prefixed with "temperature filter:"', function () {
    var text = 'angularjs';
    expect(temperature(text)).toBe('temperature filter: ' + text);
  });

});
