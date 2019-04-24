const joi = require('@hapi/joi')

const { error, value: config } = joi.object().keys({
  REDIS_URL: joi.string().uri({ scheme: /rediss?/ }).required()
}).validate(process.env, { stripUnknown: true })

if (error) {
  throw new Error(`Cache config error: ${error.message}`)
}

module.exports = config
