import dbConnection from '../models/config';

/* Ride offer controller Object */

class Rideoffers {
  static createRide(req, res) {
    const query = {
      text: 'INSERT INTO rides(destination,current_location,departure_time, seat_available) VALUES($1, $2, $3, $4) RETURNING *',
      values: [req.body.destination, req.body.current_location,
        req.body.departure_time, req.body.seat_available],
    };
    if ((req.body.destination !== undefined && req.body.destination.trim().length !== 0) &&
    (req.body.current_location !== undefined && req.body.current_location.trim().length !== 0) &&
    (req.body.departure_time !== undefined && req.body.departure_time.trim().length !== 0) &&
    (req.body.seat_available !== undefined && req.body.seat_available.trim().length !== 0)) {
      return dbConnection.query(query)
        .then((result) => {
          res.status(201).send({
            status: 'success',
            message: 'Ride created successfully',
            data: result.rows[0],
          });
        })
        .catch((error) => {
          res.status(500).send({
            status: 'error',
            message: 'Internal server error, try again later',
          });
        });
    }
    return res.status(401).send({
      status: 'fail',
      message: 'All feilds are required',
    });
  }

  static getAllRideOffers(req, res) {
    const query = {
      text: 'SELECT * FROM rides',
    };
    return dbConnection.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).send({
            status: 'fail',
            message: 'No rides available',
          });
        }
        return res.status(200).send({
          status: 'success',
          data: result.rows,
        });
      })
      .catch(error => res.status(500).send({
        status: 'error',
        message: 'Internal server error',
      }));
  }

  static getSpecificRideOffer(req, res) {
    const rideId = parseInt(req.params.rideOfferId, 10);
    const query = {
      text: 'SELECT * FROM rides WHERE id = $1',
      values: [rideId],
    };
    return dbConnection.query(query)
      .then((result) => {
        if (result.rowCount !== 0) {
          return res.status(200).send({
            status: 'success',
            data: result.rows,
          });
        }
        return res.status(404).send({
          status: 'fail',
          message: 'Ride offer not found',
        });
      })
      .catch(error => res.status(500).send({
        status: 'error',
        message: 'Internal server error',
      }));
  }
}
export default Rideoffers;
