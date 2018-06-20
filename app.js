import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import rideOfferAuth from './server/middlewares/rideOfferAuth';
import rideOffersController from './server/controller/rideOfferControllers';
import userController from './server/controller/signupController';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

const store = {
  ridesOffer: [{
    firstName: 'emeka',
    lastName: 'okoro',
    phoneNumber: 23408945976,
    currentLocation: 'Ikeja',
    destination: 'Ajaa',
    DepartureTime: '12:00pm',
    rideRequests: [],
  },
  ],
  user: [{
    firstName: 'emeka',
    lastName: 'okoro',
    email: 'okoro@gmail.com',
    password: 'wise2020',
  }],
};

app.use((req, res, next) => {
  req.store = store;
  next();
});

app.post('/api/v1/auth/signup', userController.userSignup);
app.get('/api/v1/rides', rideOffersController.getAllRideOffers);
app.get('/api/v1/rides/:rideOfferId', rideOffersController.getSpecificRideOffers);
app.post('/api/v1/rides', rideOffersController.creatRideOffer);
app.post('/api/v1/rides/:rideOfferId/requests', rideOfferAuth.rideOfferExist, rideOffersController.joinRide);
app.put('/api/v1/rides/:rideOfferId', rideOfferAuth.rideOfferExist, rideOffersController.updateRideOfferDetails);
app.delete('/api/v1/rides/:rideOfferId', rideOfferAuth.rideOfferExist, rideOffersController.deleteRideOffer);

export default app;
