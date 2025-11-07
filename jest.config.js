export default {
  // Simulate browser for frontend tests
  testEnvironment: 'jsdom',

  // Use Babel to transform JS/TS/JSX/TSX files
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },

  // Recognize these file extensions
  moduleFileExtensions: ['js', 'jsx'],
  extensionsToTreatAsEsm: ['.jsx'],

  // Setup file for custom matchers or mocks
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Enable coverage collection
  collectCoverage: true,
  coverageDirectory: './coverage',

  // Include both frontend and backend sources
  collectCoverageFrom: [
    'frontend/src/**/*.{js,jsx}',
    'backend/**/*.{js,jsx}',
    '!frontend/src/**/*.test.{js,jsx}',
    '!frontend/src/**/index.{js,jsx}',
    '!frontend/src/reportWebVitals.js',
    '!frontend/src/setupTests.js',
    '!frontend/src/App.{js,jsx}',
    '!frontend/src/Components/LoginPage.jsx',
    '!frontend/src/Components/Laoder.jsx',
    '!backend/**/*.test.{js,jsx}',
    '!backend/**/index.{js,jsx}'
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    },
    // 'frontend/src/Components/LoginForm.jsx': {
    //   branches: 70,
    //   functions: 70,
    //   lines: 70,
    //   statements: 70
    // }
  },

  // Coverage output formats
  coverageReporters: ['lcov', 'text'],

  // Test reporters
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './reports',
      outputName: 'junit.xml'
    }]
  ],

  // Match test files in both folders
  testMatch: [
    '<rootDir>/frontend/**/*.test.[jt]s?(x)',
    '<rootDir>/backend/**/*.test.[jt]s?(x)'
  ],

  // Root directory for resolution
  rootDir: './'
};