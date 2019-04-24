# Ripley Labs Challenge - Backend

## Overview
This application is continuously polling the [Dark Sky API](https://darksky.net/dev) to send current weather conditions to connected clients via WebSockets.

## Installation
After cloning the repo, you must install the project's dependencies as usual in a Node.js application by navigating to its root folder and issuing the following command in a terminal:

`$ npm install`

*Note*: To run the preceding command, [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) must be installed on your system.

## Usage
To run the application in *production* you can use the following command:

`$ npm start`

Alternatively, you can run the application in *development* by issuing:

`$ npm run dev`

This last command assumes that you use [dotenv](https://github.com/motdotla/dotenv) along with a `.env` file to configure the environment.

## Configuration
The following settings must be set as environment variables

* `REDIS_URL`: Redis connection string.
* `FORECAST_API_BASEURL`: Base URL for [Dark Sky API](https://darksky.net/dev).
* `FORECAST_API_SECRET`: Secret key for Dark Sky API.
* `FORECAST_API_LANG`: Language used in weather reports summaries. Defaults to `es` (spanish).
* `FORECAST_API_UNITS`: Units used in weather reports. Defaults to `si` (International System of Units).
* `FORECAST_API_EXCLUDE`: Blocks to exclude from weather reports. Nothing is exluded by default.
* `APP_WEATHER_POLLING_INTERVAL`: Milliseconds between requests to Dark Sky API.
* `APP_CLIENT_UPDATE_INTERVAL`: Milliseconds between updates to connected clients.

## Testing
To run the tests, execute the following:

`$ npm test`

## Author
Manuel Sánchez Castro [manuel.sanchez@linux.com](mailto:manuel.sanchez@linux.com)
