/* eslint-disable @typescript-eslint/no-var-requires */
export default {
  displayName: {
    name: 'nestjs-e2e',
    color: 'yellow',
  },
  rootDir: './',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
  testRegex: '.*\\.e2e-spec\\.ts$',
  maxWorkers: 1,
  setupFiles: ['<rootDir>/setup-test.ts'],
  moduleNameMapper: {},
};
