// Import controllers
import rideOffersController from '../controller/rideOfferControllers';
import rideOfferAuth from '../middlewares/rideOfferAuth';
import userController from '../controller/userController';

// Adding routes to controller(Routing)

const routes = (app) => {
  app.post('/api/v1/auth/signup', userController.userSignup);
  app.post('/api/v1/auth/signin', userController.userSignIn);
  app.get('/api/v1/rides', rideOffersController.getAllRideOffers);
  app.get('/api/v1/rides/:rideOfferId', rideOffersController.getSpecificRideOffers);
  app.post('/api/v1/rides', rideOffersController.creatRideOffer);
  app.post('/api/v1/rides/:rideOfferId/requests', rideOfferAuth.rideOfferExist, rideOffersController.joinRide);
  app.put('/api/v1/rides/:rideOfferId', rideOfferAuth.rideOfferExist, rideOffersController.updateRideOfferDetails);
  app.delete('/api/v1/rides/:rideOfferId', rideOfferAuth.rideOfferExist, rideOffersController.deleteRideOffer);
};

export default routes;
