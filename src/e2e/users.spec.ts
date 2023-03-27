import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import { dbConnect } from '../db/db-connect';
import { UserModel } from '../repository/user/users-mongo.model';
import { Auth, PayloadToken } from '../services/auth';

const mockpasswd = '12345';

const setCollection = async () => {
  const userMock = [
    {
      username: 'test1',
      email: 'test1@mail.com',
      password: mockpasswd,
      avatar: 'image',
    },
    {
      username: 'test2',
      email: 'test2@mail.com',
      password: mockpasswd,
      avatar: 'image',
    },
  ];
  await UserModel.deleteMany();
  await UserModel.insertMany(userMock);
  const data = await UserModel.find();
  const testId = [data[0].id, data[1].id];

  return testId;
};

let ids: Array<string>;

describe('given app USER, we connect to mongo', () => {
  let token: string;
  beforeEach(async () => {
    await dbConnect();
    ids = await setCollection();
    const payload: PayloadToken = {
      id: ids[0],
      email: 'test1@mail.com',
    };
    token = Auth.createJWT(payload);
  });
  afterEach(async () => {
    await mongoose.disconnect();
  });
  describe('when we use the REGISTER router', () => {
    test('then if REGISTER is OK it should gives status 201 ', async () => {
      const simulateUser = {
        username: 'ej',
        email: 'ej@mail.com',
        password: mockpasswd,
      };
      await request(app).post('/users/register').send(simulateUser).expect(201);
    });
    test('then if REGISTER is NO OK it should gives status 401 ', async () => {
      const simulateUser = {
        email: '1234',
      };
      await request(app).post('/users/register').send(simulateUser).expect(401);
    });
  });
  describe('when we use the LOGIN router', () => {
    test('then if LOGIN is OK it should gives status 202', async () => {
      const simulateLogin = {
        email: 'test1@mail.com',
        password: mockpasswd,
      };
      await request(app).post('/users/login').send(simulateLogin).expect(202);
    });
    test('then if LOGIN theres NO EMAIL it should gives 401', async () => {
      const simulateLogin = {
        password: mockpasswd,
      };
      await request(app).post('/users/login').send(simulateLogin).expect(401);
    });
    test('then if LOGIN theres NO PASSWORD it should gives 401', async () => {
      const simulateLogin = {
        email: 'ej@mail.com',
      };
      await request(app).post('/users/login').send(simulateLogin).expect(401);
    });
  });
  describe('when we use the PROFILE router', () => {
    test('then if GET is OK it should gives status 202', async () => {
      await request(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(202);
    });
    test('then if GET is NOT OK it should gives status 498', async () => {
      await request(app).get('/users/profile').expect(498);
    });
    test('then if PATCH is OK it should gives status 201', async () => {
      await request(app)
        .patch('/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
    });
    test('then if PATCH is NOT OK, no token, it should gives status 404', async () => {
      await request(app).patch('/users/profile').expect(498);
    });
  });
});
