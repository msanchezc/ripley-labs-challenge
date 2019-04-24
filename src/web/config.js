const joi = require('@hapi/joi')

const { error, value: config } = joi.object().keys({
  PORT: joi.number().default(3000),
  APP_CLIENT_UPDATE_INTERVAL: joi.number().min(1000).required()
}).validate(process.env, { stripUnknown: true })

if (error) {
  throw new Error(`Web config error: ${error.message}`)
}

module.exports = config
