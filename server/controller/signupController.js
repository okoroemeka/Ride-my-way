class User {
  /**
   * @returns {object} userSignup
   * @param {*} req
   * @param {*} res
   */
  static userSignup(req, res) {
    const newUserEmail = req.body.email;
    const newuserId = req.store.user.length;

    // new user details
    const newUserDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    const userAlreadyExist = req.store.user.filter(user => user.email === newUserEmail);

    // checking if user already exists
    if (userAlreadyExist.length !== 0) {
      return res.status(409).send({
        message: 'user already exists',
      });
    }
    //  checking if the passwords match
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).send({
        message: 'The passwords do not match, please type them again',
      });
    }

    // creating new user
    req.store.user.push(newUserDetails);
    return res.status(201).send({
      message: 'Welcome to Ride my way',
      userId: newuserId,
    });
  }
}

export default User;
