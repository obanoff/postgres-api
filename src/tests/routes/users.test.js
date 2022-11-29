// test 1

import request from 'supertest';
import buildApp from '../../app.js';
import UserRepo from '../../repos/user-repo.js';
import pool from '../../pool.js';
import Context from '../context.js';

let context;
//the function runs before any tests
beforeAll(async () => {
  context = await Context.build();
});

// runs before each test
beforeEach(async () => {
  await context.reset();
});

afterAll(() => {
  return context.close();
});

it('create a user', async () => {
  const startingCount = await UserRepo.count();

  await request(buildApp())
    .post('/users')
    .send({ username: 'testuser', bio: 'test bio' })
    .expect(200);

  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});











