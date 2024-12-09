const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Raíz del proyecto
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom', // Configura correctamente el entorno
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(customJestConfig);
