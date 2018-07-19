import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import dbConnection from '../models/config';

dotenv.config();
class User {
  /**
   * @returns {object} userSignup
   * @param {*} req
   * @param {*} res
   */
  static signup(req, res) {
    const query = {
      text: 'INSERT INTO users(firstname,lastname, email,telephone,password) VALUES($1, $2 ,$3, $4, $5) RETURNING *',
      values: [req.body.firstname.trim(), req.body.lastname.trim(), req.body.email.trim(),
        parseInt(req.body.telephone.trim(), 10), bcrypt.hashSync(req.body.password.trim(), 10)],
    };
    const query2 = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email],
    };
    if ((req.body.firstname !== undefined && req.body.firstname.trim().length !== 0) &&
    (req.body.lastname !== undefined && req.body.lastname.trim().length !== 0) &&
    (req.body.email !== undefined && req.body.email.trim().length !== 0) &&
    (req.body.telephone !== undefined && req.body.telephone.trim().length !== 0) &&
    (req.body.password !== undefined && req.body.password.trim().length !== 0) &&
    (req.body.confirmPassword !== undefined && req.body.confirmPassword.trim().length !== 0)) {
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(409).send({
          status: 'fail',
          message: 'The passwords do not match',
        });
      }
      dbConnection.query(query2)
        .then((result) => {
          if (result.rowCount !== 0) {
            return res.status(409).send({
              status: 'fail',
              message: 'email alredy exists',
            });
          }
          dbConnection.query(query)
            .then((result1) => {
              if (result1.rowCount !== 1) {
                return res.status(500).send({
                  status: 'error',
                  message: 'Application error',
                });
              }
              return res.status(201).send({
                status: 'success',
                message: 'Welcome to ride my way',
                data: {
                  user_id: result1.rows[0].id,
                  firstname: result1.rows[0].firstname,
                  lastname: result1.rows[0].lastname,
                  email: result1.rows[0].email,
                  telephone: result1.rows[0].telephone,
                },
              });
            })
            .catch(error1 => res.status(500).send({
              status: 'error',
              message: 'Internal server error',
              error: error1,
            }));
        })
        .catch(error2 => res.status(500).send({
          message: 'app error',
          error: error2,
        }));
    } else {
      return res.status(409).send({
        status: 'fail',
        message: 'All fields are required please',
      });
    }
  }

  static signIn(req, res) {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [req.body.email.trim()],
    };
    if ((req.body.email !== undefined && req.body.email.trim().length !== 0) &&
    (req.body.password !== undefined && req.body.password.trim().length !== 0)) {
      return dbConnection.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            res.status(409).send({
              status: 'fail',
              message: 'Wrong email or password',
            });
          } else if (bcrypt.compareSync(req.body.password, result.rows[0].password)) {
            const userToken = jwt.sign(
              {
                user_id: result.rows[0].id,
                firstName: result.rows[0].firstname,
                lastName: result.rows[0].lastname,
                email: result.rows[0].email,
              },
              process.env.SECRET_KEY,
              {
                expiresIn: '24h',
              },
            );
            res.status(200).send({
              status: 'success',
              message: 'Login successful',
              token: userToken,
            });
          }
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
      message: 'All fields are required',
    });
  }
}

export default User;
