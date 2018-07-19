import dbConnection from '../models/config';

/* Ride offer controller Object */

class Rideoffers {
  static createRide(req, res) {
    const query = {
      text: 'INSERT INTO rides(destination,current_location,departure_time, seat_available,user_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [req.body.destination, req.body.current_location,
        req.body.departure_time, req.body.seat_available, req.decoded.user_id],
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
  static joinRide(req, res) {
    const rideId = parseInt(req.params.rideOfferId, 10);
    const fullName = `${req.decoded.firstName} ${req.decoded.lastName}`;
    const query = {
      text: 'SELECT * FROM rides WHERE id = $1',
      values: [rideId],
    };
    const query1 = {
      text: 'INSERT INTO rideRequest(pickup_location,departure_time,ride_id,user_id) VALUES($1, $2, $3, $4) RETURNING *',
      values: [req.body.pickup_location, req.body.departure_time,
        req.params.rideOfferId, req.decoded.user_id],
    };
    const query2 = {
      text: 'SELECT * FROM rideRequest WHERE ride_id = $1',
      values: [rideId],
    };
    return dbConnection.query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).send({
            status: 'fail',
            message: 'Ride offer does not exist',
          });
        }
        const user = result.rows[0].user_id;
        if (parseInt(user, 10) !== parseInt(req.decoded.user_id, 10)) {
          const seats = result.rows[0].seat_available;
          return dbConnection.query(query2)
            .then((result1) => {
              if (result1.rowCount < parseInt(seats, 10)) {
                return dbConnection.query(query1)
                  .then((result2) => {
                    res.status(201).send({
                      status: 'success',
                      message: 'Your request has been sent',
                      data: result2.rows[0],
                    });
                  })
                  .catch(err => res.status(500).send({
                    status: 'error',
                    message: 'Internal server error1',
                    error: err,
                    full: fullName,
                  }));
              }
              return res.status(400).send({
                status: 'fail',
                message: 'All seats have been taken',
              });
            })
            .catch(err => res.status(500).send({
              status: 'error',
              message: 'Internal server error2',
            }));
        }
        return res.status(401).send({
          status: 'fail',
          message: 'Invalid request',
        });
      })
      .catch(err => res.status(500).send({
        status: 'error',
        message: 'Internal server error3',
      }));
  }
  static getAllRideRequest(req, res) {
    const queryRideReq = {
      text: 'SELECT * FROM rideRequest WHERE ride_id = $1',
      values: [parseInt(req.params.rideOfferId, 10)],
    };
    const queryRide = {
      text: 'SELECT * FROM rides WHERE id = $1',
      values: [parseInt(req.params.rideOfferId, 10)],
    };
    return dbConnection.query(queryRide)
      .then((ride) => {
        if (req.decoded.user_id === ride.rows[0].user_id) {
          return dbConnection.query(queryRideReq)
            .then((result) => {
              if (result.rowCount > 0) {
                return res.status(200).send({
                  status: 'success',
                  data: result.rows,
                });
              }
              return res.status(404).send({
                status: 'fail',
                message: 'No ride request found',
              });
            })
            .catch(err => res.status(500).send({
              status: 'error',
              message: 'Internal server error, please try again later',
            }));
        }
        return res.status(401).send({
          status: 'fail',
          message: 'You are not authorize to perform this action',
        });
      })
      .catch(err => res.status(500).send({
        status: 'error',
        message: 'Internal server error, please try again later',
      }));
  }
}
export default Rideoffers;
