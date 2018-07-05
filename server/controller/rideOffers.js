import databaseConnection from '../models/config';

/* Ride offer controller Object */

class Rideoffers {
  static createRide(req, res) {
    const query = {
      text: 'INSERT INTO rides(destination,current_location,departure_time, user_id ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [req.body.destination, req.body.current_location, req.body.departure_time, userId],
    };
    return databaseConnection.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          status: 'error',
          message: 'Unable to communicate with server',
        });
      }
      res.status(201).send({
        status: 'success',
        data: result.rows,
      });
    });
  }

  static getAllRideOffers(req, res) {
    const query = {
      text: 'SELECT * FROM rides',
    };
    return databaseConnection.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          status: 'error',
          message: 'Unable to communicate with server',
        });
      } else if (result.rowCount === 0) {
        res.status(404).send({
          status: 'fail',
          data: { text: 'No ride offer available' },
        });
      }
      res.status(200).send({ 
        status: 'success',
        data: result.rows,
      });
    });
  }

  static getSpecificRideOffer(req, res) {
    const rideId = parseInt(req.params.rideOfferId, 10);
    const query = {
      text: 'SELECT * FROM rides WHERE id = $1',
      values: [rideId],
    };
    return databaseConnection.query(query, (err, result) => {
      if (err) {
        res.status(500).send({
          status: 'error',
          message: 'Unable to communicate with server',
        });
      } else if (result.rowCount === 0) {
        res.status(404).send({
          status: 'fail',
          message: 'Ride offer not found',
        });
      }
      res.status(200).send({
        status: 'success',
        data: result.rows[0],
      });
    });
  }
}
export default Rideoffers;
