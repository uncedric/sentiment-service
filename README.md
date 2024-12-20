# Sentiment analysis project

## Description

The idea behing the project it's to use a rest api endpoints to generate reports from a social network (in this case reddit). The project will work like this:

- Select a subreddit to analyze IE: mentalhealth
- The service will get the latest created posts and store them in the database alongside with their sentiment analysis results
- expose another endpoint to list all stored posts 

## Things I would improve with more time
- I'd use a more robust logger instead of just console.log
- A bitbucket pipeline to automatically test, lint and build
- Pagination for the GET request
- 


## Project setup

```bash
$ docker-compose up
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
