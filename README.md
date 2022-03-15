<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ npm install
```

## Running the app
```bash
cp .env.example .env
docker-compose up -d
```

## Test

```bash
$ npm run test:e2e
```

# Fetch Records Server

A basic project that contains on Nest.js

##### The project is hosted on Google Cloud Run, to fetch records use below curl command.
Production Url: `https://nest-mongo-jlbh5py2ja-ez.a.run.app`

```
curl --location --request POST 'https://nest-mongo-jlbh5py2ja-ez.a.run.app/records' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate": "2012-01-01",
    "endDate": "2014-12-30",
    "minCount": 10,
    "maxCount": 100
}'
```
Documentation can be found on https://nest-mongo-jlbh5py2ja-ez.a.run.app/documentation
## Table of Contents

- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [HealthCheck](#healthcheck)
- [Validation](#validation)
- [Error Handling](#error-handling)


## API Documentation

To view the list of available APIs and their specifications, go to `{{base_url}}/documentation` in your browser. This documentation page is automatically generated with `Swagger`

## Environment Variables

The environment variables can be found and modified in the `.env` file. If not found, create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URI=mongodb://mongo
```


## Features

- **API documentation**: with [swagger](https://github.com/swagger-api/swagger-ui)
- **Google Cloud Run**: using [gcloud run](https://cloud.google.com/run)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Testing**: Integration tests using [Jest](https://jestjs.io)
- **Validation**: request data validation using [class-validator](https://github.com/typestack/class-validator)
- **Error handling**: centralized error handling mechanism

## HealthCheck

Healtcheck for cloud native environment like Kubernetes also this endpoint includes database level healthcheck. So thats mean when your application lose database connection, Kubernetes can handle this situation.

### API Endpoints

List of available routes:

**Record routes**:\
`POST /records` - get records based on input request


## Validation

Request data is validated using `class-validator`

The validation schemas are defined in the `src/record/controller/requests` directory.


## Error Handling

The app has a centralized error handling mechanism.

The error handling filter sends an error response, which has the following format:

```json
{
  "code": 0,
  "message": ["message"],
  "error": "Bad Request exception"
}
```
