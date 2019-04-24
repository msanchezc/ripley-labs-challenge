const joi = require('@hapi/joi')

const { error, value: config } = joi.object().keys({
  FORECAST_API_BASEURL: joi.string().uri({ scheme: /https?/ }).required(),
  FORECAST_API_SECRET: joi.string().required(),
  FORECAST_API_LANG: joi.string().default('es'),
  FORECAST_API_UNITS: joi.string().default('si'),
  FORECAST_API_EXCLUDE: joi.string().default('')
}).validate(process.env, { stripUnknown: true })

if (error) {
  throw new Error(`Forecast API config error: ${error.message}`)
}

module.exports = config
