if (process.env.PROCESS_TYPE === 'web') {
  require('./web')
} else if (process.env.PROCESS_TYPE === 'worker') {
  require('./worker/weather-polling')
} else {
  throw new Error(`Process type "${process.env.PROCESS_TYPE}" is not recognized`)
}
