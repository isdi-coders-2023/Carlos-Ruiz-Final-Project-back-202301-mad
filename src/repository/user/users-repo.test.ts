import { UserModel } from './users-mongo.model';
import { UsersMongoRepo } from './users-mongo-repo';
import { User } from '../../entities/user';

jest.mock('./users-mongo.model');

describe('Given UserMongoRepo', () => {
  const repoInstance = UsersMongoRepo.getInstance();

  const mockExecFunction = (mockPopulateValue: unknown) => ({
    exec: jest.fn().mockResolvedValue(mockPopulateValue),
  });

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
  describe('when the readId method is used', () => {
    test('then it should return the data searched', async () => {
      const mockItem = { id: '2' };
      (UserModel.findById as jest.Mock).mockImplementation(() =>
        mockExecFunction(mockItem)
      );
      const result = await repoInstance.readId('2');
      expect(UserModel.findById).toHaveBeenCalled();
      expect(result).toEqual(mockItem);
    });
    test('then if ID in NOT OK', () => {
      (UserModel.findById as jest.Mock).mockImplementation(() =>
        mockExecFunction(undefined)
      );
      expect(async () => repoInstance.readId('3')).rejects.toThrow();
    });
  });
  describe('when the update method is used', () => {
    test('then it should return the data searched', async () => {
      const mockItem = { id: '2' };
      (UserModel.findByIdAndUpdate as jest.Mock).mockImplementation(() =>
        mockExecFunction(mockItem)
      );
      const result = await repoInstance.update(mockItem);
      expect(UserModel.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual(mockItem);
    });
    test('then with NO DATA ID it throws error', () => {
      const mockUser = null;
      const mockResp = {
        username: '1234',
      } as unknown as Partial<User>;
      (UserModel.findByIdAndUpdate as jest.Mock).mockImplementation(() =>
        mockExecFunction(mockUser)
      );
      expect(async () => repoInstance.update(mockResp)).rejects.toThrow();
    });
  });
});
