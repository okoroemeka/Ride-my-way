import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../bin/www';

const { expect, assert, should } = chai;

should();
chai.use(chaiHttp);

describe('Get request for/rides', () => {
  it('should return status 200 for all request', (done) => {
    chai.request(app)
      .get('/rides')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        assert.isString(res.body.message, 'Welcome to the begining of nothingness');
        done();
      });
  });
});
