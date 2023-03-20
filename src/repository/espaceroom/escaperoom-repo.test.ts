import { EscapeRoomMongoRepo } from './escaperoom-mongo-repo';
import { EscapeRoomModel } from './escaperoom-mongo.model';

jest.mock('./escaperoom-mongo.model');

describe('Given EscapeRoomMongoRepo', () => {
  const repoInstance = EscapeRoomMongoRepo.getInstance();

  const mockPopulateFunction = (mockPopulateValue: unknown) => ({
    exec: jest.fn().mockResolvedValue(mockPopulateValue),
  });

  describe('when we call the instance function', () => {
    test('then EscapeRoomMongoRepo is INSTANTIATE', () => {
      expect(repoInstance).toBeInstanceOf(EscapeRoomMongoRepo);
    });
  });
  describe('when we call the create method', () => {
    test('then it should expect the mock value', async () => {
      const mockItem = { id: '2' };
      (EscapeRoomModel.create as jest.Mock).mockResolvedValue(mockItem);
      const result = await repoInstance.create(mockItem);
      expect(EscapeRoomModel.create).toHaveBeenCalled();
      expect(result.id).toBe('2');
    });
  });
  describe('when we call the search method', () => {
    test('then it should be equal to the mock value', async () => {
      const mockItem = { id: '2' };
      (EscapeRoomModel.find as jest.Mock).mockResolvedValue(mockItem);
      const result = await repoInstance.search({ key: 'one', value: '2' });
      expect(EscapeRoomModel.create).toHaveBeenCalled();
      expect(result).toBe(mockItem);
    });
    describe('when we call the readById', () => {
      test('then it should return the mockvalue', async () => {
        const mockItem = { id: '2' };
        (EscapeRoomModel.findById as jest.Mock).mockImplementation(() =>
          mockPopulateFunction(mockItem)
        );
        const result = await repoInstance.readById('2');
        expect(EscapeRoomModel.findById).toHaveBeenCalled();
        expect(result).toBe(mockItem);
      });
      test('then if there NO DATA it should throw error', async () => {
        const mockItem = null;
        (EscapeRoomModel.findById as jest.Mock).mockImplementation(() =>
          mockPopulateFunction(mockItem)
        );
        expect(async () => repoInstance.readById('')).rejects.toThrow();
      });
    });
  });
  describe('when we call the readFilter method', () => {
    test('then it should be equal to the mock value', async () => {
      const mockItem = { theme: '2' };
      (EscapeRoomModel.find as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockItem)
      );
      const result = await repoInstance.readFilter('2');
      expect(EscapeRoomModel.find).toHaveBeenCalled();
      expect(result).toBe(mockItem);
    });
    test('then it thros error if thers NO DATA', async () => {
      const mockItem = null;
      (EscapeRoomModel.find as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockItem)
      );
      expect(async () => repoInstance.readFilter('')).rejects.toThrow();
    });
  });
  describe('when we call the read method', () => {
    test('then it should be equal to the mock value', async () => {
      const mockItem = { test: 'test' };
      (EscapeRoomModel.find as jest.Mock).mockImplementation(() =>
        mockPopulateFunction(mockItem)
      );
      const result = await repoInstance.read();
      expect(EscapeRoomModel.find).toHaveBeenCalled();
      expect(result).toBe(mockItem);
    });
  });
});
