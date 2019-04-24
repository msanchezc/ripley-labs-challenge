const weather = require('./weather')
const expect = require('chai').expect

describe('weather', function () {
  describe('get', function () {
    it('should retrieve weather data for some location', async function () {
      let response = await weather.get('51.507351,-0.127758')
      expect(response.data).to.have.property('currently')
    })
  })
})
