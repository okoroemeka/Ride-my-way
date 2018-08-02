# Ride-my-way

[![Build Status](https://travis-ci.org/okoroemeka/Ride-my-way.svg?branch=features)](https://travis-ci.org/okoroemeka/Ride-my-way)  [![Coverage Status](https://coveralls.io/repos/github/okoroemeka/Ride-my-way/badge.svg?branch=features)](https://coveralls.io/github/okoroemeka/Ride-my-way?branch=features)  [![Maintainability](https://api.codeclimate.com/v1/badges/35bda23b07c19213322d/maintainability)](https://codeclimate.com/github/okoroemeka/Ride-my-way/maintainability)

Ride-my-way app is a car pooling application that connects passengers to car drivers with empty seats that wish to share their rides.

## Project overview 

A template for ride-my-app with the features below.

## Required features

1. Users can signup and sign In
2. Users can offer rides
3. Driver can request to join a ride offer
4. Users can view ride offers and respond to it
5. Users can view profile and edit profile
6. Driver can accept or reject a ride request
7. Driver can delete ride offer

## Technologies used

1. Html and Css on the front end
2. Nodejs
3. Expressjs frame work
4. Mocha,Chai,Chai-Http for test

## API End Points

|Verb   |Enpoints                           | Action               | Description                  |
|:------|:----------------------------------|:---------------------|:-----------------------------|
|GET    |/rides                             |fetch all ride offers |Get all available ride offer  |
|POST   |/rides                             |create ride offer     |creates a new ride offer      |
|GET    |/rides/:rideId                     |fetch specific ride   |Respond to a ride offer       |
|POST   |/rides/:rideId/request             |create ride request   |Join ride                     |
|POST   |/auth/signup                       |create user           |Sign up to the app            |
|POST   |/auth/signIn                       |log in user           |Log in to the app             |
|PUT    |/ride/:rideId/request/:requestId   |respond to ride offer |Respond to ride request       |
|GET    |/ride/:rideId/request              |get all ride request  |View all ride request         |
|DELETE |/rides/:rideId                     |delete ride offer     |Remove a ride                 |

## Setting up Locally

1. Clone this repository to your local machine
2. cd to `ride-my-way`
3. Run `npm install`
4. Start app with `npm start`

## Test 

Run `npm test`

## Author

Okoro Emeka. 