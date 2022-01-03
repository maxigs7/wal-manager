const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['**/*.(t|j)s?(x)'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/', '**/*.d.ts'],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@entities/(.+)': '<rootDir>/src/entities/$1',
    '^@features/(.+)': '<rootDir>/src/features/$1',
    '^@pages/(.+)': '<rootDir>/src/pages/$1',
    '^@shared/(.+)': '<rootDir>/src/shared/$1',
  },

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The root directory that Jest should scan for tests and modules within
  rootDir: './',

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['dotenv/config'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: ['(/test/.*|(\\.|/)(test))\\.[tj]s?(x)', '**/*.+(spec|test).[tj]s?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],

  // A map from regular expressions to paths to transformers
  transform: {
    ...tsjPreset.transform,
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
