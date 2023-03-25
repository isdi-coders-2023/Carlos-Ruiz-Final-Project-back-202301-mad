/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'index.ts',
    'app.ts',
    'routers',
    'reservations-mongo.model.ts',
    'escaperoom-mongo.model.ts',
    'users-mongo.model.ts',
  ],
};
