const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Bug = require('../models/Bug');
const { beforeAll, afterAll, afterEach, test, expect } = require('@jest/globals');

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
afterEach(async () => {
  await Bug.deleteMany({});
});

test('POST /api/bugs creates a bug', async () => {
  const res = await request(app).post('/api/bugs').send({
    title: 'Sample bug',
    description: 'It crashes',
    severity: 'high'
  });
  expect(res.statusCode).toBe(201);
  expect(res.body.data.title).toBe('Sample bug');
});

test('GET /api/bugs returns a list', async () => {
  await Bug.create({ title: 'b1' });
  const res = await request(app).get('/api/bugs');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body.data)).toBe(true);
});
