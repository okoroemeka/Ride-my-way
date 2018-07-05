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
      text: 'INSERT INTO users(first_name,last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *',
      values: [req.body.firstName, req.body.lastName, req.body.email, bcrypt.hashSync(req.body.password, 10)],
    };
    const query2 = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email],
    };
    databaseConnection.query(query2, (error, result) => {
      // releasing the client back into the pool.
      if (error) {
        return res.status(400).send(error);
      } else if (result.rowCount !== 0) {
        return res.status(409).send({
          message: 'email already exist',
        });
      }
      return databaseConnection.query(query, (err, result1) => {
        if (err) {
          res.status(400).send(err);
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
        res.status(400).send(err);
      } else if (result.rowCount !== 1) {
        res.status(409).send({
          message: 'wrong email, try again',
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
          token: userToken,
          message: 'Login successful',
        });
      }
    });

    // checking if user does not exist
  }
}


export default User;
