import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../bin/www';

const { expect, assert, should } = chai;

should();
chai.use(chaiHttp);

// Test for get all ride offers

describe('Get request for /api/v1/rides', () => {
  it('should return status 200 for get all rides offer request', (done) => {
    chai.request(app)
      .get('/api/v1/rides')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
  });
});

// Test for get specif ride
describe('Get request for /api/v1/rides/ridesId', () =>{
  it('should return status 200 for get specific ride offer request', (done) => {
    chai.request(app)
      .get('/api/v1/rides/0')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});

// Test for create ride offer
describe('POST request for /api/v1/rides', () =>{
  it('should return status 201 for post ride offer', (done) => {
    const newRideoffer = {
      firstName: 'ebuka',
      lastName: 'mbaso',
      phoneNumber: 23408945976,
      currentLocation: 'Ajaa',
      destination: 'mary Land',
      DepartureTime: '12:00pm',
    };
    chai.request(app)
      .post('/api/v1/rides')
      .send(newRideoffer)
      .type('form')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        assert.isNumber(res.body.rideOfferId);
        done();
      });
  });
});

// Test for Join ride.
describe('POST request for /api/v1/rides/ridesId/requests', () =>{
  it('should return status 201 for post ride request', (done) => {
    const newRideRequest = {
      firstName: 'ebuka',
      lastName: 'mbaso',
      phoneNumber: 23408945976,
      currentLocation: 'Ajaa',
      DepartureTime: '12:00pm',
    };
    chai.request(app)
      .post('/api/v1/rides/0/requests')
      .send(newRideRequest)
      .type('form')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        assert.isNumber(res.body.rideRequestId);
        done();
      });
  });
});

// Test for Get ride request that has not been created yet.
describe('Get request for /api/v1/rides/ridesId', () => {
  it('should return status 404 for post ride request that have not been created yet', (done) => {
    chai.request(app)
      .get('/api/v1/rides/2')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        assert.isString(res.body.message);
        assert.equal(res.body.message, 'Ride offer does not exist');
        done();
      });
  });
});

// Test for update ride offer
describe('PUT requst for /api/v1/rides/:ridesId', () => {
  it('should return status 200 for put ride request', (done) => {
    const updateRideRequest = {
      DepartureTime: '12:00pm',
    };
    chai.request(app)
      .put('/api/v1/rides/0')
      .send(updateRideRequest)
      .type('form')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        assert.isString(res.body.message);
        assert.equal(res.body.message, 'Ride details updated');
        done();
      });
  });
});

// Test for delete ride offer
describe('Delete requst for /rides/:ridesId', () => {
  it('should return status 204 for delete ride offer request', (done) => {
    chai.request(app)
      .delete('/api/v1/rides/0')
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});

// Test for user sign up
describe('Post request for /api/v1/auth/signup', () => {
  it('should return 201 for post user signup request', (done) => {
    const newUser = {
      firstName: 'emeka',
      lastName: 'mika',
      email: 'ewq@yahoo.com',
      password: 'weed',
      confirmPassword: 'weed',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .type('form')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        assert.isString(res.body.message);
        assert.isNumber(res.body.userId);
        assert.equal(res.body.message, 'Welcome to Ride my way');
        done();
      });
  });

// Test for user signup that already exists
  it('should return 409 for post user signup request that already exists', (done) => {
    const newUser = {
      firstName: 'emeka',
      lastName: 'mika',
      email: 'ewq@yahoo.com',
      password: 'weed',
      confirmPassword: 'weed',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .type('form')
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        assert.isString(res.body.message);
        assert.equal(res.body.message, 'user already exists');
        done();
      });
  });

  // Test for user with wrong credentials
  it('should return 400 for post user signup request with mismatched password', (done) => {
    const newUser = {
      firstName: 'emeka',
      lastName: 'mika',
      email: 'wesd@yahoo.com',
      password: 'weesd',
      confirmPassword: 'sweed',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .type('form')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        expect(res.body).be.an('object');
        assert.isString(res.body.message);
        assert.equal(res.body.message, 'The passwords do not match, please type them again');
        done();
      });
  });
});
