const weather = require('../../components/weather')
const cache = require('../../components/cache')

// Store the coordinates of cities in cache
cache.hmset(
  'coordinates',
  'Santiago', '-33.44889,-70.669265',
  'Zurich', '47.376887,8.541694',
  'Auckland', '-36.84846,174.763332',
  'Sydney', '-33.86882,151.209296',
  'Londres', '51.507351,-0.127758',
  'Georgia', '32.165622,-82.900075'
)

/**
 * Poll the weather service to retrieve weather data for some cities
 *
 */
async function polling () {
  // Retrieve the coordinates of cities from cache
  const coordinates = await cache.hgetall('coordinates')

  // Iterate over the cities to request their weather data and store it in cache
  Object.keys(coordinates).forEach(city => {
    (function tryUntilSuccess () {
      console.log(`Attempting to retrieve weather data for ${city}`)
      weather.get(coordinates[city])
        .then(results => {
          console.log(`Weather data for ${city} was retrieved successfully`)
          cache.hset('weather', city, JSON.stringify(results.data))
        })
        .catch(err => {
          console.error(`Error trying to retrieve weather data for ${city}: ${err.message}`)
          cache.hset('api.errors', Math.floor(Date.now() / 1000).toString(), `${city} (${coordinates[city]})`)
          tryUntilSuccess()
        })
    })()
  })
}

// Execute polling periodically
setInterval(polling, process.env.APP_WEATHER_POLLING_INTERVAL)
