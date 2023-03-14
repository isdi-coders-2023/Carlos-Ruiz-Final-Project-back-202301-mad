import { CustomError, HTTPError } from './errors';

describe('Given the HTTPError class', () => {
  let mockError: CustomError;

  describe('when we create a mockError', () => {
    beforeEach(() => {
      mockError = new HTTPError(418, 'Teapot', 'Im a teapot!');
    });
    test('then it should instance Eror and HTTPError', () => {
      expect(mockError).toBeInstanceOf(Error);
      expect(mockError).toBeInstanceOf(HTTPError);
    });
    test('then it should have the properties statusCode, statusMessage and message', () => {
      expect(mockError).toHaveProperty('statusCode');
      expect(mockError).toHaveProperty('statusMessage');
      expect(mockError).toHaveProperty('message');
    });
  });
});
