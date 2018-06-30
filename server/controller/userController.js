/*User signin and sign up controller object*/
import userSeedData from '../seedData/userSeedData';

class User {
  /**
   * @returns {object} userSignup
   * @param {*} req
   * @param {*} res
   */
  static userSignup(req, res) {
    const newUserEmail = req.body.email;
    const newUserId = userSeedData.length + 1;

    // new user details
    const newUserDetails = {
      id: newUserId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    const userAlreadyExist = userSeedData.filter(user => user.email === newUserEmail);

    // checking if user already exists
    if (userAlreadyExist.length !== 0) {
      return res.status(409).send({
        message: 'user already exists',
      });
    }
    userSeedData.push(newUserDetails);
    return res.status(201).send({
      message: 'Welome to ride my way'
    });
  }

  static userSignIn(req, res) {
    // get user information
    // const userInformation = {
    //   email: req.body.email,
    //   password: req.body.password,
    // };

    // checking if user does not exist
    const userExist = userSeedData
      .filter(user => user.email === req.body.email && user.password === req.body.password);

    if (userExist.length !== 0) {
      return res.status(200).send({
        message: 'Log in successful',
      });
    }
    return res.status(401).send({
      message: 'Your email or password is incorrect',
    });
  }
}

export default User;
