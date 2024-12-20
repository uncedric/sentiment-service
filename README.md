# Sentiment Analysis Project

## Description

The idea behind the project is to use REST API endpoints to generate reports from a social network (in this case, Reddit). The project will work as follows:

- Select a subreddit to analyze, e.g., mentalhealth, overwatch, simracing, woodworking.
  - A subreddit is a specific online community where people can create posts about the subreddit topic
- The service will fetch the latest posts and store them in the database along with their sentiment analysis results.
- Another endpoint will list all stored posts with their analysis results.

## Goal

Create a service that can be easily tweaked to analyze social media. It could help with:
- Moderating subreddits by automatically tagging content.
- Creating a bot to send alert messages when a user is posing a danger to themselves or others:
  - For example, during the creation of this demo, I used the MentalHealthSupport subreddit and noticed many concerning posts asking for help with no answers. A project like this could automatically post links to emergency numbers or support groups so users receive assistance during difficult times.

## Things I Would Improve with More Time
- Use a more robust logger instead of just `console.log`.
- Implement a Bitbucket Pipeline to automatically test, lint, and build the project when pushing code
- Add pagination for the `GET` request.
- Further abstract services to simplify unit test implementation
- Add more tests.

## Features
- Swagger
- Basic DTO Validation
- MongoDB
- Basic Unit Tests
- Sentiment Analysis
- Docker version 27.4.1

## Project Setup

**IMPORTANT:** Update the Docker Compose file to include your Google Cloud API Key. (line 15)

I chose this route rather than CLI authentication to simplify the containerization process.

The following code will start the NestJS server and MongoDB:


```bash
$ docker-compose up
```

OpenAPI docs: http://localhost:3000/api



## Compile and run the project

```bash
# development
$ npm run start
```
