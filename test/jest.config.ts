/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  ...require('../jest.config').default,
  displayName: {
    name: '@core',
    color: 'blue',
  },

  clearMocks: true,

  coverageDirectory: '../__coverage',

  coverageProvider: 'v8',

  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },

  rootDir: 'src',
  setupFilesAfterEnv: ['./validations.ts', './jest.ts'],
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
};
