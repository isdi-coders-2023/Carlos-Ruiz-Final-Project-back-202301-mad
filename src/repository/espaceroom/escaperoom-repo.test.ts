import { EscapeRoomMongoRepo } from './escaperoom-mongo-repo';
import { EscapeRoomModel } from './escaperoom-mongo.model';

jest.mock('./escaperoom-mongo.model');

describe('Given EscapeRoomMongoRepo', () => {
  const repoInstance = EscapeRoomMongoRepo.getInstance();
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
  });
});
