import app from '../app';
import chai, { expect } from 'chai';
import chai_http from 'chai-http';

chai.use(chai_http);

describe('User api', () => {
  describe('GET /api/users ', () => {
    it('should return all users with limit of 10', async (done) => {
      const response = await chai.request(app).get('/api/users');
      expect(response.status).to.equal(200);
      done();
    });

    it('should return only one user if `limit` query param is set to 1', async (done) => {
      const response = await chai.request(app).get('/api/users').query({ limit: 1 });
      expect(response.status).to.equal(200);
      expect(response.body).to.have.lengthOf(1);
      done();
    });

    it('when there are two users in database, setting `offset` query param to 2 should return empty array', async (done) => {
      const response = await chai.request(app).get('/api/users').query({ offset: 2 });
      expect(response.status).to.equal(200);
      expect(response.body).to.have.lengthOf(0);
      done();
    });
  });
});
