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
      text: 'INSERT INTO rideRequest(full_name,pickup_location,departure_time,ride_id,user_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [fullName, req.body.pickup_location, req.body.departure_time,
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
              if (result1.rowCount <= parseInt(seats, 10)) {
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
  static updateRideRequest(req, res) {
    const { action } = req.body;
    const { rideOfferId, requestId } = req.params;
    const query2 = {
      text: 'SELECT * FROM rideRequest WHERE id = $1',
      values: [requestId],
    };
    const queryRideReq = {
      text: 'UPDATE rideRequest SET status=$1 WHERE id=$2 AND ride_id=$3 RETURNING *',
      values: [action, requestId, rideOfferId],
    };
    return dbConnection.query('SELECT * FROM rides WHERE id = $1', [rideOfferId])
      .then((rideResult) => {
        if (rideResult.rowCount === 0) {
          return res.status(404).send({
            status: 'fail',
            message: 'Ride offer does not exist',
          });
        } else if (rideResult.rows[0].user_id !== req.decoded.user_id) {
          return res.status(401).send({
            status: 'fail',
            message: 'You are not elegible to perform this action',
          });
        } else if(rideResult.rows[0].seat_available < 1){
          return res.status(400).send({
            status:'fail',
            message: 'No seats available',
          })
        }
        dbConnection.query(query2)
          .then((reqResult) => {
            if (reqResult.rowCount < 1) {
              return res.status(404).send({
                status: 'fail',
                message: 'ride request not found',
              });
            } else if (reqResult.rows[0].status === 'pending') {
              if (action !== 'accept' && action !== 'reject') {
                return res.status(400).send({
                  status: 'fail',
                  message: 'Specify if you want to accept or reject this ride',
                });
              }
              return dbConnection.query(queryRideReq)
                .then((updateResult) => {
                  if (action === 'accept') {
                    return res.status(200).send({
                      status: 'success',
                      message: 'request accepted',
                      data: updateResult.rows[0],
                    });
                  }
                  return res.status(200).send({
                    status: 'success',
                    message: 'Request to join ride was rejected',
                    data: updateResult.rows[0],
                  });
                })
                .catch(err => res.status(500).send({
                  status: 'error',
                  message: 'internal server error,splease try agin later',
                }));
            }
            return res.status(400).send({
              status: 'fail',
              message: 'you have already responded to this request',
            });
          })
          .catch(err => res.status(500).send());
      })
      .catch(err => res.status(500).send({
        status: 'error1',
        message: 'Internal server error, please try again later',
      }));
  }
}
export default Rideoffers;
