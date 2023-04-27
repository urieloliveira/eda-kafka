export default {
  clearMocks: true,
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
  testTimeout: 30000,
};
