// Import controllers
import rideOffers from '../controller/rideOffers';
// import rideOfferAuth from '../middlewares/rideOfferAuth';

import user from '../controller/user';

// Adding routes to controller(Routing)

const routes = (app) => {
  app.post('/api/v1/auth/signup', user.signup);
  app.post('/api/v1/auth/signin', user.signIn);
  app.get('/api/v1/rides', rideOffers.getAllRideOffers);
  // app.get('/api/v1/rides/:rideOfferId', rideOffers.getSpecificRideOffer);
  app.post('/api/v1/rides', rideOffers.createRide);
  // app.post('/api/v1/rides/:rideOfferId/requests', rideOffers.joinRide);
  // app.put('/api/v1/rides/:rideOfferId', rideOffers.updateRideOfferDetails);
  // app.delete('/api/v1/rides/:rideOfferId', rideOffers.deleteRideOffer);
};

export default routes;
