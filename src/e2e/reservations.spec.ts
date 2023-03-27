import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import { dbConnect } from '../db/db-connect';
import { EscapeRoomModel } from '../repository/espaceroom/escaperoom-mongo.model';
import { ReservationModel } from '../repository/reservations/reservations-mongo.model';
import { UserModel } from '../repository/user/users-mongo.model';
import { Auth, PayloadToken } from '../services/auth';

const mockpasswd = '12345';
const setCollectionUser = async () => {
  const userMock = [
    {
      username: 'userReservation',
      email: 'reservation@mail.com',
      password: mockpasswd,
      avatar: 'image',
    },
  ];
  await UserModel.deleteMany();
  await UserModel.insertMany(userMock);
  const data = await UserModel.find();
  const testId = [data[0].id];

  return testId;
};

let userId: Array<string>;

const setCollectionEscapeRoom = async () => {
  const escaperoomMock = [
    {
      name: 'Room test',
      players: '2-4',
      difficulty: 'Easy',
      theme: 'Fantasy',
      description: 'description',
      images: ['image1'],
    },
  ];
  await EscapeRoomModel.deleteMany();
  await EscapeRoomModel.insertMany(escaperoomMock);
  const data = await EscapeRoomModel.find();
  const testId = [data[0].id];

  return testId;
};

let escaperoomIds: Array<string>;

const setCollectionReservations = async () => {
  const reservationsMock = [
    {
      reserveDate: '2023-4-14',
      user: userId[0],
      escaperoom: escaperoomIds[0],
    },
    {
      reserveDate: '2023-4-17',
      user: userId[0],
      escaperoom: escaperoomIds[0],
    },
  ];
  await ReservationModel.deleteMany();
  await ReservationModel.insertMany(reservationsMock);
  const data = await ReservationModel.find();
  const testId = [data[0].id, data[1].id];

  return testId;
};

let reservationsIds: Array<string>;

describe('given app RESERVATIONS, we connect to mongo', () => {
  let token: string;
  beforeEach(async () => {
    await dbConnect();
    userId = await setCollectionUser();
    escaperoomIds = await setCollectionEscapeRoom();
    reservationsIds = await setCollectionReservations();
    const payload: PayloadToken = {
      id: userId[0],
      email: 'reservation@mail.com',
    };
    token = Auth.createJWT(payload);
  });
  afterEach(async () => {
    await mongoose.disconnect();
  });
  describe('when we use the GET router', () => {
    test('then if GET is OK it should return a 201 status', async () => {
      await request(app).get('/reservations/').expect(201);
    });
  });
  describe('when we use the CREATE router', () => {
    test('then if POST is OK it should return a 201 status', async () => {
      const simulateReservation = {
        reserveDate: '2023-4-17',
        user: userId[0],
        escaperoom: escaperoomIds[0],
      };
      await request(app)
        .post('/reservations/create')
        .set('Authorization', `Bearer ${token}`)
        .send(simulateReservation)
        .expect(201);
    });
    test('then if POST is NOT OK, NO TOKEN, it should return a 404 status', async () => {
      const simulateReservation = {
        reserveDate: '2023-4-17',
        user: userId[0],
        escaperoom: escaperoomIds[0],
      };
      await request(app)
        .post('/reservations/create')
        .send(simulateReservation)
        .expect(498);
    });
    test('then if POST is NOT OK, NO DATA, it should return a 400 status', async () => {
      await request(app)
        .post('/reservations/create')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
    });
  });
  describe('when we use the FILTER router', () => {
    test('then if GET is OK it should return a 201 status', async () => {
      await request(app)
        .get(
          `/reservations/filter?reserveDate=2023-4&escaperoom=${escaperoomIds[0]}`
        )
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
    });
  });
});
