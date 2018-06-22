import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// import seed data
import store from './server/seedData/seed';

// Importing controllers
import rideOfferAuth from './server/middlewares/rideOfferAuth';
import rideOffersController from './server/controller/rideOfferControllers';
import userController from './server/controller/userController';

// Initialise express 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// Attaching dummy database to the req object
app.use((req, res, next) => {
  req.store = store;
  next();
});

// Adding routes to controller(Routing)
app.post('/api/v1/auth/signup', userController.userSignup);
app.post('/api/v1/auth/signin', userController.userSignIn);
app.get('/api/v1/rides', rideOffersController.getAllRideOffers);
app.get('/api/v1/rides/:rideOfferId', rideOffersController.getSpecificRideOffers);
app.post('/api/v1/rides', rideOffersController.creatRideOffer);
app.post('/api/v1/rides/:rideOfferId/requests', rideOfferAuth.rideOfferExist, rideOffersController.joinRide);
app.put('/api/v1/rides/:rideOfferId', rideOfferAuth.rideOfferExist, rideOffersController.updateRideOfferDetails);
app.delete('/api/v1/rides/:rideOfferId', rideOfferAuth.rideOfferExist, rideOffersController.deleteRideOffer);

// Export app
export default app;
