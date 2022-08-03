'use strict';

// process.env.SECRET = 'secret';

const { db } = require('../src/models/models.connection');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

describe('Home Route Test', () => {
  it('get all packages from home route', async () => {
    const response = await request.get('/home/packages');
    expect(response.status).toBe(200);
  });
  it('get all special offers from home route', async () => {
    const response = await request.get('/home/specialOffers');
    expect(response.status).toBe(200);
  });
  // it('', async () => { });
  // it('', async () => { });
  // it('', async () => { });
  // it('', async () => { });
  // it('', async () => { });
  // it('', async () => { });
  // it('', async () => { });
  // it('', async () => { });
  // it('', async () => { });
});
