import rideOfferStore from '../seedData/rideOfferSeedData';
import rideRequestStore from '../seedData/rideRequestSeedData';
/*Ride offer controller Object*/

class Rideoffers {
  /**
   * @returns {array} getAllRidesOffers
   * @param {*} req
   * @param {*} res
   */
  static getAllRideOffers(req, res) {
    if (req.query.location) {
      const currentLocation = req.query.location.toLowerCase();
      const rideOffers = rideOfferStore
        .filter(rideOffer => rideOffer.currentLocation === currentLocation);
      if (rideOffers.length !== 0) {
        return res.status(200).send(rideOffers);
      }
      return res.status(404).send({
        message: 'No ride offers within this location',
      });
    }
    if (rideOfferStore.length === 0) {
      return res.status(404).send({
        message: 'No ride offers presently',
      });
    }
    return res.status(200).send(rideOfferStore);
  }
  /**
   *@returns {Object} getSpecificRideOffers
   * @param {*} req
   * @param {*} res
  */
  static getSpecificRideOffer(req, res) {
    const Id = req.params.rideOfferId;
    // callback function
    const ride = rideOfferStore.filter(rideOffer => rideOffer.id.toString() === Id.toString());
    // const specificRide = rideOfferStore.find(rideOffer);
    if (ride.length === 1) {
      return res.status(200).send(ride[0]);
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
    const rideOfferId = rideOfferStore.length + 1;
    const rideOfferDetails = {
      id: rideOfferId,
      fisrtName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      currentLocation: req.body.currentLocation.toLowerCase(),
      destination: req.body.destination,
      departureTime: req.body.departureTime,
    };
    rideOfferStore.push(rideOfferDetails);
    res.status(201).send(rideOfferDetails);
  }

  /**
   *@returns {Object} joinRide
   * @param {*} req
   * @param {*} res
  */
  static joinRide(req, res) {
    const rideRequestDetails = {
      id: req.params.rideOfferId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      currentLocation: req.body.currentLocation,
      departureTime: req.body.departureTime,
    };
    rideRequestStore.push(rideRequestDetails);
    return res.status(201).send(rideRequestDetails);
  }

  /**
   *@returns {Object} updateRideOfferDetails
   * @param {*} req
   * @param {*} res
  */
  static updateRideOfferDetails(req, res) {
    const Id = req.params.rideOfferId;
    const informationToUpdate = {
      id: Id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      currentLocation: req.body.currentLocation,
      departureTime: req.body.departureTime,
    };
    rideOfferStore[Id - 1] = informationToUpdate;
    return res.status(200).send(rideOfferStore[Id - 1]);
  }

  /**
   *@returns {Object} deleteRideOffer
   * @param {*} req
   * @param {*} res
  */
  static deleteRideOffer(req, res) {
    const offerId = req.params.rideOfferId;
    rideOfferStore.splice(offerId - 1);
    return res.status(204).send();
  }
}
export default Rideoffers;
