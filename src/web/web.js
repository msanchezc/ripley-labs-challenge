const io = require('socket.io')
const moment = require('moment-timezone')
const cache = require('../components/cache')
const config = require('./config')

const server = io.listen(config.PORT)

/**
 * Get weather data from cache and give it a format suitable for clients
 *
 * @returns {Object} Formatted weather data
 */
async function getUpdate () {
  // Get weather data from cache
  const weather = await cache.hgetall('weather')

  // Iterate over cities to give a format to the update object
  Object.keys(weather).forEach(city => {
    let data = JSON.parse(weather[city])
    weather[city] = {
      timezone: data.timezone,
      latitude: data.latitude,
      longitude: data.longitude,
      summary: data.currently.summary,
      time: moment.tz(data.currently.time * 1000, data.timezone).format('HH:mm'),
      temperature: data.currently.temperature
    }
  })

  return weather
}

// Send first update on connection
server.on('connection', async socket => {
  console.log('client connected')
  const update = await getUpdate()
  console.log(update)
  socket.emit('update', update)
})

// Update all connected clients periodically
setInterval(async () => {
  const update = await getUpdate()
  server.sockets.emit('update', update)
}, config.APP_CLIENT_UPDATE_INTERVAL)
