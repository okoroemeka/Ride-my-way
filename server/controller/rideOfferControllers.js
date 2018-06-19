class Rideoffers {
  /**
   * @returns {Object} getAllRidesOffers
   * @param {*} req
   * @param {*} res
   */
  static getAllRideOffers(req, res) {
    const allRideOffers = req.store.ridesOffer;
    res.status(200).json(allRideOffers);
  }
  /**
   *@returns {Object} getSpecificRideOffers
   * @param {*} req
   * @param {*} res 
  */
  static getSpecificRideOffers(req, res) {
    const Id = req.params.rideOfferId;
    const rideOffer = req.store.ridesOffer[Id];
    res.status(200).json(rideOffer);
  }

  static creatRideOffer(req, res) {
    const rideOfferDetails = {
      fistName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      currentLocation: req.body.currentLocation,
      destination: req.body.destination,
      departureTime: req.body.departureTime,
    };
    const rideOfferId = req.store.ridesOffer.length;
    req.store.ridesOffer.push(rideOfferDetails);
    res.status(201).send({ rideOfferId });
  }
}
export default Rideoffers;
