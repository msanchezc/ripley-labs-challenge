const axios = require('axios')
const config = require('./config')

const client = axios.create({
  baseURL: `${config.FORECAST_API_BASEURL}/${config.FORECAST_API_SECRET}`
})

const weather = {
  /**
   * Get weather data for the given coordinates
   *
   * @param {string} coordinates - Coordinates in <latitude>,<longitude> format
   * @param {Object} [options={}] - Options to add to the request as query string params
   * @returns {Promise} Promise object represents the request response
   */
  get (coordinates, options = {}) {
    // Simulate an error rate of 10%
    if (Math.random(0, 1) < 0.1) {
      return Promise.reject(new Error('How unfortunate! The API Request Failed'))
    }
    return client.get(`/${coordinates}`, {
      params: Object.assign({
        exclude: config.FORECAST_API_EXCLUDE,
        units: config.FORECAST_API_UNITS,
        lang: config.FORECAST_API_LANG
      }, options)
    })
  }
}

module.exports = weather
