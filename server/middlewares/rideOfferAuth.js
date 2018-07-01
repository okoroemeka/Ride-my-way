import rideOfferStore from '../seedData/rideOfferSeedData';

class RideOfferAuth {
/**
  *@returns{function call} rideOfferExist
  *@param {*} request
  *@param {*} response
  *@param {*} next
*/
  static rideOfferExist(req, res, next) {
    const offerId = req.params.rideOfferId;
    const ride = rideOfferStore.filter(rideOffer => rideOffer.id.toString() === offerId.toString());
    if (ride.length !== 0) {
      return next();
    }
    return res.status(404).send({
      message: 'Ride offer does not exist',
    });
  }
}
export default RideOfferAuth;
