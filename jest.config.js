module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Projects configuration for different test types
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/**/__tests__/unit/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/test-utils/setup-unit.js']
    },
    {
      displayName: 'integration',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/**/__tests__/integration/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/test-utils/setup-integration.js']
    },
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/**/__tests__/dom/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/test-utils/setup-dom.js']
    }
  ],
  
  // Coverage configuration
  collectCoverage: false,
  collectCoverageFrom: [
    'scripts/**/*.js',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/test-utils/**',
    '!**/*.config.js',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/build/**',
    '!**/frontend/**'
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 35,
      lines: 25,
      statements: 25
    }
  },
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Test patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/.git/'
  ],
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react'
      ]
    }]
  },
  
  // Module resolution
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/test-utils/mocks/styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/test-utils/mocks/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1'
  },
  
  // Globals
  globals: {
    'NODE_ENV': 'test'
  },
  
  // Other configurations
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  testTimeout: 10000,
  
  // Watch plugins
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};