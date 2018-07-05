import databaseConnection from '../models/config';

/* Ride offer controller Object */

class Rideoffers {
  static createRide(req, res) {
    const query = {
      text: 'INSERT INTO rides(first_name,last_name,phone_number,destination,current_location,departure_time, user_id ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [req.body.first_name, req.body.last_name, req.body.phone_number,
        req.body.destination, req.body.current_location, req.body.departure_time, req.body.user_id],
    };
    return databaseConnection.query(query, (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(201).send(result.rows);
    });
  }

  // static getAllRideOffers(req, res) {
  //   const query = {
  //     text: 'SELECT * FROM rides',
  //   };
  //   return databaseConnection.query(query, (err, result) => {
  //     if (err) {
  //       res.status(400).send(err);
  //     } else if (result.rowCount === 0) {
  //       res.status(404).send({
  //         message: 'No ride offer available',
  //       });
  //     }
  //     res.status(200).send(result.rows);
  //   });
  // }

  // static getSpecificRideOffer(req, res) {
  //   const query = {
  //     text: 'SELECT * FROM rides WHERE id = $1',
  //     values: [req.params.id],
  //   };
  //   return databaseConnection.query(query, (err, result) => {
  //     if (err) {
  //       res.status(400).send(err);
  //     }
  //     res.status(200).send(result);
  //   });
  // }
}
export default Rideoffers;
