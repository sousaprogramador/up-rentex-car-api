export default {
  displayName: {
    name: 'nestjs-e2e',
    color: 'blue',
  },
  clearMocks: true,
  rootDir: './',
  testRegex: '.*\\.e2e-spec\\.ts$',
  maxWorkers: 1,
  setupFiles: ['<rootDir>/setup-test.ts'],
  moduleNameMapper: {},
};
