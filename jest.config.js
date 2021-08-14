require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  preset: 'jest-preset-angular',
  name: 'dd-playground-client',
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
  coverageDirectory: 'dist/coverage',
  collectCoverageFrom: ['src/app/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '.module.ts', 'index.ts', '.stories.ts'],
  testPathIgnorePatterns: ['/node_modules/', '.stories.ts', 'test.ts'],
  testURL: 'http://localhost/',
};
