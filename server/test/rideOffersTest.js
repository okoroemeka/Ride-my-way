import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../bin/www';

const { expect, assert, should } = chai;

should();
chai.use(chaiHttp);

describe('Get request for /rides', () => {
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

describe('Get request for /api/v1/rides', () =>{
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

describe('POST request for /rides', () =>{
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

describe('POST request for /rides/:ridesId/requests', () =>{
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

describe('POST request for /rides/:ridesId/requests', () =>{
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

describe('PUT requst for /rides/:ridesId', () => {
  it('should return status 200 for  put ride request to update a specific ride', (done) => {
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
