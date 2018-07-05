import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import databaseConnection from '../models/config';

dotenv.config();
class User {
  /**
   * @returns {object} userSignup
   * @param {*} req
   * @param {*} res
   */
  static signup(req, res) {
    const query = {
      text: 'INSERT INTO users(first_name, last_name, phone_number, car_type, car_color, plate_number, email, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values: [req.body.firstName, req.body.lastName, req.body.phone_number, req.body.car_type,
        req.body.car_color, req.body.plate_number,
        req.body.email, bcrypt.hashSync(req.body.password, 10)],
    };
    const query2 = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email],
    };
    databaseConnection.query(query2, (error, result) => {
      // releasing the client back into the pool.
      if (error) {
        return res.status(500).send({
          status: 'error',
          message: 'Unable to communicate with server',
        });
      } else if (result.rowCount !== 0) {
        return res.status(409).send({
          status: 'fail',
          message: 'email already exist',
        });
      }
      return databaseConnection.query(query, (err, result1) => {
        if (err) {
          res.status(500).send({
            status: 'error',
            message: 'Unable to communicate with server',
          });
        }
        const accessToken = jwt.sign(
          {
            user_id: result1.rows[0].id,
            email: result1.rows[0].email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: 60 * 60,
          },
        );
        res.status(201).send({
          status: 'success',
          message: ' Welcome to Ride my way',
          token: accessToken,
        });
      });
    });
  }

  static signIn(req, res) {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email],
    };
    return databaseConnection.query((query), (err, result) => {
      if (err) {
        res.status(400).send({
          status: 'error',
          message: 'Unable to communicate with server',

        });
      } else if (result.rowCount !== 1) {
        res.status(409).send({
          status: 'fail',
          message: 'wrong email or password, try again',
        });
      } else if (bcrypt.compareSync(req.body.password, result.rows[0].password)) {
        const userToken = jwt.sign(
          {
            id: result.id,
            username: result.email,
          },
          process.env.SECRET_KEY,
          { expiresIn: 60 * 60 },
        );
        res.status(200).send({
          status: 'success',
          message: 'Login successful',
          token: userToken,
        });
      }
    });

    // checking if user does not exist
  }
}


export default User;
