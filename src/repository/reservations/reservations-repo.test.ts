import { ReservationMongoRepo } from './reservations-mongo-repo';
import { ReservationModel } from './reservations-mongo.model';

jest.mock('./reservations-mongo.model');

describe('Given ReservationMongoModel', () => {
  const repoInstance = ReservationMongoRepo.getInstance();

  const mockExecFunction = (mockPopulateValue: unknown) => ({
    exec: jest.fn().mockResolvedValue(mockPopulateValue),
  });
  const mockPopulateFunction = (mockPopulateValue: unknown) => ({
    populate: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(mockPopulateValue),
    })),
  });

  describe('when we instance the repo', () => {
    test('then ReservationMongoRepo is INSTANCE', () => {
      expect(repoInstance).toBeInstanceOf(ReservationMongoRepo);
    });
  });
  describe('when we call the create function', () => {
    test('then ReservationMongoRepo should expect the value given', async () => {
      const mockReservation = { id: '10' };
      (ReservationModel.create as jest.Mock).mockResolvedValue(mockReservation);
      const result = await repoInstance.create(mockReservation);
      expect(ReservationModel.create).toHaveBeenCalled();
      expect(result.id).toBe('10');
    });
  });
  describe('when we call the delete function', () => {
    test('then ReservationMongoRepo should delete the mock and receive void', async () => {
      const mockReservation = { id: '10' };
      (ReservationModel.findByIdAndDelete as jest.Mock).mockImplementation(() =>
        mockExecFunction(mockReservation)
      );
      const result = await repoInstance.delete('10');
      expect(ReservationModel.findByIdAndDelete).toHaveBeenCalled();
      expect(result).toBe(undefined);
    });
    test('then if NO ID is given it throw a rejected', () => {
      const mockReservation = null;
      (ReservationModel.findByIdAndDelete as jest.Mock).mockImplementation(() =>
        mockExecFunction(mockReservation)
      );
      expect(async () => repoInstance.delete('')).rejects.toThrow();
    });
  });
  describe('when we call the read function', () => {
    test('then ReservationMongoRepo should return the data mocked', async () => {
      const mockReservation = { id: '10' };
      (ReservationModel.find as jest.Mock).mockImplementation(() =>
        mockExecFunction(mockReservation)
      );
      const result = await repoInstance.read();
      expect(ReservationModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockReservation);
    });
  });
  describe('when we call the readByUserId function', () => {
    test('then ReservationMongoRepo should return the data array', async () => {
      const mockReservation = { name: 'foo', user: '2' };
      (ReservationModel.find as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockReservation)
      );
      const result = await repoInstance.readByUserId('2');
      expect(ReservationModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockReservation);
    });
    test('then with NO ID user it throws an error', () => {
      const mockReservation = null;
      (ReservationModel.find as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockReservation)
      );
      expect(async () => repoInstance.readByUserId('2')).rejects.toThrow();
    });
  });
  describe('when we call the readFilterByMonth function', () => {
    test('then ReservationMongoRepo should return the data array', async () => {
      const mockReservation = {
        name: 'foo',
        user: '2',
        reserveDate: '2023-4-1',
        escaperoom: '123',
      };
      (ReservationModel.find as jest.Mock).mockImplementation(() =>
        mockExecFunction(mockReservation)
      );
      const result = await repoInstance.readFilterByMonth('2023-4', '123');
      expect(ReservationModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockReservation);
    });
    test('then if there is NO RESERVATION it throws an error', () => {
      const mockReservation = null;
      (ReservationModel.find as jest.Mock).mockImplementation(() =>
        mockExecFunction(mockReservation)
      );
      expect(async () =>
        repoInstance.readFilterByMonth('', '')
      ).rejects.toThrow();
    });
  });
});
