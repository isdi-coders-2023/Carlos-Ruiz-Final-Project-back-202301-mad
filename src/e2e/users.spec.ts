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
  await UserModel.insertMany(userMock);
  const data = await UserModel.find();
  const testId = [data[0].id, data[1].id];

  return testId;
};

let ids: Array<string>;

describe('given app', () => {
  describe('when we connect to mongoDB and get the token of test1 user', () => {
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
});
