const joi = require('@hapi/joi')

const { error, value: config } = joi.object().keys({
  APP_WEATHER_POLLING_INTERVAL: joi.number().min(1000).required()
}).validate(process.env, { stripUnknown: true })

if (error) {
  throw new Error(`Web config error: ${error.message}`)
}

module.exports = config
