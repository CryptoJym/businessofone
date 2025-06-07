// Setup file for unit tests
// This file runs before each unit test suite

// Set test environment
process.env.NODE_ENV = 'test';

// Add custom matchers
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

// Mock console methods to avoid cluttering test output
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Global test utilities
global.testUtils = {
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  mockFn: (returnValue) => jest.fn().mockReturnValue(returnValue),
  mockAsyncFn: (returnValue) => jest.fn().mockResolvedValue(returnValue),
  generateId: () => Math.random().toString(36).substring(7),
};

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});