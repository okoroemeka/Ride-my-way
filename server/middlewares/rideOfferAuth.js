class RideOfferAuth {
/**
  *@returns{function call} rideOfferExist 
  *@param {*} request
  *@param {*} response
  *@param {*} next
*/
  static rideOfferExist(req, res, next) {
    const offerId = req.params.rideOfferId;
    const rideOffer = req.store.ridesOffer[offerId];
    if (!rideOffer) {
      return res.status(404).send({
        message: 'Ride offer does not exist',
      });
    }
    return next();
  }
}
export default RideOfferAuth;
