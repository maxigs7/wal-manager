const { ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');
const CracoAlias = require('craco-alias');
const { defaults: tsjPreset } = require('ts-jest/presets');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function ({ env }) {
  const isProductionBuild = process.env.NODE_ENV === 'production';
  const analyzerMode = process.env.REACT_APP_INTERACTIVE_ANALYZE ? 'server' : 'json';

  const plugins = [];

  if (isProductionBuild) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerMode }));
  }

  return {
    eslint: {
      mode: ESLINT_MODES.file,
    },
    jest: {
      configure: {
        // Automatically clear mock calls and instances between every test
        clearMocks: true,

        // Indicates whether the coverage information should be collected while executing the test
        collectCoverage: true,

        // An array of glob patterns indicating a set of files for which coverage information should be collected
        collectCoverageFrom: ['**/*.(t|j)s?(x)'],

        // The directory where Jest should output its coverage files
        coverageDirectory: 'coverage',

        // An array of regexp pattern strings used to skip coverage collection
        coveragePathIgnorePatterns: ['/node_modules/'],

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
          '^@app/(.+)': '<rootDir>/src/$1',
          '^@lib/(.+)': '<rootDir>/src/lib/$1',
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
      },
    },
    plugins: [
      {
        plugin: CracoAlias,
        options: {
          source: 'tsconfig',
          // baseUrl SHOULD be specified
          // plugin does not take it from tsconfig
          baseUrl: './src',
          // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
          tsConfigPath: './tsconfig.paths.json',
        },
      },
    ],
    webpack: {
      plugins,
      configure: {
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                chunks: 'initial',
                name: 'vendor',
              },
            },
          },
        },
      },
    },
  };
};
