'use strict';

process.env.SECRET = 'secret';
// process.env.PORT = '5000';
// process.env.EMAIL = '102nanasoso@gmail.com';
// process.env.PASS = 'qkryullskfpcgfbd';

const { db } = require('../src/models/models.connection');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);
const { v4: uuidv4 } = require('uuid');

let accessToken = null;
let uuCode = uuidv4();

let user = {
  displayName: 'bahaa',
  email: 'bahaanimer97@gmail.com',
  password: '123456',
  // isVerify: true,
  // uuCode: uuCode,
}

beforeAll(async () => {
  await db.sync();
});

describe('Server Test', () => {
  it('sign up as user', async () => {
    const response = await request.post('/auth/user/signup').send({
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      // isVerify: user.isVerify,
    });
    console.log(response.body);
    expect(response.status).toBe(201);
    // let code = response.body.uuCode;
    // const verifyResponse = await request.post('/auth/verify').send({ code: code });
    // console.log(code);
    // expect(verifyResponse.text).toBe('verified');
  });
  it('to check if its verified', async () => {
    // const verifyResponse = await request.post('/auth/verify')
    // expect(verifyResponse.text).toBe('verified');
  });
  it('sign in as user', async () => {
    let { username } = userData.testData.username;
    let { password } = userData.testData.password;
    const response = await request.post('/auth/login').auth(username, password);
    accessToken = response.body.token;
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
