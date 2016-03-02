'use strict';

describe('Service: geoLocationService', function () {

  // load the service's module
  beforeEach(module('yoWeatherApp'));

  // instantiate service
  var geoLocationService;
  beforeEach(inject(function (_geoLocationService_) {
    geoLocationService = _geoLocationService_;
  }));

  it('should do something', function () {
    expect(!!geoLocationService).toBe(true);
  });

});
