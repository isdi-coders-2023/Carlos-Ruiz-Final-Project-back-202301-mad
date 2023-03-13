import { UserModel } from './users-mongo-model';
import { UsersMongoRepo } from './users-mongo-repo';

jest.mock('./users-mongo-model');

describe('Given UserMongoRepo', () => {
  const repoInstance = UsersMongoRepo.getInstance();
  describe('when we call getInstance()', () => {
    test('then the UserMongoRepo shoul be INSTANTIATE', async () => {
      expect(repoInstance).toBeInstanceOf(UsersMongoRepo);
    });
  });
  describe('when the create method is used', () => {
    test('then it should return the new data', async () => {
      const mockNewItem = { id: '2' };
      (UserModel.create as jest.Mock).mockResolvedValue(mockNewItem);
      const result = await repoInstance.create(mockNewItem);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result.id).toBe('2');
    });
  });
  describe('when the search method is used', () => {
    test('then it should return the data searched', async () => {
      const mockItem = { id: '2' };
      (UserModel.find as jest.Mock).mockResolvedValue(mockItem);
      const result = await repoInstance.search({ key: 'some', value: 'oso' });
      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockItem);
    });
  });
});
