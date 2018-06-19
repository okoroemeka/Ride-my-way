import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import rideOffersController from './server/controller/rideOfferControllers';

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
    rideRequest: [],
  },
  ],
};

app.use((req, res, next) => {
  req.store = store;
  next();
});

app.get('/api/v1/rides', rideOffersController.getAllRideOffers);
// app.get('/api/v1/rides/:rideOfferId', rideOffersController.getSpecificRideOffers);
// app.post('/api/v1/rides', rideOffersController.creatRideOffer);

export default app;
