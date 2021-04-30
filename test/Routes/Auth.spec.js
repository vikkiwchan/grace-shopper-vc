const { expect } = require('chai');
const {
  db,
  models: { User },
} = require('../../server/db/index');
const app = require('supertest')(require('../../server/app.js'));

describe('Auth routes', () => {
  let newUser;
  beforeEach(async () => {
    // Create and save an example user before each test.
    newUser = new User({
      email: 'test@email.com',
      password: '1234',
      phoneNumber: '1234567890',
      firstName: 'Jane',
      lastName: 'Doe',
    });
    await newUser.save();
  });
  afterEach(async () => {
    // Delete the example user after each test to avoid unique constraint errors.
    await newUser.destroy();
  });

  // Q: why is this test failing?
  describe('POST /api/auth', () => {
    describe('with valid credentials', () => {
      it('returns a token', async () => {
        const response = await app
          .post('/api/auth')
          .send({ email: 'test@email.com', password: '1234' });
        // console.log('-----> response', response);
        expect(response.status).to.equal(200);
        expect(response.body.token).to.be.ok;
      });
    });
  });
});
