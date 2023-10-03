module.exports = {
  preset: 'jest-preset-angular',
  coverageDirectory: 'dist/coverage',
  collectCoverageFrom: ['src/app/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '.module.ts', 'index.ts', '.stories.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '.stories.ts', '<rootDir>/src/test.ts', '<rootDir>/src/app/test.ts'],
  snapshotSerializers: ['jest-preset-angular/build/serializers/ng-snapshot', 'jest-preset-angular/build/serializers/html-comment'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
};
