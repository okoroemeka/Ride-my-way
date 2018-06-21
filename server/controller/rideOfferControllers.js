class Rideoffers {
  /**
   * @returns {Object} getAllRidesOffers
   * @param {*} req
   * @param {*} res
   */
  static getAllRideOffers(req, res) {
    if (req.query.location) {
      const currentLocation = req.query.location;
      const rideOffers = req.store.ridesOffer
        .filter(rideOffer => rideOffer.currentLocation === currentLocation);
      if (rideOffers.length !== 0) {
        return res.status(200).send(rideOffers);
      }
      return res.status(404).send({
        message: 'No ride offers within this location',
      });
    }
    const allRideOffers = req.store.ridesOffer;
    return res.status(200).send(allRideOffers);
  }
  /**
   *@returns {Object} getSpecificRideOffers
   * @param {*} req
   * @param {*} res
  */
  static getSpecificRideOffers(req, res) {
    const Id = req.params.rideOfferId;
    const rideOffer = req.store.ridesOffer[Id];
    if (rideOffer) {
      return res.status(200).send(rideOffer);
    }
    return res.status(404).send({
      message: 'Ride offer does not exist',
    });
  }

  /**
   *@returns {Object} creatRideOffer
   * @param {*} req
   * @param {*} res
  */
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

  /**
   *@returns {Object} joinRide
   * @param {*} req
   * @param {*} res
  */
  static joinRide(req, res) {
    const rideRequestDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      currentLocation: req.body.currentLocation,
      departureTime: req.body.departureTime,
    };
    const offerId = req.params.rideOfferId;
    const rideRequestId = req.store.ridesOffer[offerId].rideRequests.length;
    req.store.ridesOffer[offerId].rideRequests.push(rideRequestDetails);
    res.status(201).send({ rideRequestId });
  }

  /**
   *@returns {Object} updateRideOfferDetails
   * @param {*} req
   * @param {*} res
  */
  static updateRideOfferDetails(req, res) {
    const offerId = req.params.rideOfferId;
    const informationToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      currentLocation: req.body.currentLocation,
      departureTime: req.body.departureTime,
    };
    req.store.ridesOffer[offerId] = informationToUpdate;
    return res.status(200).send({
      message: 'Ride details updated',
    });
  }

  /**
   *@returns {Object} deleteRideOffer
   * @param {*} req
   * @param {*} res
  */
  static deleteRideOffer(req, res) {
    const offerId = req.params.rideOfferId;
    req.store.ridesOffer.splice(offerId, 1);
    return res.status(204).send();
  }
}
export default Rideoffers;
