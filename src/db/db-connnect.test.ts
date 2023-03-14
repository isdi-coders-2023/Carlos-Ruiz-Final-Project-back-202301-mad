import mongoose from 'mongoose';
import { dbConnect } from './db-connect';

describe('Given the dbconnect function', () => {
  describe('when called in test environment', () => {
    test('then it should call the mongoose.connect and contain testing', async () => {
      const result = await dbConnect();
      expect(typeof result).toBe(typeof mongoose);
      expect(mongoose.connection.db.databaseName).toContain('testing');
      mongoose.disconnect();
    });
  });
  describe('when called in the env environment', () => {
    test('then it should call the mongoose.connect and containing no testing', async () => {
      const result = await dbConnect('env');
      expect(typeof result).toBe(typeof mongoose);
      expect(mongoose.connection.db.databaseName).not.toContain('testing');
      mongoose.disconnect();
    });
  });
});
