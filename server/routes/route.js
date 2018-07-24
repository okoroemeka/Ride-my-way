// Import controllers
import rideOffers from '../controller/rideOffers';
import verifyToken from '../middleware/auth';

import user from '../controller/user';

// Adding routes to controller(Routing)

const routes = (app) => {
  app.post('/api/v1/auth/signup', user.signup);
  app.post('/api/v1/auth/signin', user.signIn);
  app.get('/api/v1/rides', verifyToken, rideOffers.getAllRideOffers);
  app.get('/api/v1/rides/:rideOfferId', verifyToken, rideOffers.getSpecificRideOffer);
  app.post('/api/v1/rides', verifyToken, rideOffers.createRide);
  app.post('/api/v1/rides/:rideOfferId/requests', verifyToken, rideOffers.joinRide);
  app.get('/api/v1/rides/:rideOfferId/requests', verifyToken, rideOffers.getAllRideRequest);
  app.put('/api/v1/rides/:rideOfferId/requests/:requestId', verifyToken, rideOffers.updateRideRequest);
  app.delete('/api/v1/rides/:rideOfferId', verifyToken, rideOffers.deleteRideOffer);
};

export default routes;
